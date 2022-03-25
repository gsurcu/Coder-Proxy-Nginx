const minimist = require('minimist')

const PORT = { default: { port: 8080 }, alias : { p: 'port'}}
const arg = minimist(process.argv.slice(2), PORT)

const info = (req,res) => {
  const data = [
    arg,
    process.platform,
    process.version,
    process.memoryUsage().rss,
    process.execPath,
    process.pid,
    process.cwd(),
  ]
  console.log(data)
  res.send(data)
}

module.exports = info