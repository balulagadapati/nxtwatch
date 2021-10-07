import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Trending from './components/Trending'

import './App.css'

// Replace your code here

const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/trending" component={Trending} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
