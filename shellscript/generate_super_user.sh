#!/usr/bin/env bash

echo SET email:messi10@gmail.com:uid 1000 | redis-cli

echo SET username:messi10:uid 1000 | redis-cli

echo SET uid:1000:username messi10  | redis-cli
echo SET uid:1000:name Messi | redis-cli
echo SET uid:1000:password Ornithopter1 | redis-cli
echo SET uid:1000:status 0 | redis-cli
echo SET uid:1000:email messi10@gmail.com | redis-cli

