const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'This is a simple API for managing contacts.',
    },
    host: 'localhost:3000', 
    schemes: ['https'], 
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/contacts.js']; 

swaggerAutogen(outputFiles, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./'); 
// });
