--
-- Created by IntelliJ IDEA.
-- User: Hardik
-- Date: 3/22/16
-- Time: 2:36 PM
-- To change this template use File | Settings | File Templates.
--

local user_name = ARGV[1]
local package = cjson.decode(ARGV[2])
local pkg_id = package["package_id"]
redis.call("RPUSH","packages:"..user_name,pkg_id)
for key,value in pairs(package) do
    if "table" == type( value ) then
        value = cjson.encode(value)
    end
    redis.call("HMSET","package:"..pkg_id,key,value)
end

return pkg_id