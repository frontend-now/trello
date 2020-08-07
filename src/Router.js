import React from 'react'
import Loadable from 'react-loadable'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

const Loading = () => <p>Loading</p>

const AsyncBoard = Loadable({
  loader: () => import('pages/Board'),
  loading: Loading
})

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Redirect to="/boards/0" />
      </Route>
      <Route path="/boards/:id" exact component={AsyncBoard} />
      <Route exact path="/boards">
        <Redirect to="/boards/0" />
      </Route>
      <Route component={AsyncBoard} />
    </Switch>
  </BrowserRouter>
)

export default AppRouter
