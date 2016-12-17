const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']

class Router {
  constructor () {
    this.routes = methods.reduce((routes, method) => {
      routes[method] = []
    }, {})
  }

  applyRoutes (server, prefix = '') {
    methods.forEach((method) => {
      const routes = this.routes[method]
      if (routes.length === 0) return

      routes.forEach(({options, handlers}) => {
        if (prefix) options.path = prefix + options.path
        server[method](options, handlers)
      })
    })
  }
}

methods.forEach((method) => {
  Router.prototype[method] = function (options, ...handlers) {
    if (typeof options === 'string' || options instanceof RegExp) {
      options = {
        path: options
      }
    } else if (typeof options !== 'object') {
      throw new Error('Expected a path or options, but got: ' + options)
    }

    if (handlers.length === 0) {
      throw new Error('Missing handler')
    }

    this.routes[method].push({
      options,
      handlers
    })
  }
})

module.exports = Router
