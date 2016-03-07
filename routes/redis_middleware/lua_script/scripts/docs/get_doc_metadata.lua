--
-- Created by IntelliJ IDEA.
-- User: Hardik
-- Date: 3/6/16
-- Time: 2:50 PM
-- To change this template use File | Settings | File Templates.
--
return redis.call('HGETALL',"doc:"..ARGV[1])

