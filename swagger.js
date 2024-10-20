const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Your API Title',
        description: 'Your API Description',
    },
    host: 'your-deployment-url.com', // Update this to your deployed URL
    schemes: ['https'], // Specify the protocol used
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js']; // Update with your routes file

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js'); // Your server file
});
