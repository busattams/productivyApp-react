import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import TaskScreen from './screens/TaskScreen';

function App() {
  
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
    <Router>
      {userInfo && 
        <Header />
      }
      <Container>
        <Route path='/login' component={LoginScreen} exact />
        <Route path='/register' component={RegisterScreen} exact />
        <Route path='/' exact><Redirect to='/home' /></Route>
        <Route path='/home' component={HomeScreen} exact />
        <Route path='/category/:id' component={CategoryScreen} />
        <Route path='/task/:id' component={TaskScreen} />
      </Container>
    </Router>

    </>
  );
}

export default App;
