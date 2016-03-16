--
-- Created by IntelliJ IDEA.
-- User: Hardik
-- Date: 3/13/16
-- Time: 1:00 AM
-- To change this template use File | Settings | File Templates.
-- SSCAN docs:<user_name> <cursor>  MATCH  *category|3*
local docs_link = redis.call("SSCAN", "docs:"..ARGV[1] ,ARGV[2], "MATCH" , "*category|"..ARGV[3].."*")
return docs_link


