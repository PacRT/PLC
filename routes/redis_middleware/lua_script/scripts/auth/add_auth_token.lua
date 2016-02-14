--
-- Created by IntelliJ IDEA.
-- User: Hardik
-- Date: 1/30/16
-- Time: 6:27 PM
-- To change this template use File | Settings | File Templates.
-- ARGV[1] - username
-- ARGV[2] - token
-- Please refere error-constants.json for erro code lua_*
-- username:<userid>:login --> token
-- auths:<token>:login --> userid
local userid = redis.call('GET', "username:" ..ARGV[1].. ":uid")
redis.call("SET","username:" ..userid.. ":login",ARGV[2])
redis.call("SET","auths:" ..ARGV[2].. ":login",userid)
redis.call("EXPIRE","auths:" ..ARGV[2].. ":login",3600 * 24 * 30)
return ARGV[1] .."|".. ARGV[2]