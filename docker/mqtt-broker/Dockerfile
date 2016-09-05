# Mosca
#
# 

FROM mhart/alpine-node:4
MAINTAINER Chiradip Mandal <chiradip@chiradip.com>

RUN apk update && \
    apk add make gcc g++ python git && \
    npm install mosca -g && \
    apk del make gcc g++ python git

EXPOSE 1883

ENTRYPOINT ["mosca", "-d", "/db", "-v"]

#sudo docker build -t mosca .
#sudo docker run -p 1883:1883 -t mosca 
# you can also run the following command - no Dockerfile required for that 
#docker run -p 1883:1883 -v /var/db/mosca:/db matteocollina/mosca
