# Online-Shopping-Portal
An Online Shopping website developed using Html, CSS, JavaScript, Embedded JavaScript, MySQL, Node.js  

It allows users to create account using mail verification with OTP. Once the account is created, the customer can log into the homepage where they could view the products and could add them to cart, then could increase or decrease quantity in the cart page and finally could place the order. The user receives a confirmation mail that the order has been placed with the user given deilvery details.

# Pre-Requisites
MySQL Database, Node.Js Application

# Features
All forms validated on Client side using HTML and JavaScript and on Server side using Node.js  
Responsive and nice looking webpages  
Embedded JavaScript used for generating pages with dyanamic data and also for sharing templated pieces with other webpages  
Data encryption and decryption done for security purpose while storing personal information in the database

# Working
Once you have installed both the mysql database and nodejs application, you should start your node app

The app.js is the main driver file that contains all the functions of the app. The app uses express module of Node.js framework that allows to set up middlewares to respond to http requests. It defines a routing table for performing different actions based on HTTP method and URL. It allows to dynamically render HTML pages based on passing arguments to templates.
The nodemailer module is one thing used for sending mails to the customer during mail verification for creating account, forgot password request and also for sending confirmation mail once order has been placed.
The mysql module acts as mysql driver that connects the server with the Mysql database. The crypto module has been used for encrypting and decrypting the data of personal details.
