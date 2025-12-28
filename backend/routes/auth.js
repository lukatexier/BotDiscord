const express = require('express');
const app = express();
const fetch = require('node-fetch');
const router = express.Router();
app.use(express.static('www'));

router.get('/oauth2/callback', async (req, res) => {
    var url = `${process.env.url_discord}/token`;
    var params = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;
    params += `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;
    params += `&grant_type=authorization_code&code=${req.query.code}`;

    
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',

    }
    var response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: params
    });
    if(response.ok){
        var json = await response.json();
        console.log(json);
        const userInfo = await fetch('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${json.access_token}`
            }
        });
        res.send(await userInfo.json());
    } else {
        var error = await response.text();
        console.error('Error:', error);
        res.send('Error: ' + error);
    }

});

router.get('/connexion', (req, res) => {
    const discordAuthUrl = `${process.env.url_discord}/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&response_type=code&scope=identify`;
    res.redirect(discordAuthUrl);
});

router.get('/connexion/bis', (req, res) => {
    const discordAuthUrl = `${process.env.url_discord}/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&response_type=code&scope=identify`;
    res.send(discordAuthUrl);
});


module.exports = router;
