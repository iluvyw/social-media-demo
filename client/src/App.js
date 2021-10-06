import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './helper/AuthContext'
import Feed from './pages/Feed/Feed';

function App() {
  const [isAuth, setIsAuth] = useState({ id: 0, username: "", status: true })

  useEffect(() => {
    axios.get(
      "http://localhost:3001/auth",
      {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      }
    )
    .then(response => {
      if (response.data.error) {
        setIsAuth({ ...isAuth, status: false })
      }
      else {
        setIsAuth({ id: response.data.id, username: response.data.username, status: true })
      }
    })
  },[setIsAuth])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login'>
            {isAuth.status === true ? <Redirect to='/dashboard' /> : <Login />}
          </Route>
          <Route exact path='/register'>
            {isAuth.status === true ? <Redirect to='/dashboard' /> : <Register />}
          </Route>
          <Route path='/profile'>
            {isAuth.status === false ? <Redirect to='/register' /> : <Profile />}
          </Route>
          <Route path='/'>
            {isAuth.status === false ? <Redirect to='/register' /> : <Feed />}
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
