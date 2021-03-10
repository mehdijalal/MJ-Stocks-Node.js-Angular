AdminPortal-Services README

# Setup back-end environment

1. npm install
2. create .env file looks like following example to use 'MS SQL Serve Studio' locally

DB_NAME=Seneca
DB_USER=test2
DB_PW=test
DB_SERVER='localhost'
DB_HOST3='localhost\\SQLExpress'
DB_PORT=1433

# Setup database

Need to be documented

# Compile back-end

Use one terminal to compile:

tsc

# Run back-end server

! DO NOT USE 'npm start'
Use another terminal to run back-end

1. cd build
2. node index.js

# End readme
