# Beanworks Code Challenge

A coding challenge involving the Xero API for Beanworks using NodeJS. Sign up for a Xero Account and save the accounts and invoice data from a sample app.

## Installation Instructions

First of all make sure you have an account here: https://developer.xero.com/myapps/.  If you don't, please click the New App button at the top right corner.  Give the App a name and company URL.  For OAuth 1.0a Callback Domain put in localhost.

Create a folder on your computer and run the following commands in the terminal:

1. git clone (this repo)

2. create a .env file in the root and inside the file give it 2 variables: CONSUMER_KEY and CONSUMER_SECRET where the values of both are the generated values that were created when you made your app.  Example format below:

   ### CONSUMER_KEY=[YOURKEY]
   ### CONSUMER_SECRET=[YOURSECRET]

3. npm install
4. npm start
5. Go to http://localhost:5000.

## Documentation

1. All server side code in the server.js file in the root directory.

2. All tests are in the test.js file in the root directory.

3. HTML template using EJS in the views folder.

4. CSS is located in the public/css folder called styles.css

## How it works

Once authorized you will be redirected to an HTML page with a list of Accounts and Invoices. Click the "Save File to Disk" button to save .txt file to your computer with the data inside.
