import {Switch, Route} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Movies from './components/Movies'
import Popular from './components/Popular'
import Search from './components/Search'
import Account from './components/Account'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <div className="app-container">
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <ProtectedRoute exact path="/movies/:id" component={Movies} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/search" component={Search} />
      <ProtectedRoute exact path="/account" component={Account} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
