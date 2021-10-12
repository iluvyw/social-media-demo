import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './helper/AuthContext'
import Feed from './pages/Feed/Feed';
import NewPost from './pages/NewPost/NewPost';
import UserProfile from './pages/UserProfile/UserProfile';
import Post from './pages/Post/Post';

function App() {
  const [isAuth, setIsAuth] = useState({ id: 0, username: "", status: true })

  useEffect(() => {
    async function auth(){
      await axios.get(
        "http://localhost:3001/auth",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken")
          }
        }
      )
      .then(response => {
        if (response.data.error) {
          console.log('False')
          setIsAuth({ ...isAuth, status: false })
        }
        else {
          console.log('Success')
          setIsAuth({ id: response.data.id, username: response.data.username, status: true })
        }
      })
    }
    auth()
  },[setIsAuth])

  return (
    <div className='app'>
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login'>
            {isAuth.status === true ? <Redirect to='/' /> : <Login />}
          </Route>
          <Route exact path='/register'>
            {isAuth.status === true ? <Redirect to='/' /> : <Register />}
          </Route>
          <Route exact path='/profile'>
            {isAuth.status === false ? <Redirect to='/login' /> : <Profile />}
          </Route>
          <Route exact path='/newpost'>
            {isAuth.status === false ? <Redirect to='/login' /> : <NewPost />}
          </Route>
          <Route exact path='/'>
            {isAuth.status === false ? <Redirect to='/login' /> : <Feed />}
          </Route>
          <Route exact path='/user/:id'>
            {isAuth.status === false ? <Redirect to='/login' /> : <UserProfile />}
          </Route>
          <Route exact path='/post/:id'>
            {isAuth.status === false ? <Redirect to='/login' /> : <Post />}
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  </div>
  );
}

export default App;
