FROM ubuntu:16.04

# Docker Maintainer

MAINTAINER chiradip

# get all the required base packages to build and make

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update

RUN apt-get --assume-yes install software-properties-common

RUN add-apt-repository "deb http://archive.ubuntu.com/ubuntu $(lsb_release -sc) main universe"

RUN apt-get update \

    && apt-get --assume-yes install build-essential \

    && apt-get --assume-yes install wget

RUN apt-get update

RUN apt-get -y install vim

#RUN apt-get --assume-yes install procmail \
#    && apt-get --assume-yes install postfix-mysql \
#    && apt-get --assume-yes install postfix-ldap \
#    && apt-get --assume-yes install postfix-pcre \
#    && apt-get --assume-yes install sasl2-bin \
#    && apt-get --assume-yes install dovecot-common \
#    #&& apt-get --assume-yes install resolvconf \
#    && apt-get --assume-yes install postfix-cdb \
#    && apt-get --assume-yes install mail-reader \
#    && apt-get --assume-yes install ufw \
#    && apt-get --assume-yes install openssl-blacklist

RUN apt-get -y install postfix

RUN apt-get -y install postfix-mysql

COPY mysql_virtual_mailbox_maps.cf /etc/postfix/mysql_virtual_mailbox_maps.cf

RUN postconf compatibility_level=2

COPY main.cf /etc/postfix/main.cf

#COPY docker-entrypoint.sh /usr/local/bin/

#ENTRYPOINT ["docker-entrypoint.sh"]

CMD postfix start
