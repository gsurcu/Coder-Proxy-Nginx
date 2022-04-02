const os = require('os')
const info = (req,res) => {
  const data = {
    argumentos : process.argv.slice(2),
    sistema : process.platform,
    version : process.version,
    memoria: process.memoryUsage().rss,
    path : process.execPath,
    processId : process.pid,
    directorio : process.cwd(),
    num_CPUs : os.cpus().length
  }
  console.log(data)
  res.render('info', {data:data})
}

module.exports = info