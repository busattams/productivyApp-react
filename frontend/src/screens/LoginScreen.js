import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { loginUser } from '../actions/userAction';


const LoginScreen = ({ location, history }) => {
   const [ email, setEmail ] = useState('');
   const [ password, setPassword ] = useState('');
   const [ showPassword, setShowPassword ] = useState(false);

   const dispatch = useDispatch();
   const userLogin = useSelector(state => state.userLogin);
   const { loading, error, userInfo } = userLogin;
   
   const redirect = location.search ? location.search.split('=')[1] : '/home';

   useEffect(() => {
      if(userInfo) {
         history.push(redirect);
      }

   }, [history, userInfo, redirect]);


   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(loginUser(email, password))
   }


   return (
      <Row>
         <Col md={5} className='my-5 mx-auto'>
            <h1 className='text-center mb-3'>Login</h1>
            <Form onSubmit={submitHandler}>
            {error && <Message variant='danger'>{error}</Message>}
         {loading && <Loader />}
            <Form.Group controlId='email'>
               <Form.Label>Email</Form.Label>
               <InputGroup>
                  <InputGroup.Text><i className='fas fa-envelope'></i></InputGroup.Text>
                  <Form.Control type='email'
                     value={email} 
                     onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
               </InputGroup>
            </Form.Group>
            <Form.Group controlId='password'  className="my-4">
               <Form.Label>Senha</Form.Label>
               <InputGroup>
                  <InputGroup.Text><i className='fas fa-lock'></i></InputGroup.Text>
                  <Form.Control type={showPassword ? 'text' : 'password'}
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                  <InputGroup.Text onClick={(e) => setShowPassword(showPassword => !showPassword)}><i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i></InputGroup.Text>
               </InputGroup>
            </Form.Group>
            <div className='d-grid mb-3'>
               <Button type='submit' className='my-3'>Login</Button>
            </div>
            </Form>
            <Link to={'/register'}><p className='text-center'>Não tem uma conta? Registre-se</p></Link>
         </Col>
      </Row>
   );
}

export default LoginScreen;