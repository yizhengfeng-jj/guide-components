if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/guide.min.js');
} else {
    module.exports = require('./dist/guide.js');
}