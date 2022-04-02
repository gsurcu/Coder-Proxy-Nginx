# Proxy & Nginx

## Cluster y Fork

### Nodemon
```
nodemon index.js 8080 fork
nodemon index.js 8081 cluster
```
CTRL + C
### Forever
```
forever start index.js --watch 8080 fork
forever start index.js --watch 8081 cluster
```
```
forever list
```
```
forever stop all
```
### PM2
```
pm2 start index.js --name=Fork-Server --watch -- 8080
pm2 start index.js --name=Cluster-Server --watch -i max -- 8081
```
```
pm2 delete all
```
## Nginx
```
pm2 start index.js --name=Fork-Server -- 8080 fork
pm2 start index.js --name=Cluster-Server -- 8081 cluster
```
```
pm2 start index.js --name=Server-1 -- 8082 fork
pm2 start index.js --name=Server-2 -- 8083 fork
pm2 start index.js --name=Server-3 -- 8084 fork
pm2 start index.js --name=Server-4 -- 8085 fork
```