// init packages
const express = require('express');
const XeroClient = require('xero-node').AccountingAPIClient;
const path = require('path');
const app = express();

if (process.env.NODE_ENV !== 'production') require('dotenv').config(); // use the .env file if on localhost
const port = process.env.PORT || 5000;

const env = process.env.NODE_ENV ? "" : `http://localhost:${port}`;

// config file for Xero
const config = {
    "appType": "public",
    "consumerKey": process.env.CONSUMER_KEY,
    "consumerSecret": process.env.CONSUMER_SECRET,
    "callbackUrl": `${env}/callback`
}

const xero = new XeroClient(config);
let reqToken = null;
const data = {}; // data that will hold invoices and accounts

// using EJS for html templates
app.set('view engine', 'ejs');
app.set("views", "views");

// to load CSS in public folder
app.use(express.static(path.join(__dirname, "public")));

// home root entry point to auth
app.get('/', (_, res) => {
    xero.oauth1Client.getRequestToken()
        .then(token => {
            reqToken = token;
            const authUrl = xero.oauth1Client.buildAuthoriseUrl(reqToken);
            res.redirect(authUrl);
        })
        .catch(err => console.error(err))
})

// called after a successful token to add invoices and accounts to data object
app.get('/callback', (req, res, next) => {
    const oauth_verifier = req.query.oauth_verifier;
    if (oauth_verifier) {
        xero.oauth1Client.swapRequestTokenforAccessToken(reqToken, oauth_verifier)
            .then(() => {
                return xero.accounts.get(); // get all the accounts from Xero
            })
            .then(accounts => {
                // add accounts to the data object
                data["accounts"] = accounts.Accounts.map(account => {
                    return account.Name;
                });
                // grab all the invoices
                return xero.invoices.get();
            })
            .then(invoices => {
                // add invoices to the data object
                data["invoices"] = invoices.Invoices.map(invoice => {
                    return invoice.Contact.Name;
                })
                // send the user to data url to render HTML page with a table of data and a button to save file
                res.redirect("/data");
            })
            .catch(err => console.error(err))

    } else {
        next();
    }

})

app.get('/data', (_, res, next) => {
    // check if the data obj is empty. If it is then fire the user back to the home url, otherwise send the data to the data.ejs template in the views folder to be processed
    if (Object.entries(data).length === 0 &&
        data.constructor === Object) {
        next();
    } else {
        res.render('data', {
            data
        })
    }

})

app.get('/download', (_, res, next) => {
    // once the user clicks the button this path will be executed. Text formatting being done to the string to be outputted into a downloadable txt file to the user's computer
    if (Object.entries(data).length === 0 &&
        data.constructor === Object) {
        next();
    } else {
        const text = `ACCOUNTS:\n${data.accounts.map(acc => ' ' + acc)}\n\nINVOICES:\n${data.invoices.map(inv => ' ' + inv)}`;
        res.attachment('beanworks-curtis.txt');
        res.type('txt');
        res.send(text);
    }
})

app.use('/', (_, res) => {
    res.redirect('/');
})

app.listen(port);

module.exports.app = app;