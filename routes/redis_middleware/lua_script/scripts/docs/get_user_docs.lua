--
-- Created by IntelliJ IDEA.
-- User: Hardik
-- Date: 2/9/16
-- Time: 7:22 PM
-- To change this template use File | Settings | File Templates.
--  SSCAN docs:<user_name> <cursor>  MATCH  *category|3*

local docs_link = redis.call("SSCAN", "docs:"..ARGV[1] ,ARGV[2])
return docs_link

