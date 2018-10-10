const express = require('express');
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');

const apiKey = 'eae4fdbe9fe08b6f08d289fd8c0a45f0';
const apiSecret = '4ce3f59e726656f97e5721bc8a26ec1a';

const app = express();
const forwardingAddress = 'https://c0f6a56c.ngrok.io'; // TODO need to change this
let shop;

function getAccessToken() {
    app.listen(3000, () => {
    });

    app.get('/shopify', (req, res) => {
        const scopes = 'read_customers,read_orders,write_orders,read_products';
        shop = req.query.shop;
        if (shop) {
            const state = nonce();
            const redirectUri = `${forwardingAddress}/shopify/callback`;
            const installUrl = `https://${shop
                }/admin/oauth/authorize?client_id=${apiKey
                }&scope=${scopes
                }&state=${state
                }&redirect_uri=${redirectUri}`;

            res.cookie('state', state);
            res.redirect(installUrl);
        } else {
            return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
        }
    });

    app.get('/shopify/callback', (req, res) => {
        const {
            shop, hmac, code, state,
        } = req.query;
        const stateCookie = cookie.parse(req.headers.cookie).state;
        process.env.shop = shop;
        if (state !== stateCookie) {
            return res.status(403).send('Request origin cannot be verified');
        }

        if (shop && hmac && code) {
            const map = Object.assign({}, req.query);
            delete map.signature;
            delete map.hmac;
            const message = querystring.stringify(map);
            const providedHmac = Buffer.from(hmac, 'utf-8');
            const generatedHash = Buffer.from(
                crypto
                    .createHmac('sha256', apiSecret)
                    .update(message)
                    .digest('hex'),
                'utf-8',
            );
            let hashEquals = false;

            try {
                hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac);
            } catch (e) {
                hashEquals = false;
            }

            if (!hashEquals) {
                return res.status(400).send('HMAC validation failed');
            }

            const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
            const accessTokenPayload = {
                client_id: apiKey,
                client_secret: apiSecret,
                code,
            };

            request.post(accessTokenRequestUrl, { json: accessTokenPayload })
                .then((accessTokenResponse) => {
                    process.env.access_token = accessTokenResponse.access_token;
                    console.log("Access Token is : " + accessTokenResponse.access_token);
                    res.status(200).send('Sucessfully got access_token');
                    resolve('OK');
                })
                .catch((error) => {
                    res.status(error.statusCode).send(error.error.error_description);
                    reject(error);
                });
        } else {
            res.status(400).send('Required parameters missing');
        }
    });
}

getAccessToken();
module.exports.getAccessToken = getAccessToken