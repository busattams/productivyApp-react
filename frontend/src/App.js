import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import TaskScreen from './screens/TaskScreen';

function App() {
  return (
    <>

    <Router>
      <Header />
      <Container>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/category/:id' component={CategoryScreen} />
        <Route path='/task/:id' component={TaskScreen} />
      </Container>
    </Router>

    </>
  );
}

export default App;
