# Proxy & Nginx

## Cluster y Fork
mode = m
### Nodemon
nodemon index.js --mode fork
nodemon index.js --mode cluster

CTRL + C
### Forever
forever start index.js --watch --mode fork
forever start index.js --watch --mode cluster

forever stop all
### PM2
pm2 start index.js --name=Fork-Server --watch -- --PORT=8081
pm2 start index.js --name=Cluster-Server --watch -i max -- --PORT=8082

pm2 delete all
## Nginx

node index.js --mode fork
node index.js --mode cluster