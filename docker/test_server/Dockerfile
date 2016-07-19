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
RUN pip install pyinotify

WORKDIR /tmp
RUN git clone https://github.com/mysql/mysql-connector-python.git
WORKDIR mysql-connector-python
RUN chmod +x setup.py
RUN python ./setup.py install

WORKDIR /
COPY . script
WORKDIR script



# sudo docker build -t zerorpc_server docker/test_server
# sudo docker run -ti -p 4242:4242 -v /home/vmail/:/data --net=host zerorpc_server
ENTRYPOINT ["/bin/bash"]