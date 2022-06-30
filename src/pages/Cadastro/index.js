import React, { useState } from 'react';
import './index.css'

import fireStore from '../../services/firebaseconnect';
import { addDoc, collection } from 'firebase/firestore'

import { FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Navbar from '../../components/Navbar'

export default function Cadastra() {

  const [ano, setAno] = useState('')
  const [mes, setMes] = useState('')
  const [dia, setDia] = useState('')
  const [tipo, setTipo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')

  async function handleAddDespesa(e){
    e.preventDefault();
    if(ano && mes && dia && tipo && valor !== ''){
     
      await addDoc(collection(fireStore, 'despesas'), {
        ano,
        mes,
        dia,
        tipo,
        descricao,
        valor
      })
      .then(()=>{
        setDia('')
        setMes('')
        setAno('')
        setTipo('')
        setValor('')
        setDescricao('')
        
        toast.success('Despesa Cadastrada')
      })

    }else{
      toast.info('Existem campos não Preenchidos')
    }
  }

  return (
   <div>
    <Navbar/>
    <div className='container'>
    <h1>Cadastrar Despesas</h1>
      <form className='form_pattern' onSubmit={handleAddDespesa}>

        <div>
          <select onChange={(e)=>setAno(e.target.value)}>
            <option value=''>Ano</option>
            <option value='2022'>2022</option>
          </select>
        </div>

        <div>
          <select onChange={(e)=>setMes(e.target.value)}>
            <option value=''>Mês</option>
            <option value="Janeiro">Janeiro</option>
            <option value="Fevereiro">Fevereiro</option>
            <option value="Março">Março</option>
            <option value="Abril">Abril</option>
            <option value="Maio">Maio</option>
            <option value="Junho">Junho</option>
            <option value="Julho">Julho</option>
            <option value="Agosto">Agosto</option>
            <option value="Setembro">Setembro</option>
            <option value="Outubro">Outubro</option>
            <option value="Novembro">Novembro</option>
            <option value="Dezembro">Dezembro</option>
          </select>
        </div>

        <div>
          <input 
          type='text' 
          placeholder='Dia' 
          value={dia} 
          onChange={(e)=>setDia(!isNaN(dia) ? e.target.value : '' )}/>
        </div>

        <div className='tipo'>
          <select onChange={(e)=>setTipo(e.target.value)}>
            <option value="">Tipo</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Educação">Educação</option>
            <option value="Lazer">Lazer</option>
            <option value="Saúde">Saúde</option>
            <option value="Transporte">Transporte</option>
          </select>
        </div>

        <div className='descricao'>
          <input 
          type='text' 
          placeholder='Descrição'  
          value={descricao} 
          onChange={(e)=>setDescricao(e.target.value)}/>
        </div>

        <div>
          <input 
          type='text'
          placeholder='Valor' 
          value={valor} 
          onChange={(e)=>setValor(!isNaN(valor) ? e.target.value : '' )}/>
        </div>

        <button className='btn' type='submit'>
          <FaPlus size={20} color='#fff'/>
        </button>
      </form>
    </div>
   </div>
 );
}