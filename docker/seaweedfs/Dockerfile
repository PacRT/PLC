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
RUN echo $(curl -s cydev.ru/ip)

# sudo docker build --no-cache -t 'cydev/weed' .
# sudo docker run -d -p 9333:9333 -p 8080:8080 -v /opt/weed/data:/data cydev/weed server -master.port=9333 -volume.max=100 -volume.port=8080 -dir="/data" -ip="$(curl -s cydev.ru/ip)"
# curl -X POST http://localhost:9333/dir/assign

# sudo docker run -d -p 9333:9333 -p 8080:8080 -v /opt/weed/data:/data cydev/weed volume -max=100 -mserver="localhost:9333" -dir="./data"


#sudo docker build --no-cache -t 'cydev/weed' .
#sudo docker run --name weedfs -d -p 9333:9333 -p 8080:8080 -v /opt/weed/data:/data cydev/weed server -dir="/data" -max=10 -ip="$(curl -s cydev.ru/ip)"
ENTRYPOINT ["/bin/sh"]