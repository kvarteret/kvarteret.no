#! /bin/bash

# The Purpose of this Script is to batch convert and compress any video file to mp4 format
#
# WARNING: LOSSY COMPRESSION !!!

# Variable used:
# sourcedir is the directory where to be converted videos are. Converted video will be saved in the same folder

# usage:
#########################
# $ ls -al
# -> conv.sh
# -> /out
# -> /videos
# $ ./conv.sh videos/
#########################

# Source dir
sourcedir="$1"
if [[ $sourcedir ]]; then
     echo -e "Using \033[1;34m$sourcedir\033[0m as Input Folder"
	else
	 echo -e "\033[1;31mError: Check if you have set an input folder\033[0m"
	 exit
fi

################################################################
cd "$sourcedir"

for filelist in `ls`
do
  if ffmpeg -i $filelist 2>&1 | grep 'Invalid data found'		#check if it's video file
	   then
	   echo "ERROR File $filelist is NOT A VIDEO FILE can be converted!"
    continue
  fi
  echo -e "ffmpeg -i $filelist -y -f mp4 -an -c:v libx264 -crf 30 -vf scale=1920:1080 -preset medium -map_metadata 0 out-"$filelist" < /dev/null"
	ffmpeg -i $filelist -y -f mp4 -an -c:v libx264 -crf 30 -vf scale=1920:1080 -preset medium -map_metadata 0 "../out/$filelist" < /dev/null
done