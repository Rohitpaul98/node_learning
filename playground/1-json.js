const fs = require('fs');

const data = {
    id: "0003",
    type: "donut",
    name: "Old Fashioned"
}
const jsonData = JSON.stringify(data);
// fs.writeFileSync("1-json.json", jsonData);
const dataBuffer = fs.readFileSync("1-json.json");
console.log("dataBuffer--> " + dataBuffer);

const parsed = JSON.parse(dataBuffer);

console.log("type- " + parsed.type);


