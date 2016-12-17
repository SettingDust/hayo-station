import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import App from './App'

const routes =
  <Route path='/' component={App}>
    <IndexRedirect to='/' />
    <Route path='/' components={undefined} />
  </Route>

export default routes
