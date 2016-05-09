import redis
import json

LUA = '''
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
'''

r = redis.Redis()
p = r.pubsub()

def main():
    p.subscribe("addPackage")
    fetcher = r.register_script(LUA)
    for message in p.listen():
        print(message['data'])
        if type(message['data']) == str:
            user_id = json.loads(message['data'])['user_name']
            packages = json.dumps(json.loads(message['data'])['packages'])
            fetcher(keys=[], args = [user_id,packages])


if __name__ == '__main__':
    main()
