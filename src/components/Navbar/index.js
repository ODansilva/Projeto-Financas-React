import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

import './navbar.css'
import navlogo from './navlogo.svg'
import { useSelector } from 'react-redux'
import { selectedUser } from '../../redux/financas/userSlice'

function Navbar(){
    const [onHide, setOnHide] = useState(true)
    const [toggle, setToggle] = useState('hide')

    const { user } = useSelector(selectedUser)

    function handleToggle(){
        setOnHide(!onHide)
        if(onHide){    
            setToggle("visible")
        }else{
            setToggle("hide")
        }
    }

    return(
        <div>
            <nav>
                <div className="logo">
                    <Link to="/"><img src={navlogo}/></Link>
                </div>
                <div className="links"> 
                    <button className='nav_button' onClick={handleToggle}>
                        <FaBars size={25} color='#fff'/>
                    </button>
                    <ul className={toggle}>
                        <li>
                            <Link to='/profile'>Perfil</Link>
                        </li>
                        <li>
                            <Link to='/cadastra'>Cadastro</Link>
                        </li>
                        <li>
                            <Link to='/consulta'>Consulta</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;