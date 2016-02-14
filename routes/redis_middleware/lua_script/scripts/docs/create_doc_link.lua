--
-- Created by IntelliJ IDEA.
-- User: Hardik
-- Date: 2/3/16
-- Time: 6:06 PM
-- To change this template use File | Settings | File Templates.
--
-- KEYS[1] is owner's UID, ARGV[1] is score/timestamp and ARGV[2] is docurl
--KEYS[3] - category KEYS[4] - File-name
redis.call('ZADD', "owner:"..KEYS[1]..":docs", ARGV[1], ARGV[2])
print("m hrere")
-- KEYS[2] is issuer's UID, ARGV[1] is score/timestamp and ARGV[2] is docurl
redis.call('ZADD', "issuer:"  ..KEYS[2]..":docs", ARGV[1], ARGV[2])
redis.call('HMSET', "doc:"..ARGV[2], "owner.uid", KEYS[1], "issuer.uid", KEYS[2],KEYS[3],ARGV[3],KEYS[4],ARGV[4])
redis.call('SADD',"docs:"..KEYS[1] ,ARGV[2].."|timestamp|"..ARGV[1].."|category|"..ARGV[3].."|file_name|"..ARGV[4].."|doc_url|".. ARGV[5])
print(KEYS[1] .."|".. KEYS[2] .."|".. ARGV[1] .."|".. ARGV[2]  .."|".. KEYS[3]  .."|".. ARGV[3]  .."|".. KEYS[4]  .."|".. ARGV[4])


