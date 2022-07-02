import { createSlice } from '@reduxjs/toolkit'

import fireStore from '../../services/firebaseconnect';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

export const despesas = createSlice({
    name: 'despesas',
    initialState: {
        despesa: [],
        request: false,
    },
    reducers: {
        setDespesa(state, {payload}){
            return {...state, despesa: payload, request: true};
        },
        getDespesa(state){
            return state
        },
        updateDespesa(state, {payload}){
            const IsDespesa = (state.despesa === payload)
            if(IsDespesa){
                return state
            };
            state.push(payload)
        },
    }
})

export const { setDespesa, getDespesa } = despesas.actions;
export const UseDespesas = state => state.despesas;
export default despesas.reducer;

export function getDespesas(){
    return async function (dispatch){
        await getDocs(collection(fireStore, 'despesas'))
        .then((snapshot)=>{
            let lista = []
            snapshot.forEach((doc)=>{
                lista.push({
                id: doc.id,
                ano: doc.data().ano,
                mes: doc.data().mes,
                dia: doc.data().dia,
                tipo: doc.data().tipo,
                descricao: doc.data().descricao,
                valor: doc.data().valor
                })
            })
            dispatch(setDespesa(lista))
        })
    }
}

export function filtrarDespesa(param, searc){
    return async function (dispatch){
        const q = query(collection(fireStore, 'despesas'), where(`${param}`, '==', `${searc}`))
        const despesa = await getDocs(q)
        let lista = []
        despesa.forEach((doc) => {
            lista.push ({
            id: doc.id,
            ano: doc.data().ano,
            mes: doc.data().mes,
            dia: doc.data().dia,
            tipo: doc.data().tipo,
            descricao: doc.data().descricao,
            valor: doc.data().valor
            })
        })
        dispatch(setDespesa([...lista]))
    }
}

export function deleteDespesa(id){
    return async function (dispatch){
        await deleteDoc(doc(fireStore, 'despesas', `${id}`))
        .then(()=>{
            dispatch(getDespesas())
        })
    }
}


    

