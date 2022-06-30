import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './protected'

import { useSelector } from 'react-redux'
import { selectedUser } from '../redux/financas/userSlice'

import Profile from '../pages/Profile'
import Cadastra from '../pages/Cadastro'
import Consulta from '../pages/Consulta'
import LogIn from '../pages/Login'
import SingUp from '../pages/Singup'


export default function Routers(){
    const { signed } = useSelector(selectedUser);
    return(
        <div>
            <Routes>
                <Route exact path='/' element={signed ? <Navigate to='/Cadastra' replace/> : <LogIn/>}></Route>
                <Route exact path='/signup' element={signed ? <Navigate to='/Cadastra' replace/> : <SingUp/>}></Route>
                <Route exact path='/cadastra' element={<ProtectedRoute islogin={signed}><Cadastra/></ProtectedRoute>}></Route>
                <Route exact path='/consulta' element={<ProtectedRoute islogin={signed}><Consulta/></ProtectedRoute>}></Route>
                <Route exact path='/profile' element={<ProtectedRoute islogin={signed}><Profile/></ProtectedRoute>}></Route>
            </Routes>
        </div>
    )
}
