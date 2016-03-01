--
-- Created by IntelliJ IDEA.
-- User: Hardik
-- Date: 2/29/16
-- Time: 11:27 PM
-- To change this template use File | Settings | File Templates.
--
local userid = redis.call('GET', "username:" ..ARGV[1].. ":uid")
local authToken = redis.call('GET',"username:" ..userid.. ":login")
print(authToken)
print(userid)
redis.call("DEL","username:" ..userid.. ":login")
redis.call("DEL","auths:" ..authToken.. ":login")
return "You have Have been Logged out"


