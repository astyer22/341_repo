const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'This is a simple API for managing contacts.',
    },
    host: 'three41-repo.onrender.com', 
    schemes: ['https'], 
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/contacts.js']; // Update with your routes file

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js'); 
});
