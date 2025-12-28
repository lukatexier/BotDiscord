
require('dotenv').config(); 

module.exports = {
  port: process.env.PORT || 3000,
  discord: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    apiUrl: process.env.URL_DISCORD || 'https://discord.com/api/oauth2',
  },

};
