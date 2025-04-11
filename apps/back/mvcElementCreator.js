const fs = require('fs');

// read the file
const fileName = process.argv[2];

console.log('>> fileName : ', fileName)


// create a controller file
fs.writeFile(`./src/controllers/${fileName}.controller.js`, '', (err) => {
    if (err) throw err;
    console.log(`File created successfully ${fileName}.controller.js`);
});

// create a model file
fs.writeFile(`./src/models/${fileName}.model.js`, '', (err) => {
    if (err) throw err;
    console.log(`File created successfully ${fileName}.model.js`);
});

// create a route file
fs.writeFile(`./src/routes/${fileName}.route.js`, '', (err) => {
    if (err) throw err;
    console.log(`File created successfully ${fileName}.route.js`);
});
