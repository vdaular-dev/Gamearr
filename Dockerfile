FROM lsiobase/mono:LTS

# set version label
ARG BUILD_DATE
ARG VERSION
ARG GAMEARR_RELEASE
LABEL build_version="Linuxserver.io version:- ${VERSION} Build-date:- ${BUILD_DATE}"
LABEL maintainer="Aquilla"

# environment settings
ARG DEBIAN_FRONTEND="noninteractive"
ARG LIDARR_BRANCH="master"
ENV XDG_CONFIG_HOME="/config/xdg"

RUN \
 echo "**** install packages ****" && \
 apt-get update && \
 apt-get install --no-install-recommends -y \
	libchromaprint-tools \
	jq && \
 echo "**** install gamearr ****" && \
 mkdir -p \
	/app/gamearr/bin && \
 if [ -z ${GAMEARR_RELEASE+x} ]; then \
	GAMEARR_RELEASE=$(curl -sX GET "https://api.github.com/repos/Gamearr/Gamearr/releases/latest" \
	| jq -r .tag_name); \
 fi && \
 curl -o \
 /tmp/gamearr.tar.gz -L \
	"https://github.com/Gamearr/Gamearr/releases/download/0.0.1/Gamearr.develop.0.0.1.linux.tar.gz" && \
 tar ixzf \
 /tmp/gamearr.tar.gz -C \
	/app/gamearr/bin --strip-components=1 && \
 echo "**** cleanup ****" && \
 rm -rf \
	/tmp/* \
	/var/lib/apt/lists/* \
	/var/tmp/*
# copy local files
COPY root/ /

# ports and volumes
EXPOSE 8686
VOLUME /config