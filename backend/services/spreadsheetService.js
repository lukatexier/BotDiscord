const { google } = require('googleapis');
const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json', // fichier JSON du compte de service
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});


async function getAuthClient() {
  return await auth.getClient();
}


const SPREADSHEET_ID = '1D6Y-DXBZ1_uCkmbLrgiFUSIkHSbbCIrJYMeE4z6s1lw';
const RANGE = 'Liste Étudiant!A1:B22';
const COLONNES = ['B', 'C', 'D', 'E', 'F'];


async function lireUser() {
  
    const client = await getAuthClient();
    return await getUser(client);
}

async function getUser(client) {
  const res = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId:SPREADSHEET_ID,
    range:RANGE,
  });

  var users = [];
  res.data.values.forEach(row => {

    users.push({
      name: row[0],
      id: row[1]
    });
  });


   console.log(users);
  return users;
}



var lireEDT = async (id) => {
    const client = await getAuthClient();
    
    return await getEDT(id, client);

}

var getEDT = async (id, client) => {
    
    
    var users = await getUser(client);
    var user = users.find(u => u.id == id);

    if(user != null) {
        const res = await sheets.spreadsheets.values.get({
            auth: client,
            spreadsheetId:SPREADSHEET_ID,
            range:`${user.id}-${user.name}!B2:F11`,
        });


        var edt = [];
        for(h = 0; h < 10; h++) {
            var row = res.data.values[h];
            if(row == null){
                for (d = 0; d < 5; d++) {
                    edt.push({
                        jour : d,
                        heure : h+8, 
                        cours : ''
                    })
                }
            }
            else {
                for (d = 0; d < 5; d++) {
                    var cell = row[d];
                    
                    edt.push({
                        jour: d,
                        heure: h+8,
                        cours: cell? cell : ''
                    });
                    
                }
            }
        }
        
        return edt;
        
    }

}


function edtToValues(edt) { 
  const NB_HEURES = 10; // 8 à 17
  const NB_JOURS = 5;

  // Initialisation tableau vide
  const values = Array.from({ length: NB_HEURES }, () =>
    Array.from({ length: NB_JOURS }, () => '')
  );

  edt.forEach(cell => {
    const h = cell.heure - 8; // 8h -> index 0
    const d = cell.jour;     // 0..4

    if (h >= 0 && h < NB_HEURES && d >= 0 && d < NB_JOURS) {
      values[h][d] = cell.cours;
    }
  });

  return values;
}


function heureVersLigne(heure) {
  return (heure - 8) + 2;
}

async function setCours(id, jour, heure, cours) {
  const client = await getAuthClient();

  const users = await getUser(client);
  const user = users.find(u => u.id == id);
  if (!user) return;6

  const colonne = COLONNES[jour];
  const ligne = heureVersLigne(heure);

  const range = `${user.id}-${user.name}!${colonne}${ligne}`;

  await sheets.spreadsheets.values.update({
    auth: client,
    spreadsheetId: SPREADSHEET_ID,
    range,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[cours]]
    }
  });
  console.log(`Cours mis à jour pour ${user.name} à ${heure}h le jour ${jour}`);

}



async function getAllEDT() {
  const client = await getAuthClient();
  const users = await getUser(client);
  const allEDT = {};

  for (const user of users) {
    try {
      const edt = await lireEDT(user.id, client);
      allEDT[user.id] = edt;
    } catch (error) {
      console.warn(`Pas de feuille pour l'étudiant ${user.id}: ${error.message}`);
      allEDT[user.id] = null; 
    }
  }

  return allEDT;
}



module.exports = {
  lireUser,
  lireEDT,
  setCours, 
  getAllEDT
};



