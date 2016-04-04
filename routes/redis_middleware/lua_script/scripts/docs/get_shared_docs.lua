--
-- Created by IntelliJ IDEA.
-- User: Hardik
-- Date: 4/3/16
-- Time: 6:07 PM
-- To change this template use File | Settings | File Templates.
--
local docs_link = redis.call("SSCAN", "inbox:"..ARGV[1] ,ARGV[2])
return docs_link

