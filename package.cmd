@echo off
echo 打包文件并上传

yarn build && tar -cvf old.tar.gz old && scp old.tar.gz sma@10.170.129.129:/home/sma/deploy/frontend