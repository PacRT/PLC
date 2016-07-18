#Image
FROM ubuntu:16.04
# Docker Maintainer
MAINTAINER hardik
# get all the required base packages to build and make
RUN apt-get update
RUN apt-get --assume-yes install python
#install python modules
RUN apt-get --assume-yes install -y python-pip
RUN apt-get --assume-yes install python-dev
#Install CURL
RUN apt-get --assume-yes install curl
RUN apt-get --assume-yes install wget
RUN apt-get --assume-yes install git

#Cloning ZeroMQ Repo
RUN git clone https://github.com/zeromq/libzmq

#Installing zeromq Dependencies
RUN apt-get --assume-yes install libtool
RUN apt-get --assume-yes install pkg-config
RUN apt-get --assume-yes install build-essential
RUN apt-get --assume-yes install autoconf
RUN apt-get --assume-yes install automake
RUN apt-get --assume-yes install default-jre
#INSTALLING zeroMQ
WORKDIR libzmq
RUN echo "The present working directory is `pwd`"
RUN ./autogen.sh && ./configure && make -j 4
RUN make check && make install && ldconfig

#Installing Python Dependencies
RUN pip install zerorpc

WORKDIR /
COPY test_client.py PLC
WORKDIR PLC

# sudo docker build -t zerorpc_client .
# sudo docker run -ti --net=host zerorpc_client
ENTRYPOINT ["/bin/bash"]
