const {parse} = require('url')

module.exports = function (options = {}) {
  const parent = this
  return function (req, res, next) {
    const url = parse(req.url, true)
    let skip = false

    let paths = []
    if (options.paths) {
      if (Array.isArray(options.paths)) paths = options.paths
      else paths.push(options.paths)
    }
    let methods = []
    if (options.methods) {
      if (Array.isArray(options.methods)) methods = options.methods
      else methods.push(options.methods)
    }
    if (paths.length) {
      skip = skip || paths.some(function (p) {
        return isUrlMatch(url.pathname, p) && isMethodMatch(req.method, p.methods)
      })
    }
    if (methods.length) {
      skip = skip || methods.includes(req.method)
    }
    if (skip) return next()
    parent(req, res, next)
  }
}

function isUrlMatch (url, p) {
  if (p instanceof RegExp) return p.test(url)
  if (typeof p === 'string') return url === p
  if (typeof p === 'object') return isUrlMatch(url, p.url)
  return false
}

function isMethodMatch (method, methods) {
  if (!methods) return true
  methods = Array.isArray(methods) ? methods : [methods]
  return methods.includes(method)
}
