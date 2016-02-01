-- ARGV[1] -- username
-- ARGV[2] -- token
-- auths:<token>:auth --> userid
-- username:<userid>:auth --> token

local uid = redis.call('GET', "username:" ..ARGV[1].. ":uid")
if redis.call("EXISTS","auths:" ..uid.. ":auth") then
    local token1 = redis.call("GET","username:" ..uid.. ":auth")
    local uid1 = redis.call("GET","auths:" ..ARGV[2].. ":auth")
    if uid1 == uid and token1 == ARGV[2] then
        return true
    else
        return false
    end
else
    return false
end