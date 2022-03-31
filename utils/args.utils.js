const minimist = require('minimist')
const options = { default: { PORT: 8080, mode:'fork' }, alias : { p: 'PORT', m:'mode'}}
const args = minimist(process.argv.splice(2), options)

module.exports = args