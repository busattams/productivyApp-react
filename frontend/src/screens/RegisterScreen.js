import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { registerUser } from '../actions/userAction';

const RegisterScreen = ({ history, location }) => {
   const [ email, setEmail ] = useState('');
   const [ password, setPassword ] = useState('');
   const [ name, setName ] = useState('');
   const [ showPassword, setShowPassword ] = useState(false);

   const dispatch = useDispatch();

   const userRegister = useSelector(state => state.userRegister);
   const { loading, error, userInfo } = userRegister;

   const userLogin = useSelector(state => state.userLogin);
   const { userInfo:userLoggedIn } = userLogin;

   const redirect = location.search ? location.search.split('=')[1] : '/';

   useEffect(() => {
      if(userInfo || userLoggedIn) {
         history.push(redirect)
      }
   }, [history, userInfo, userLoggedIn, redirect])

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(registerUser(name, email, password))
   }
   return (
      <Row>
         <Col md={5} className='my-5 mx-auto'>
            <h1 className='text-center mb-3'>Crie sua Conta</h1>
            <Form onSubmit={submitHandler}>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form.Group controlId='name'>
               <Form.Label>Nome</Form.Label>
               <InputGroup>
                  <InputGroup.Text><i className='fas fa-user'></i></InputGroup.Text>
                  <Form.Control type='text' required
                     value={name} 
                     onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
               </InputGroup>
            </Form.Group>
            <Form.Group controlId='email' className="my-4">
               <Form.Label>Email</Form.Label>
               <InputGroup>
                  <InputGroup.Text><i className='fas fa-envelope'></i></InputGroup.Text>
                  <Form.Control type='email' required
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
                     value={password}  required
                     onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                  <InputGroup.Text onClick={(e) => setShowPassword(showPassword => !showPassword)}><i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i></InputGroup.Text>
               </InputGroup>
            </Form.Group>
            <div className='d-grid mb-3'>
               <Button type="submit" >Registrar</Button>
            </div>
            </Form>
            <Link to={'/login'}><p className='text-center'> Já tem uma conta? Entre!</p></Link>
         </Col>
      </Row>
   );
}

export default RegisterScreen;