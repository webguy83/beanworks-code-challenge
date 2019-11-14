# Beanworks Code Challenge

A coding challenge involving the Xero API for Beanworks using NodeJS. Sign up for a Xero Account and save the accounts and invoice data from a sample app.

## Installation Instructions
1. git clone

2. create a .env file in the root and give it two props of your key and secret for the sample auth1 app:

   ### CONSUMER_KEY=[YOURKEY]

   ### CONSUMER_SECRET=[YOURSECRET]

3. npm install
4. npm start

## Documentation

1. All server side code in the server.js file in the root directory.

2. All testing code in the test.js file in the root directory.

3. HTML template using EJS in the views folder.

4. CSS is located in the public/css folder called styles.css

## How it works

Once authorized you will be redirected to an HTML page with a list of Accounts and Invoices. Click the "Save File to Disk" button to save .txt file to your computer with the data inside.
