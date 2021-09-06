import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { logoutUser } from '../actions/userAction';


const Header = ({ history }) => {

   const dispatch = useDispatch();

   const userLogin = useSelector(state => state.userLogin);
   const { userInfo } = userLogin;

   const logoutHandler = () => {
      dispatch(logoutUser());
      history.push('/login')
   }
   let getTime = new Date().getHours();
   return (
      <header className='py-3 border-bottom'>
         <Container className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
               <LinkContainer to='/home'>
                  <Button variant='light' type='button' className='text-center me-1 me-md-3 '><i className='fas fa-2x fa-home'></i><br />Início</Button>
               </LinkContainer>
               <div>
                  {format(Date.now(), "dd 'de' MMMM 'de' yyyy", { locale: pt })}
                  <h4>{getTime < 5 ? 'Vai dormir' : getTime < 12 ? 'Bom dia' : getTime < 18 ? 'Boa tarde' : 'Boa Noite'}, {userInfo.name}! </h4>
               </div>
            </div>
            <div>
               <Button type='button' variant='light' onClick={logoutHandler}><i className='fas fa-door-open'></i> Sair</Button>
            </div>
         </Container>
      </header>
   )
}

export default withRouter(Header);