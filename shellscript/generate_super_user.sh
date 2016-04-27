#!/usr/bin/env bash

echo SET email:admin@gmail.com:uid 1000 | redis-cli

echo SET username:admin:uid 1000 | redis-cli

echo SET uid:1000:username admin  | redis-cli
echo SET uid:1000:name Admin | redis-cli
echo SET uid:1000:password Ornithopter1 | redis-cli
echo SET uid:1000:status 0 | redis-cli
echo SET uid:1000:email admin@gmail.com | redis-cli

