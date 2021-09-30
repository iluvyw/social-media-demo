import './App.css';
import Home from './pages/Home'
import NewCard from './pages/NewCard'
import CardDetail from './pages/CardDetail';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/newcard'>
          <NewCard />
        </Route>
        <Route path='/card/:word'>
          <CardDetail />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
