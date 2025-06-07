import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email manquant' });
  }

  const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const SPREADSHEET_ID = '12r5EqFj8VOLFwUeaoBW4omwpSLhJULX4aVYi-33p8TY';
  const SHEET_NAME = 'Newsletter';

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:B`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[new Date().toLocaleString(), email]],
      },
    });
    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'ajout à la newsletter." });
  }
} 