-- incr global:getNextUserId
-- set uid:4:username bob
-- set username:bob:uid 4
-- set uid:4:email ch@ch.com
-- set uid:4:password secret
-- set email:ch@ch.com:uid 4

local uid = redis.call('INCR', "global:getNextUserId")
local email = ARGV[1]
local pwd = ARGV[4]
local phone = ARGV[5]
local uname = ARGV[6]
local status = ARGV[7]
local unamecheck_uid = redis.call('GET', "username:" ..uname.. ":uid")
if unamecheck_uid then error("::: lua_101") end
local emailcheck_uid = redis.call('GET', "email:" ..email.. ":uid")
if emailcheck_uid then error("::: lua_103") end
redis.call('SET', "uid:" ..uid.. ":username", uname) -- ARGV[6] is username
redis.call('SET', "username:" ..ARGV[6].. ":uid", uid)
redis.call('SET', "uid:" ..uid.. ":email", email) -- ARGV[1] is email
redis.call('SET', "uid:" ..uid.. ":password", pwd) -- ARGV[4] is password
redis.call('SET', "email:" ..ARGV[1].. ":uid", uid)
local name = ARGV[2].." "..ARGV[3]
redis.call('SET', "uid:" ..uid.. ":name", name) -- ARGV[2] .. ARGV[3] is the fullname of the user
redis.call('SET', "uid:" ..uid.. ":status", status) -- ARGV[5] is the status of user - active/inactive/premium etc.]]
return ARGV[6] ..":".. uid ..":".. ARGV[1]
