const restify = require('restify')
const plugins = require('restify-plugins')
const config = require('config')

const app = restify.createServer({
  name: config.get('app.name'),
  version: config.get('app.apiVersion')
})

app.use(plugins.acceptParser(app.acceptable))
app.use(plugins.queryParser())
app.use(plugins.bodyParser())

app.listen(config.get('app.port'), function () {
  console.log('%s listening at %s', app.name, app.url)
})
