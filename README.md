# PTBin

A simple pastebin inspired by [Ubuntu Pastebin](http://pastebin.ubuntu.com/)

## DEMO

Visit [Demo](http://acm.cjlu.edu.cn/gist)

## SCREENSHOTS

![](https://c1.staticflickr.com/5/4219/34805329622_e7d0fc7795_k.jpg)

![](https://c1.staticflickr.com/5/4225/34805330852_a8dff6bfff_k.jpg)

There are two ways to install it.

## Docker

1. git clone it: `git clone https://github.com/lazzzis/PTbin.git`
2. In the project directory, input command `docker-compose up`。If you want it to run in daemon mode, input command `docker-compose up -d`.

That's all. Visit `127.0.0.1:5050` in the browser then you can see the website.

## Manually Install

1. git clone it: `git clone https://github.com/lazzzis/PTbin.git`
2. install dependencies: `npm install`
3. install mysql or mariadb if it is not installed on your computer
4. config the connection string in `config.js`
5. type the command `npm run start` to start the application

That's all. Visit `127.0.0.1:3000` in the browser then you can see the website.

# Issues

## why does npm installing run so slowly in docker?

Occasionally but not always, npm might run slowly. The actual speed depends on your situation. You can also see a related [issue](https://github.com/npm/npm/issues/8836). But it doesn't matter, since you can just leave it running and then come back after several minutes.

## why does node application keep restarting in docker when starting?

Though mariadb starts before node application, docker can not ensure the mariadb is ready for connection before node application tries to connect mariadb. Hence, node application will restart for several times to try connections until mariadb is ready for connection.
