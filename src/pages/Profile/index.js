import React, { useState, useEffect } from 'react';
import fireStore from '../../services/firebaseconnect'
import { updateDoc, doc } from 'firebase/firestore'
import {ref, getStorage, uploadBytes, getDownloadURL} from 'firebase/storage'

import { Container, Form } from './style.js'
import Navbar from '../../components/Navbar'
import avatar from '../../assets/avatar.png'
import { FaUpload } from 'react-icons/fa'

import { useSelector, useDispatch } from 'react-redux'
import { userLogout, userInfo } from '../../redux/financas/userSlice'
import { selectedUser } from '../../redux/financas/userSlice'

export default function Profile() {
    const { user } = useSelector(selectedUser);
    const dispatch = useDispatch();

    const [name, setName] = useState(user.name)
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl)
    const [imgAvatar, setImgAvatar] = useState(null)

    useEffect(()=>{
        dispatch(userInfo())
    })

    async function handleSave(e){
        e.preventDefault()
        if(name !== '' && imgAvatar === null){
            await updateDoc(doc(fireStore, 'users', `${user.uid}`),{
                name: name,
            })
        }
        if(name === user.name && imgAvatar !== null){
            imgUpload()
        }
    }

    async function imgUpload(){
        const userUid = user.uid
        const storage = getStorage();
        const storageRef =  ref(storage, `images/${userUid}/${imgAvatar.name}`)
        await uploadBytes(storageRef, imgAvatar)
        .then(async () =>{
            console.log('Foto Enviado com sucesso')
            await getDownloadURL(storageRef)
            .then(async (url)=>{
                let urlFoto = url
                await updateDoc(doc(fireStore, 'users', `${userUid}`),{
                    avatarUrl: urlFoto,
                })
                .then(()=>{
                    dispatch(userInfo())
                })
            })

        })
    }

    function handleFileUpload(e){
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === "image/jpeg" || image.type === "image/png"){
                setImgAvatar(image)
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))

            }else {
                alert('Envie uma imagem no formato PNG ou JPEG')
                setImgAvatar(null)
                return null
            }
        }
    }

    function handleLogout(){
        dispatch(userLogout())  
    }

    return (
    <div>
        <Navbar/>
        <Container>
            <Form onSubmit={handleSave}>
                <label>
                    <span>
                        <FaUpload size={25} color='#000'/>
                    </span>

                    <input type='file' accept='image/*' onChange={handleFileUpload}/>
                    {avatarUrl === null ? 
                    <img src={avatar} alt='Foto de perfil'/>
                     : 
                    <img src={avatarUrl} alt='Foto de perfil'/>}

                </label>

                <label>Nome:</label>
                <input
                type='text'
                placeholder={user.name}
                value={name}
                onChange={(e)=>setName(e.target.value)}/>

                <label>E-mail:</label>
                <input
                readOnly={true}
                type='email'
                placeholder={user.email}/>

                <div className='buttons'>
                    <button type='submit'>
                        Enviar
                    </button>
                    <button type='button' onClick={handleLogout}>
                        Sair
                    </button>
                </div>

            </Form>

        </Container>
    </div>
    );
}