-- ARGV[1] -- username
-- ARGV[2] -- token
-- auths:<token>:login --> userid
-- username:<userid>:login --> token

local uid = redis.call('GET', "username:" ..ARGV[1].. ":uid")
local is_token_exists = redis.call("TTL","auths:" ..ARGV[2].. ":login")
print(is_token_exists)
if redis.call("EXISTS","auths:" ..uid.. ":login") then
    local token1 = redis.call("GET","username:" ..uid.. ":login")
    local uid1 = redis.call("GET","auths:" ..ARGV[2].. ":login")
    if uid1 == uid and token1 == ARGV[2] then
        return true
    else
        return error("::: lua_104")
    end
else
    return error("::: lua_104")
end