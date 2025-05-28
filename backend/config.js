const config = {
    development: {
        apiUrl: 'http://localhost:5000',
        mongodbUri: 'mongodb://localhost:27017/icons-of-change',
        uploadPath: 'uploads/'
    },
    production: {
        apiUrl: process.env.API_URL || 'https://your-production-domain.com',
        mongodbUri: process.env.MONGODB_URI,
        uploadPath: process.env.UPLOAD_PATH || 'uploads/'
    }
};

const environment = process.env.NODE_ENV || 'development';
module.exports = config[environment]; 