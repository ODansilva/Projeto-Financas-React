import { createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { doc, getDoc, setDoc } from 'firebase/firestore'
import fireStore from '../../services/firebaseconnect'

export const users = createSlice({
    name: 'user',
    initialState: {
        user: '',
        signed: false,
    },
    reducers: {
        changeUser(state, { payload }){
            return { ...state, signed: true, user: payload}
        },
        logoutUser(state){
            return { ...state, signed: false, user: ''}
        }
    },
})

export const { changeUser, logoutUser } = users.actions

export const selectedUser = state => state.user

export default users.reducer

export function createUser(name, email, password){
    return async function (dispatch){
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value)=>{
            let uid = value.user.uid;
            await setDoc(doc(fireStore, 'users', `${uid}`),{
                name,
                email,
                avatarUrl: null
            })
            .then(()=>{
                dispatch(userInfo())
            })
        })
    }
}

export function userLogin(email, password){
    return async function (dispatch){
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
            dispatch(userInfo())
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
export function userLogout(){
    const auth = getAuth();
    signOut(auth)
    logoutUser()
}


export function userInfo(){
   return function (dispatch){
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if(user){
                const uid = user.uid
                await getDoc(doc(fireStore, 'users', `${uid}`))
                .then((user)=>{
                    let data = {
                        uid,
                        name: user.data().name,
                        email: user.data().email,
                        avatarUrl: user.data().avatarUrl,
                    }
                    dispatch(changeUser(data))
                })
            }
        })
    }
}
