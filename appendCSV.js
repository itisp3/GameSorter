const fs = require('fs');

function appendCSV(titles) {
    
   //Can't figure out why, but this code generates a lot of undefined lines.  This takes them out
    titles = titles.filter(function (element) {
        return element !== undefined;
    });

    const csvData = titles.join('\n');

    // Write the CSV data to the "gameRank.csv" file
    fs.writeFile('gameRank.csv', csvData + '\n', { flag: 'a' }, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('Data exported to gameRank.csv');
    });
    return titles;
}
exports.appendCSV = appendCSV;
