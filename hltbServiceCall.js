const hltb = require('howlongtobeat');
const hltbService = new hltb.HowLongToBeatService();
exports.hltbService = hltbService;

//This async function is needed to get the results back from the HowLongToBeat service as it returns and
//make sure it matches to the title

async function hltbServiceCall(title) {
    try {
        let result = await hltbService.search(title ? title : "");
        if (!result[0]) {
            //This is a lazy way to do roman numerals.  GOG seems to store titles with numbers, but HowLongToBeat may use numerals
            title = title.replace("2", "II").replace("3", "III").replace("4", "IV").replace("5", "V").replace("6", "VI")
                .replace("7", "VII").replace("8", "VIII").replace("9", "IX").replace("10", "X").replace("11", "XI");

            //try again with the numeral
            result = await hltbService.search(title ? title : "");
        }

        //The idea with this while loop is to shorten titles by five characters until the HowLongToBeat service finds something
        //It might not always be 'right', but it will be as close as the API can get
        //It checks if the title is nine characters or longer so there isn't a check for less than four characters
        // (which I arbitrarily chose as too short for a reasonable comparison)
        while (!result[0] && title.length > 9) {
            title = title.substring(0, title.length - 5);
            result = await hltbService.search(title ? title : "");
        }

        //If after all that there is no match, set Main and Main+Extra to 999
        return result[0] ? result[0].gameplayMain + "," + result[0].gameplayMainExtra : "999,999";
    } catch (error) {

        //TODO: The API only allows ~300 calls before it refuses access
        //Need to change this console log to a check for status code 503, add a sleep command, and keep running
        console.error(`Error occurred for title: ${title} : ${error}`);
        return "X,X";
    }
}
exports.hltbServiceCall = hltbServiceCall;
