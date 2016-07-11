#Image
FROM ubuntu:16.04
# Docker Maintainer
MAINTAINER hardik
# get all the required base packages to build and make
RUN sudo apt-get update
RUN sudo apt-get --assume-yes install python
#install python modules
RUN sudo apt-get --assume-yes install -y python-pip

RUN sudo pip install redis

RUN sudo apt-get --assume-yes install git

WORKDIR /tmp
RUN git clone https://github.com/mysql/mysql-connector-python.git
WORKDIR mysql-connector-python
RUN chmod +x setup.py
RUN python ./setup.py install

WORKDIR /tmp

#Cloning ZeroMQ Repo
RUN git clone https://github.com/zeromq/libzmq

#Installing zeromq Dependencies
RUN sudo apt-get --assume-yes install libtool
RUN sudo apt-get --assume-yes install pkg-config
RUN sudo apt-get --assume-yes install build-essential
RUN sudo apt-get --assume-yes install autoconf
RUN sudo apt-get --assume-yes install automake

#INSTALLING zeroMQ
WORKDIR libzmq
RUN echo "The present working directory is `pwd`"
RUN ./autogen.sh && ./configure && make -j 4
RUN make check && make install && sudo ldconfig

#Install CURL
RUN sudo apt-get --assume-yes install curl

#Install Nodejs
# gpg keys listed at https://github.com/nodejs/node
RUN set -ex \
  && for key in \
    9554F04D7259F04124DE6B476D5A82AC7E37093B \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
  ; do \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
  done

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 4.4.7

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt

RUN sudo apt-get --assume-yes install wget
#Install Easy_setup
RUN wget http://peak.telecommunity.com/dist/ez_setup.py
RUN sudo python ez_setup.py
RUN sudo easy_install pyinotify

RUN sudo pip install cassandra-driver
RUN sudo pip install redis
RUN sudo pip install cql-builder
RUN sudo apt-get --assume-yes install python-dev
RUN sudo pip install zerorpc

WORKDIR /
RUN git clone -b develop https://hardik91:679d48accd5acab1e5b335977eefe0251ee01c2c@github.com/PacRT/PLC.git
WORKDIR PLC

RUN npm install
RUN npm install gulp -g
RUN npm link gulp

ENTRYPOINT ["/bin/bash"]