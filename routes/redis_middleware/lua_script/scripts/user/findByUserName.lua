--
-- Created by IntelliJ IDEA.
-- User: Hardik
-- Date: 1/30/16
-- Time: 12:23 AM
-- To change this template use File | Settings | File Templates.
--
local uid = redis.call('GET', "username:" .. KEYS[1] .. ":uid" )
local password = redis.call('GET', "uid:" ..uid.. ":password")
local email = redis.call('GET', "uid:" ..uid.. ":email")
local name = redis.call('GET', "uid:" ..uid.. ":name")
local status = redis.call('GET', "uid:" ..uid.. ":status")
print(uid .. "|" ..KEYS[1].. "|".. password .. "|" .. email.. "|" ..(name or KEYS[1]).. "|" ..(status or 'active'))
return uid .. "|" ..KEYS[1].. "|" ..password.. "|" ..email.. "|" ..(name or KEYS[1]).. "|" ..(status or 'active')