import sqlite3
import json
import csv

conn = sqlite3.connect('C:\ProgramData\GOG.com\Galaxy\storage\galaxy-2.0.db')  

data = conn.execute("SELECT value, releaseKey from GamePieces where GamePieceTypeId = 21")

gameList = []

with open('gameRank.csv', 'w', encoding="utf-8", newline='') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=' ',
                            quotechar=',', quoting=csv.QUOTE_MINIMAL)
  
    for row in data:  
        jsonLine = json.loads(row[0])
        for line in jsonLine:
            if line == "title":
                title = jsonLine["title"]
                if title not in gameList and jsonLine["title"]:
                    spamwriter.writerow({title})
                    gameList.append(title)

conn.close();  