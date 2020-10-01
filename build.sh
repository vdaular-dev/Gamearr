#! /bin/bash
msBuildVersion='15.0'
outputFolder='./_output'
outputFolderLinux='./_output_linux'
outputFolderMacOS='./_output_macos'
outputFolderMacOSApp='./_output_macos_app'
testPackageFolder='./_tests/'
sourceFolder='./src'
slnFile=$sourceFolder/Gamearr.sln
updateFolder=$outputFolder/Gamearr.Update
updateFolderMono=$outputFolderLinux/Gamearr.Update

#Artifact variables
artifactsFolder="./_artifacts";
artifactsFolderWindows=$artifactsFolder/windows
artifactsFolderLinux=$artifactsFolder/linux
artifactsFolderMacOS=$artifactsFolder/macos
artifactsFolderMacOSApp=$artifactsFolder/macos-app

nuget='tools/nuget/nuget.exe';
vswhere='tools/vswhere/vswhere.exe';

CheckExitCode()
{
    "$@"
    local status=$?
    if [ $status -ne 0 ]; then
        echo "error with $1" >&2
        exit 1
    fi
    return $status
}

ProgressStart()
{
    echo "Start '$1'"
}

ProgressEnd()
{
    echo "Finish '$1'"
}

UpdateVersionNumber()
{
    if [ "$GAMEARRVERSION" != "" ]; then
        echo "Updating Version Info"
        sed -i "s/<AssemblyVersion>[0-9.*]\+<\/AssemblyVersion>/<AssemblyVersion>$GAMEARRVERSION<\/AssemblyVersion>/g" ./src/Directory.Build.props
        sed -i "s/<AssemblyConfiguration>[\$()A-Za-z-]\+<\/AssemblyConfiguration>/<AssemblyConfiguration>${BUILD_SOURCEBRANCHNAME}<\/AssemblyConfiguration>/g" ./src/Directory.Build.props
        sed -i "s/<string>10.0.0.0<\/string>/<string>$GAMEARRVERSION<\/string>/g" ./macOS/Gamearr.app/Contents/Info.plist
    fi
}

CleanFolder()
{
    local path=$1
    local keepConfigFiles=$2

    find $path -name "*.transform" -exec rm "{}" \;

    if [ $keepConfigFiles != true ] ; then
        find $path -name "*.dll.config" -exec rm "{}" \;
    fi

    echo "Removing FluentValidation.Resources files"
    find $path -name "FluentValidation.resources.dll" -exec rm "{}" \;
    find $path -name "App.config" -exec rm "{}" \;

    echo "Removing vshost files"
    find $path -name "*.vshost.exe" -exec rm "{}" \;

    echo "Removing dylib files"
    find $path -name "*.dylib" -exec rm "{}" \;

    echo "Removing Empty folders"
    find $path -depth -empty -type d -exec rm -r "{}" \;
}

BuildWithMSBuild()
{
    installationPath=`$vswhere -latest -products \* -requires Microsoft.Component.MSBuild -property installationPath`
    installationPath=${installationPath/C:\\/\/c\/}
    installationPath=${installationPath//\\/\/}
    msBuild="$installationPath/MSBuild/$msBuildVersion/Bin"
    echo $msBuild

    export PATH=$msBuild:$PATH
    CheckExitCode MSBuild.exe $slnFile //p:Configuration=Debug //p:Platform=x86 //t:Clean //m
    CheckExitCode MSBuild.exe $slnFile //p:Configuration=Release //p:Platform=x86 //t:Clean //m
    $nuget locals all -clear
    $nuget restore $slnFile
    CheckExitCode MSBuild.exe $slnFile //p:Configuration=Release //p:Platform=x86 //t:Build //m //p:AllowedReferenceRelatedFileExtensions=.pdb
}

BuildWithXbuild()
{
    export MONO_IOMAP=case
    CheckExitCode msbuild /p:Configuration=Debug /t:Clean $slnFile
    CheckExitCode msbuild /p:Configuration=Release /t:Clean $slnFile
    mono $nuget locals all -clear
    mono $nuget restore $slnFile
    CheckExitCode msbuild /p:Configuration=Release /p:Platform=x86 /t:Build /p:AllowedReferenceRelatedFileExtensions=.pdb $slnFile
}

LintUI()
{
    ProgressStart 'ESLint'
    CheckExitCode yarn lint
    ProgressEnd 'ESLint'

    ProgressStart 'Stylelint'
    if [ $runtime = "dotnet" ] ; then
        CheckExitCode yarn stylelint-windows
    else
        CheckExitCode yarn stylelint-linux
    fi
    ProgressEnd 'Stylelint'
}

Build()
{
    ProgressStart 'Build'

    rm -rf $outputFolder
    rm -rf $testPackageFolder

    if [ $runtime = "dotnet" ] ; then
        BuildWithMSBuild
    else
        BuildWithXbuild
    fi

    CleanFolder $outputFolder false

    echo "Removing Mono.Posix.dll"
    rm $outputFolder/Mono.Posix.dll

    echo "Adding LICENSE.md"
    cp LICENSE.md $outputFolder

    ProgressEnd 'Build'
}

YarnInstall()
{
    ProgressStart 'yarn install'
    yarn install
    #npm-cache install npm || CheckExitCode npm install --no-optional --no-bin-links
    ProgressEnd 'yarn install'
}

RunGulp()
{
    ProgressStart 'Running gulp'
    CheckExitCode yarn run build --production
    ProgressEnd 'Running gulp'
}

PackageMono()
{
    ProgressStart 'Creating Mono Package'

    rm -rf $outputFolderLinux

    echo "Copying Binaries"
    cp -r $outputFolder $outputFolderLinux

    echo "Replacing System.Numerics.Vectors.dll"
    cp $sourceFolder/Libraries/Mono/System.Numerics.Vectors.dll $outputFolderLinux

    echo "Removing Service helpers"
    rm -f $outputFolderLinux/ServiceUninstall.*
    rm -f $outputFolderLinux/ServiceInstall.*

    echo "Removing native windows binaries Sqlite, fpcalc"
    rm -f $outputFolderLinux/sqlite3.*
    rm -f $outputFolderLinux/fpcalc*

    echo "Renaming Gamearr.Console.exe to Gamearr.exe"
    rm $outputFolderLinux/Gamearr.exe*
    for file in $outputFolderLinux/Gamearr.Console.exe*; do
        mv "$file" "${file//.Console/}"
    done

    echo "Removing Gamearr.Windows"
    rm $outputFolderLinux/Gamearr.Windows.*

    echo "Adding Gamearr.Mono to UpdatePackage"
    cp $outputFolderLinux/Gamearr.Mono.* $updateFolderMono

    ProgressEnd 'Creating Mono Package'
}

PackageMacOS()
{
    ProgressStart 'Creating MacOS Package'

    rm -rf $outputFolderMacOS
    mkdir $outputFolderMacOS

    echo "Adding Startup script"
    cp ./macOS/Gamearr $outputFolderMacOS

    echo "Copying Binaries"
    cp -r $outputFolderLinux/* $outputFolderMacOS
    cp $outputFolder/fpcalc $outputFolderMacOS

    echo "Adding sqlite dylibs"
    cp $sourceFolder/Libraries/Sqlite/*.dylib $outputFolderMacOS

    ProgressEnd 'Creating MacOS Package'
}

PackageMacOSApp()
{
    ProgressStart 'Creating macOS App Package'

    rm -rf $outputFolderMacOSApp
    mkdir $outputFolderMacOSApp
    cp -r ./macOS/Gamearr.app $outputFolderMacOSApp
    mkdir -p $outputFolderMacOSApp/Gamearr.app/Contents/MacOS

    echo "Adding Startup script"
    cp ./macOS/Gamearr $outputFolderMacOSApp/Gamearr.app/Contents/MacOS
    dos2unix $outputFolderMacOSApp/Gamearr.app/Contents/MacOS/Gamearr

    echo "Copying Binaries"
    cp -r $outputFolderLinux/* $outputFolderMacOSApp/Gamearr.app/Contents/MacOS
    cp $outputFolder/fpcalc $outputFolderMacOSApp/Gamearr.app/Contents/MacOS

    echo "Adding sqlite dylibs"
    cp $sourceFolder/Libraries/Sqlite/*.dylib $outputFolderMacOSApp/Gamearr.app/Contents/MacOS

    echo "Removing Update Folder"
    rm -r $outputFolderMacOSApp/Gamearr.app/Contents/MacOS/Gamearr.Update

    ProgressEnd 'Creating macOS App Package'
}

PackageTests()
{
    ProgressStart 'Creating Test Package'

    if [ $runtime = "dotnet" ] ; then
        $nuget install NUnit.ConsoleRunner -Version 3.10.0 -Output $testPackageFolder
    else
        mono $nuget install NUnit.ConsoleRunner -Version 3.10.0 -Output $testPackageFolder
    fi

    cp ./test.sh $testPackageFolder

    rm -f $testPackageFolder/*.log.config

    CleanFolder $testPackageFolder true

    echo "Adding sqlite dylibs"
    cp $sourceFolder/Libraries/Sqlite/*.dylib $testPackageFolder

    ProgressEnd 'Creating Test Package'
}

CleanupWindowsPackage()
{
    ProgressStart 'Cleaning Windows Package'

    echo "Removing Gamearr.Mono"
    rm -f $outputFolder/Gamearr.Mono.*

    echo "Adding Gamearr.Windows to UpdatePackage"
    cp $outputFolder/Gamearr.Windows.* $updateFolder

    echo "Removing MacOS fpcalc"
    rm $outputFolder/fpcalc

    ProgressEnd 'Cleaning Windows Package'
}

PackageArtifacts()
{
    echo "Creating Artifact Directories"
    
    rm -rf $artifactsFolder
    mkdir $artifactsFolder
    
    mkdir $artifactsFolderWindows
    mkdir $artifactsFolderMacOS
    mkdir $artifactsFolderLinux
    mkdir $artifactsFolderWindows/Gamearr
    mkdir $artifactsFolderMacOS/Gamearr
    mkdir $artifactsFolderLinux/Gamearr
    mkdir $artifactsFolderMacOSApp
    
    cp -r $outputFolder/* $artifactsFolderWindows/Gamearr
    cp -r $outputFolderMacOSApp/* $artifactsFolderMacOSApp
    cp -r $outputFolderMacOS/* $artifactsFolderMacOS/Gamearr
    cp -r $outputFolderLinux/* $artifactsFolderLinux/Gamearr
}

# Use mono or .net depending on OS
case "$(uname -s)" in
    CYGWIN*|MINGW32*|MINGW64*|MSYS*)
        # on windows, use dotnet
        runtime="dotnet"
        ;;
    *)
        # otherwise use mono
        runtime="mono"
        ;;
esac

POSITIONAL=()

if [ $# -eq 0 ]; then
    echo "No arguments provided, building everything"
    BACKEND=YES
    FRONTEND=YES
    PACKAGES=YES
    LINT=YES
fi

while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    --backend)
        BACKEND=YES
        shift # past argument
        ;;
    --frontend)
        FRONTEND=YES
        shift # past argument
        ;;
    --packages)
        PACKAGES=YES
        shift # past argument
        ;;
    --lint)
        LINT=YES
        shift # past argument
        ;;
    --all)
        BACKEND=YES
        FRONTEND=YES
        PACKAGES=YES
        LINT=YES
        shift # past argument
        ;;
    *)    # unknown option
        POSITIONAL+=("$1") # save it in an array for later
        shift # past argument
        ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

if [ "$BACKEND" == "YES" ];
then
    UpdateVersionNumber
    Build
    PackageTests
fi

if [ "$FRONTEND" == "YES" ];
then
    YarnInstall
    RunGulp
fi

if [ "$LINT" == "YES" ];
then
    if [ -z "$FRONTEND" ];
    then
        YarnInstall
    fi
    
    LintUI
fi

if [ "$PACKAGES" == "YES" ];
then
    UpdateVersionNumber
    PackageMono
    PackageMacOS
    PackageMacOSApp
    CleanupWindowsPackage
    PackageArtifacts
fi
