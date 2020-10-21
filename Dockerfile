FROM lsiobase/mono:LTS

# set version label
ARG BUILD_DATE
ARG VERSION
ARG GAMEARR_RELEASE
LABEL build_version="Linuxserver.io version:- ${VERSION} Build-date:- ${BUILD_DATE}"
LABEL maintainer="Aquilla"
# environment settings
ARG DEBIAN_FRONTEND="noninteractive"
ARG GAMEARR_BRANCH="Development"
ENV XDG_CONFIG_HOME="/config/xdg"
RUN \
 echo "**** install packages ****" && \
 apt-get update && \
 apt-get install --no-install-recommends -y \
	libchromaprint-tools \
	jq && \
 echo "**** install gamearr ****" && \
 if [ -z ${GAMNEARR_RELEASE+x} ]; then \
	GAMEARR_RELEASE=$(curl -sX GET "https://github.com/Gamearr/Gamearr/releases/" \
	| jq -r '.[0] | .tag_name'); \
 fi && \
 gamearr_url=$(curl -s https://github.com/Gamearr/Gamearr/releases/tag/0.0.1"$GAMEARR_RELEASE}" \
	|jq -r '.assets[].browser_download_url' |grep linux) && \
 mkdir -p \
	/app/gamearr/bin && \
 curl -o \
 /tmp/Gamearr.tar.gz -L \
	"${gamearr_url}" && \
 tar ixzf \
 /tmp/Gamearr.tar.gz -C \
	/app/Gamearr/bin --strip-components=1 && \
 echo "**** cleanup ****" && \
 rm -rf \
	/tmp/* \
	/var/lib/apt/lists/* \
	/var/tmp/*
# copy local files
COPY root/ /
# ports and volumes
EXPOSE 8383
VOLUME /config
