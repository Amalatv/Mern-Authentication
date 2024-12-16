const dotenv = require('dotenv');
const connectDb = require('./database/connection')
const app = require('./app')

dotenv.config();
const PORT = process.env.PORT || 8080

// mongodb connection
connectDb(); 

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    });
}

// Export the Express API
module.exports = app