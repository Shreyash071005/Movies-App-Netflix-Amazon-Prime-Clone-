import './App.css'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import MovieDetails from './components/MovieDetails'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <div className="app-container">
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
    </Switch>
  </div>
)

export default App
