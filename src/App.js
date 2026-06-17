import './App.css'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Movies from './components/Movies'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

const App = () => (
  <div className="app-container">
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <ProtectedRoute exact path="/movies/:id" component={Movies} />
      <Route path="/" component={NotFound} />
    </Switch>
  </div>
)

export default App
