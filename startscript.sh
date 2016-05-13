#!/usr/bin/env bash
echo "\nrunning ... script"
echo $PWD
echo "Killing Front End and Nodejs process---started"
kill -9 $(lsof -ti tcp:7979)
kill -9 $(lsof -ti tcp:3333)
echo "Killing Front End and Nodejs process---ended"
echo "********************************************************** Starting generate_super_user"
sh shellscript/generate_super_user.sh
echo "********************************************************** Ending generate_super_user"

echo "********************************************************** Starting Node app and UI"
echo 'hardik123' | sudo -S command
sudo weed server -master.port=9333 -volume.port=8080 -dir="/data"
cd pythonscript
chmod +x confirmemail.py
chmod +x createUserVmail.py
chmod +x forwardPackage.py
chmod +x add_package.py
sudo python add_package.py &
sudo python confirmemail.py &
sudo python createUserVmail.py &
sudo python forwardPackage.py &
cd ..
echo $PWD
echo "kicking off server"
gulp server node-app --prod

echo "********************************************************** Ending"

# docker build -t plc .
# docker run -i -t -p 3333:3333 -p 7979:7979 -p 6379:6379 plchardik@deagle:~/stash/plc_alpha$
