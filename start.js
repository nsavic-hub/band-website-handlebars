// Start the app!
const app = require('./app')
app.set('port', 9000)
const server = app.listen(app.get('port'), () => {
  console.log(`Express running at’ PORT ${server.address().port}`)
})
