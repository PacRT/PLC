--
-- Created by IntelliJ IDEA.
-- User: Hardik
-- Date: 3/23/16
-- Time: 11:26 PM
-- To change this template use File | Settings | File Templates.
--
redis.replicate_commands()
local issuer_id = ARGV[1]
local pkg_ids = cjson.decode(ARGV[2])
local checkUserExists = function(email_id)
    local uid = redis.call("EXISTS","email:"..email_id..":uid")
    print(uid)
    if uid == 1  then
        local user_id =  redis.call("GET","email:"..email_id..":uid")
        local user_name = redis.call("GET","uid:"..user_id..":username")
        print("!!!!!!!!!!!!!!")
        print(user_name)
        print("!!!!!!!!!!!!!!")
        return user_name
    else
        return false
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

for i=1,#pkg_ids do
    local recepients = cjson.decode(redis.call("HGET", "package:"..pkg_ids[i],"recepients"))
    local docs =  cjson.decode(redis.call("HGET", "package:"..pkg_ids[i],"packages_added"))
    for j=1,#recepients do

        local user_name = checkUserExists(recepients[j])
        print("@@@@@@@@@@@@@@")
        print(user_name)
        print("@@@@@@@@@@@@@@")
        for k=1,#docs do
            local doc_url = docs[k]["doc_url"]
            if(user_name ~= false) then
                local is_doc_exists  = redis.call("SSCAN","inbox:"..user_name,0,"MATCH","*|"..doc_url)
                if next(is_doc_exists[2]) == nil then
                    local doc_sets_issuer =  redis.call("SSCAN","docs:"..issuer_id,0,"MATCH","*|"..doc_url)
                    print(doc_sets_issuer[2][1])
                    redis.call('SADD',"inbox:"..user_name ,doc_sets_issuer[2][1])
                    print("added packages!!!")
                else print("do something") end
            else
                local doc_sets_issuer =  redis.call("SSCAN","docs:"..issuer_id,0,"MATCH","*|"..doc_url)
                redis.call('SADD',"inbox:"..recepients[j] ,doc_sets_issuer[2][1])
            end
        end
    end
end
return ARGV