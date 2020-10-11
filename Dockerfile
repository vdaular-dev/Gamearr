
FROM lsiobase/mono:LTS

LABEL maintainer="Aquilla"

RUN apt-get update && \
	apt-get -y install --no-install-recommends mediainfo libicu63 && \
	rm -rf /var/lib/apt/lists/*

ENV DATA_DIR="/gamearr"
ENV Gamearr_REL="latest"
ENV START_PARAMS=""
ENV MONO_START_PARAMS="--debug"
ENV UMASK=0000
ENV DATA_PERM=770
ENV UID=99
ENV GID=100
ENV USER="gamearr"

RUN mkdir $DATA_DIR && \
	mkdir /mnt/downloads && \
    mkdir /mnt/games && \
	useradd -d $DATA_DIR -s /bin/bash $USER && \
	chown -R $USER $DATA_DIR && \
	ulimit -n 2048

ADD /scripts/ /opt/scripts/
RUN chmod -R 770 /opt/scripts/ && \
	chmod -R 770 /mnt && \
	chown -R $UID:$GID /mnt

EXPOSE 8383

#Server Start
ENTRYPOINT ["/opt/scripts/start.sh"]