# CNTX API

## Instructions

## Install
$ npm install

## Run in Dev
$ npm run dev

## Production Setup:
$ npm i -g pm2

### Run in Production
$ npm start

## Mongo Database Setup:

### Install it
$ sudo apt-get install -y mongodb-org

### Make data directory
$ mkdir data

### Create the command in the mongod file
$ echo 'mongod --dbpath=data --nojournal --rest "$@"' > mongod

### Change its permissions so it will let you run it
$ chmod a+x mongod

### Run it:
$ ./mongod

## Acounts:

## Register
POST /v1/account/register

Postman: raw/json
{
	"email": "ryan@ryan.com",
	"password": "123456"
}

You should see: 
Successfully created new account.

## Login
POST /v1/account/login
Postman: raw/json
{
	"email": "rncrtr@me.com",
	"password": "123456"
}

you should get back a token:
{
    "token": "XYZXYZXYZ"
}