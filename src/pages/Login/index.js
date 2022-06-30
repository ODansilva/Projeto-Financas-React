import React from 'react';
import LoginForm from '../../components/LoginForm';

export default function LogIn() {
 return (
   <div className='container'>
    <LoginForm tipo={'login'} button={"Entrar"}/>
   </div>
 );
}