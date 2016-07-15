AWS No disk space left issue
-------
http://stackoverflow.com/questions/6151695/ec2-instance-on-amazon-and-i-am-greeted-with-no-space-left-on-the-disk

"""
Here's an even easier method. (My m2.2xlarge instance was created with RedHat Linux 6.2, I discovered it had a paltry 6gb of it's 850gb available):

Via ssh, check space under root: $df -h
Filesystem            Size  Used Avail Use% Mounted on
/dev/xvde1              6G    6G    0G   100% /
none                   17G     0   17G   0% /dev/shm
From aws console, stop the instance
From aws console, detach the volume (though note the mount point under attachment info, eg /dev/sda1)
From aws console, take a snapshot of the volume
From aws console, create a new volume using the snapshot (using all the remaining space for the instance type, eg 825gb in my m2.2xlarge case)
From aws console, attach the new volume to original mount point /dev/sda1
From aws console, restart the instance and ssh back in to the instance
From ssh, run resize2fs on the root Filesystem (see df -h output in step 1)
$resize2fs /dev/xvde1
wait for a few minutes, possibly go and watch your buddy who is stopping all the root services etc like a boss : )
observe the new cavernous mount: $df -h
Filesystem            Size  Used   Avail Use%   Mounted on
/dev/xvde1            813G  3.7G    801G   1%     /
none                   17G     0     17G   0%     /dev/shm
"""
