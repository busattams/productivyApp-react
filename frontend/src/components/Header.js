import React from 'react';
import { Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';


const Header = () => {

   let getTime = new Date().getHours();
   

   return (
      <header className='py-3 border-bottom'>
         <Container className='d-flex justify-content-between align-items-center'>
            <div>
               {format(Date.now(), "dd 'de' MMMM 'de' yyyy", { locale: pt })}
               <h4>{getTime < 12 ? 'Bom dia' : getTime < 18 ? 'Boa tarde' : 'Boa Noite'}, Mônica</h4>
            </div>
            <div>
               <LinkContainer to='/'>
                  <a><i className='fas fa-home'></i> Home</a>
               </LinkContainer>
            </div>
         </Container>
      </header>
   )
}

export default Header;