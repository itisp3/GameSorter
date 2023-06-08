const sqlite3 = require('sqlite3').verbose();
const { hltbServiceCall } = require("./hltbServiceCall");
const { populateExistingCSVTitles } = require("./populateExistingCSVTitles");
const { appendCSV } = require("./appendCSV");

// Create a Set to store the existing titles
const existingTitles = populateExistingCSVTitles();

// Open the database connection
const db = new sqlite3.Database('C:/ProgramData/GOG.com/Galaxy/storage/galaxy-2.0.db');

// SELECT statement
const sql = 'SELECT value FROM GamePieces WHERE GamePieceTypeId = 21';

// Execute the SELECT statement
db.all(sql, [], async (err, rows) => {
  if (err) {
    console.error(err.message);
    return;
  }

  // Map the response to retrieve the title value
  let titles = await Promise.all(rows.map(async (row) => {
    const valueString = row.value;
    const gogTitle = JSON.parse(valueString).title;
    if (!existingTitles.has(gogTitle))
    {
        existingTitles.add(gogTitle);
        const gameMain = await hltbServiceCall(gogTitle);
        if(!gameMain.startsWith("X"))
        {
            return gogTitle + "," + gameMain;
        }
    }
  }));

  titles = appendCSV(titles);

  // Close the database connection
  db.close();

});
