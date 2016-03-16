--
-- Created by IntelliJ IDEA.
-- User: Hardik
-- Date: 3/12/16
-- Time: 9:51 PM
-- To change this template use File | Settings | File Templates.
print(print(#ARGV, table.getn(ARGV)) )
print(print(#KEYS, table.getn(KEYS)) )

for i=#ARGV,3,-1
do
   redis.call('HMSET', "doc:"..ARGV[1],KEYS[i],ARGV[i])
end
return true