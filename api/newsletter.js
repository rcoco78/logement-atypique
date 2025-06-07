const { google } = require('googleapis');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email manquant' });
  }

  try {
    console.log('Début du traitement de la requête');
    console.log('Email reçu:', email);
    
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      console.error('GOOGLE_SERVICE_ACCOUNT_KEY manquant');
      return res.status(500).json({ error: 'Configuration manquante: GOOGLE_SERVICE_ACCOUNT_KEY non définie' });
    }

    let serviceAccount;
    try {
      console.log('Parsing de la clé de service...');
      serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
      console.log('Clé de service parsée avec succès');
    } catch (parseError) {
      console.error('Erreur lors du parsing de la clé de service:', parseError);
      return res.status(500).json({ 
        error: 'Erreur de configuration',
        details: 'La clé de service n\'est pas un JSON valide'
      });
    }

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: serviceAccount,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      console.log('Initialisation de l\'API Sheets...');
      const sheets = google.sheets({ version: 'v4', auth });
      const SPREADSHEET_ID = '12r5EqFj8VOLFwUeaoBW4omwpSLhJULX4aVYi-33p8TY';
      const SHEET_NAME = 'Newsletter';

      console.log('Tentative d\'ajout dans le spreadsheet...');
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:B`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[new Date().toLocaleString(), email]],
        },
      });
      
      console.log('Réponse de l\'API Sheets:', response.data);
      res.status(200).json({ message: 'OK' });
    } catch (sheetsError) {
      console.error('Erreur lors de l\'interaction avec Google Sheets:', sheetsError);
      return res.status(500).json({ 
        error: 'Erreur lors de l\'ajout à la newsletter',
        details: sheetsError instanceof Error ? sheetsError.message : 'Erreur inconnue lors de l\'interaction avec Google Sheets'
      });
    }
  } catch (err) {
    console.error('Erreur générale:', err);
    res.status(500).json({ 
      error: "Erreur lors de l'ajout à la newsletter",
      details: err instanceof Error ? err.message : 'Erreur inconnue'
    });
  }
}; 