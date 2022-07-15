ATTENTION:
If you have never used nodejs. I recommend you read this entire file before you proceed as I have tried to explain each step very thoroughly. :) If you have any issues or questions, please feel free to contact me on twitter @SCowboy88

If you would like to send a tip on the ETH network my ETH address is: 
0x1EBCc579C094d9c28BC651FcD11fda97252397f1


INSTALL DEPENDENCIES:
Be sure you have nodejs installed by going to https://nodejs.org/en/download/ and downloading/installing it.

Then, open powershell/terminal/cmd, whichever one you have, and type the command: 

npm install -g npm

After that, make sure your config.txt is properly configured by reading the info below.


CONFIG FILE INSTRUCTIONS:

Be sure to leave headers exactly as they are. (~keys, ~searchTerms & ~retweetQuote)

Be sure you leave a blank line after each parameter's last entry for each header.

Populate appKey, appSecret, accessToken & accessSecret with your own keys, which can be found by creating your twitter developer app at https://developer.twitter.com/

~searchTerms are line-by-line; meaning that each line will be an entire search term. So if you have "search for this" on a line by itself under ~searchTerms, it will search for the entire phrase. Feel free to search hashtags if you want. 

for ~retweetQuote you must put the full text on a single line. Also be sure your under the 140 char limit enforced by twitter or the script may error out and not run. Links are counted as characters as well. 

If the script seems to have frozen, don't worry it will catch back up. It has to wait on a few different requests from twitter which can take time, sometimes. Also twitter will limit the amount of requests in a certain amount of time and the script is smart enough to wait until that timme limit has elapsed and will try again. So just let it run. If in doubt it won't hurt it to stop it by pressing "ctrl+c" or "cmd+c" and restarting it, but I would recommend being patient first. 


RUNNING THE SCRIPT:
Once you have configured your config file. Make sure you are in the right directory in your terminal where your config file is.

If you need help making sure you are in the right directory see "TRAVERSING DIRECTORIES IN POWERSHELL/CMD/TERMINAL" below.

If you ae in the right place, you are now ready to go! 
Just type:

node main.js

Then press enter/return. 

whallah! 

Again, if you ahve any issues, contact me on twitter @SCowboy88.

If you would like to send a tip on the ETH network my ETH address is: 
0x1EBCc579C094d9c28BC651FcD11fda97252397f1


TRAVERSING DIRECTORIES IN POWERSHELL/CMD/TERMINAL:
FYI: (old windows used CMD or command prompt and is still used today, but mostly replaced by powershell. If you have Windows 10 or later you have both. I recommend using powershell. Terminal is what linux and mac use. These commands should work for all 3.)

You can check your present working directory by typing the command:

pwd

if you want to see directories within the current directory or folder, type the command: 

ls

in order to traverse through the directories or folders, simply type:

cd THE-DIRECTORY-YOU-WANT-TO-GO-TO

In other words, say I open powershell and type pwd and it shows something like this. 

C:\Users\Me\Desktop

This means that my terminal/powershell/cmd, whichever one you are using, is currently pointed at my Desktop.

Let's say I have my folder named "tweetSearcher" on my desktop.

If I type:

ls 

I will see all the folders on my Desktop. I should then see "tweetSearcher"

In order to get into that folder I would type:

cd tweetSearcher

Then if I type:

pwd

I will see this:

C:\Users\Me\Desktop\tweetSearcher

This means I am in the correct folder. You can confirm by typing:

ls

Now you should see your config.txt file along with main.js and this README.txt along with node_modules and a couple package files.