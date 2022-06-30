import React from 'react';

import LoginForm from '../../components/LoginForm';

export default function SingUp() {
  return (
   <div className='container'>
    <LoginForm tipo={'signup'} button={"Criar"}/>
   </div>
 );
}