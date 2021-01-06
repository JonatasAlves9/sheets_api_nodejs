const { google } = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function (err, tokens) {

  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Connected!')
    gsrun(client)
  }

});

async function gsrun(cl) {

  const gsapi = google.sheets({ version: 'v4', auth: cl })

  const opt = {
    spreadsheetId: '1C9lrzZ08qn6i3E59h9OrtOUOF7XPNst4yuj2gcPJGAw',
    range: 'Data!A2:K200'
  };

  let data = await gsapi.spreadsheets.values.get(opt);
  let dataArray = data.data.values;

  console.log(dataArray);
  // const UpdateOptions = {
  //   spreadsheetId: '1C9lrzZ08qn6i3E59h9OrtOUOF7XPNst4yuj2gcPJGAw',
  //   range: 'Data!E2',
  //   valueInputOption: 'USER_ENTERED',
  //   resource:{ values: newDataArray }
  // };

  // let res = await gsapi.spreadsheets.values.update(UpdateOptions);
  // console.log(res)

}