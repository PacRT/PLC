--
-- Created by IntelliJ IDEA.
-- User: Hardik
-- Date: 1/30/16
-- Time: 6:27 PM
-- To change this template use File | Settings | File Templates.
-- ARGV[1] - username
-- ARGV[2] - token
-- Please refere error-constants.json for erro code lua_*
-- username:<userid>:auth --> token
-- auths:<token>:auth --> userid
local userid = redis.call('GET', "username:" ..ARGV[1].. ":uid")
redis.call("SET","username:" ..userid.. ":auth",ARGV[2])
redis.call("SET","auths:" ..ARGV[2].. ":auth",userid)
redis.call("EXPIRE","auths:" ..ARGV[2].. ":auth",5000)
return ARGV[1] .."|".. ARGV[2]