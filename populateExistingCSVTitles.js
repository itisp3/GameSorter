const fs = require('fs');

function populateExistingCSVTitles()
{
    let existingTitles = new Set();
    if (fs.existsSync('gameRank.csv')) {

        // Read the contents of the "gameRank.csv" file
        fs.readFile('gameRank.csv', 'utf8', (err, data) => {
            if (err) {
                console.error(err.message);
                return;
            }

            // Split the CSV data into rows
            const existingRows = data.split('\n');

            // Iterate over the existing rows and extract the titles
            existingRows.forEach(row => {
                const columns = row.split(',');
                const title = columns[0].trim();
                if (title !== '') {
                    existingTitles.add(title);
                }
            });
        });
    }
    return existingTitles;
}

exports.populateExistingCSVTitles = populateExistingCSVTitles;