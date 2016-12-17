const jwt = require('jsonwebtoken')
const {InvalidCredentialsError} = require('restify').errors

module.exports = function (options = {}) {
  if (!options.secret) throw new Error('missing secret')
  options.key = options.key || 'user'

  const middleware = function (req, res, next) {
    try {
      const token = resolveAuthorizationHeader(req)
      if (!token) throw new InvalidCredentialsError('No authentication token found')
      jwt.verify(token, options.secret, function (err, decoded) {
        if (err) throw new InvalidCredentialsError('Invalid token')
        req[options.key] = decoded
        next()
      })
    } catch (err) {
      return next(err)
    }
  }

  return middleware
}

function resolveAuthorizationHeader (req) {
  if (!req.headers || !req.headers.authorization) return ''

  const parts = req.headers.authorization.split(' ')
  if (parts.length === 2) {
    const [scheme, credentials] = parts
    if (/^Bearer$/i.test(scheme)) {
      return credentials
    } else {
      throw new InvalidCredentialsError(`Authorization header format is "Authorization: Bearer token"`)
    }
  } else {
    throw new InvalidCredentialsError(`Authorization header format is "Authorization: Bearer token"`)
  }
}
