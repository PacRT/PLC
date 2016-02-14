--
-- Created by IntelliJ IDEA.
-- User: Hardik
-- Date: 1/31/16
-- Time: 7:32 PM
-- To change this template use File | Settings | File Templates.
local userid = redis.call('GET', "username:" ..ARGV[1].. ":uid")
redis.call("DEL","username:" ..userid.. ":login")
redis.call("DEL","auths:" ..ARGV[2].. ":login")
return "You have Have been Logged out"

