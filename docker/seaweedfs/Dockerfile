#Seaweedfs docker
FROM progrium/busybox

WORKDIR /opt/weed

RUN opkg-install curl
RUN echo tlsv1 >> ~/.curlrc

RUN curl -Lk http://bintray.com/chrislusf/seaweedfs/seaweedfs/_latestVersion | grep linux_amd64.tar.gz | sed -n "/href/ s/.*href=['\"]\([^'\"]*\)['\"].*/\1/gp" >> weedfs_url
RUN curl -Lks https://bintray.com$(head -n 1 weedfs_url) | gunzip | tar xf - -C /opt/weed/

RUN mkdir /opt/weed/bin
RUN mv /opt/weed/go*/* /opt/weed/bin
RUN chmod +x /opt/weed/bin/weed

EXPOSE 8080
EXPOSE 9333

VOLUME /data

ENV WEED_HOME /opt/weed
ENV PATH ${PATH}:${WEED_HOME}/bin

# sudo docker build --no-cache -t 'plc-weed' .
# sudo docker run -p 9333:9333 -p 8080:8080 -d -v /opt/weedfs/data:/data plc-weed server -dir="/data"

ENTRYPOINT ["weed"]