import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.svg';

import { Container, Form, Button } from './styles';
import { Link } from 'react-router-dom';

import { userInfo, createUser, userLogin } from '../../redux/financas/userSlice'
import { useDispatch } from 'react-redux'

export default function LoginForm({tipo, button}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(userInfo())
    })

    function handleUser(e){
        e.preventDefault();
        if(tipo === 'signup'){
            dispatch(createUser(name, email, password))
        }
        if(tipo === 'login'){
            dispatch(userLogin(email, password))
        }
    }

    return (
        <Container>
            <div className='user_form'>
                <div className='logo'>
                    <img src={logo} alt='logo do app'/>
                </div>
                <Form onSubmit={handleUser}>
                    {tipo === 'signup' ? <input placeholder='Nome' value={name} onChange={(e)=>setName(e.target.value)}/> : <></>}
                    <input type='email' placeholder='E-mail' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type='password' placeholder='Senha' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <Button>
                        {button}
                    </Button>
                    <Link to={tipo === 'signup' ? "/" : "/signup"}>{tipo === 'signup' ? "Já tem cadastro? Faça seu login" : "Cadestre-se"}</Link>
                </Form>
            </div>
        </Container>
        );
}