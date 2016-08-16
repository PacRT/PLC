#postfix docker 
FROM ubuntu:16.04

RUN apt-get update
RUN apt-get -qq install vim
RUN DEBIAN_PRIORITY=low apt-get -qq install postfix
COPY main.cf /etc/postfix/main.cf
COPY mysql_virtual_mailbox_maps.cf /etc/postfix/mysql_virtual_mailbox_maps.cf
