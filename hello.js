const fs = require('fs');

const readme = fs.readFileSync("readme.txt", "utf8");
console.log(readme);