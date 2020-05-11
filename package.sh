echo "打包程序"

yarn build

rm -f fof.zip

zip -r fof.zip ./fof

scp fof.zip root@10.170.139.10:/home/web/front/fof
