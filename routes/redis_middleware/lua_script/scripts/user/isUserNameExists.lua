local uid = redis.call('GET', "username:" .. ARGV[1] .. ":uid" )
print("uid--uid--uid--uid--uid--uid--uid--uid--")
print(uid)
if uid then return "true" else return "false" end