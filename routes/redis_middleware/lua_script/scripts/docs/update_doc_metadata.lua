--
-- Created by IntelliJ IDEA.
-- User: Hardik
-- Date: 3/12/16
-- Time: 9:51 PM
-- To change this template use File | Settings | File Templates.
--print(print(#ARGV, table.getn(ARGV)) )
--print(print(#KEYS, table.getn(KEYS)) )
redis.replicate_commands()
--Find Index of an element from table
table.indexOf = function( t, object )
    if "table" == type( t ) then
        for i = 1, #t do
            if object == t[i] then
                return i
            end
        end
        return -1
    else
        error("table.indexOf expects table for first argument, " .. type(t) .. " given")
    end
end
local stringHelper = {}
-- split string by give seperator
stringHelper.mysplit =function (inputstr, sep)
    if sep == nil then
        sep = "%s"
    end
    local t={}
    local i=1
    for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
        t[i] = str
        i = i + 1
    end
    return t
end
local doc_sets  = redis.call("SSCAN","docs:"..ARGV[2],0,"MATCH",ARGV[1].."|*")
local doc_index = doc_sets[2][1]
local outputT = stringHelper.mysplit(doc_index,"|")

for i=#ARGV,3,-1 do
    redis.call('HMSET', "doc:"..ARGV[1],KEYS[i],ARGV[i])
    local key_index = table.indexOf(outputT, KEYS[i])
    outputT[key_index + 1] = ARGV[i]
end
redis.call('SREM','docs:'..ARGV[2],doc_index)
local final_index  = table.concat(outputT, '|')
redis.call('SADD',"docs:"..ARGV[2] , final_index)
return true