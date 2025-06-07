const { google } = require('googleapis');

module.exports = async (req, res) => {
  // Configuration CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'https://www.logement-atypique.fr');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Gestion des requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { 
    nomComplet,
    email,
    telephone,
    telephonePays,
    typeLogement,
    localisation,
    siteWeb,
    description
  } = req.body;

  if (!nomComplet || !email || !typeLogement || !localisation || !description) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' });
  }

  // Formatage du téléphone en international
  function formatPhoneInternational(phone, country) {
    const digits = phone.replace(/[^\d]/g, '');
    switch (country) {
      case 'FR':
        return '+33' + digits.replace(/^0/, '');
      case 'BE':
        return '+32' + digits.replace(/^0/, '');
      case 'CH':
        return '+41' + digits.replace(/^0/, '');
      case 'LU':
        return '+352' + digits.replace(/^0/, '');
      case 'CA':
        return '+1' + digits;
      default:
        return phone;
    }
  }

  try {
    console.log('Début du traitement de la requête de partenariat');
    console.log('Données reçues:', req.body);
    
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
      const SHEET_NAME = 'Partenariat';

      console.log('Tentative d\'ajout dans le spreadsheet...');
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:G`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            new Date().toLocaleString(),
            nomComplet,
            email,
            formatPhoneInternational(telephone, telephonePays) || '',
            typeLogement,
            localisation,
            siteWeb || '',
            description
          ]],
        },
      });
      
      console.log('Réponse de l\'API Sheets:', response.data);
      res.status(200).json({ message: 'OK' });
    } catch (sheetsError) {
      console.error('Erreur lors de l\'interaction avec Google Sheets:', sheetsError);
      return res.status(500).json({ 
        error: 'Erreur lors de l\'ajout du partenariat',
        details: sheetsError instanceof Error ? sheetsError.message : 'Erreur inconnue lors de l\'interaction avec Google Sheets'
      });
    }
  } catch (err) {
    console.error('Erreur générale:', err);
    res.status(500).json({ 
      error: "Erreur lors de l'ajout du partenariat",
      details: err instanceof Error ? err.message : 'Erreur inconnue'
    });
  }
}; 