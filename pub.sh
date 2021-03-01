#!/bin/expect -f
spawn scp -r ./build/. root@47.104.198.49:/www/job
set timeout 30
expect "password:"
send "Xwj19941121"
send "\n"
expect eof 