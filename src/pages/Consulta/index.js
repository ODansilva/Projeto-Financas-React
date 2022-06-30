import React, { useState, useEffect } from 'react';
import './style.css'

import { setDispesa } from '../../redux/financas/despesaSlice'
import { UseDespesas } from '../../redux/financas/despesaSlice'
import { useSelector } from 'react-redux'

import fireStore from '../../services/firebaseconnect'
import { doc, getDocs, query, collection, where, deleteDoc } from 'firebase/firestore'

import Navbar from '../../components/Navbar';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

export default function Consulta() {
  const [resquest, setResquest] = useState(false);

  const [ano, setAno] = useState('');
  const [mes, setMes] = useState('');
  const [dia, setDia] = useState('');
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  
  const dispatch = useDispatch();
  const { despesa } = useSelector(UseDespesas);

  useEffect(()=>{
    async function despesas(){
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
        dispatch(setDispesa(lista))
        setResquest(true)
      })
      
    }
    despesas()
  },[dispatch])

  async function handleRequest(e){
    e.preventDefault();
    let param
    let searc
    let arg

    arg = (dia !== '' ? (param = 'dia', searc = dia) : '')
    arg = (mes !== '' ? (param = 'mes', searc = mes) : '')
    arg = (ano !== '' ? (param = 'ano', searc = ano) : '')
    arg = (tipo !== '' ? (param = 'tipo', searc = tipo) : '')
    arg = (valor !== '' ? (param = 'valor', searc = valor) : '')
    arg = (descricao !== '' ? (param = 'descricao', searc = descricao) : '')

    if(searc){
      const q = query(collection(fireStore, 'despesas'), where(`${param}`, '==', `${searc}`))
      const financa = await getDocs(q)
      let lista = []
      financa.forEach((doc) => {
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
      dispatch(setDispesa([...lista]))
      setResquest(true)
    }  
  }

  async function handleRemove(id){
    await deleteDoc(doc(fireStore, 'despesas', `${id}`))
  }

  return (
   <div>
    <Navbar/>
    <div className='container'>
      <h1>Consulta Despesas</h1>
      <form className='form_pattern' onSubmit={handleRequest}>

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
          <FaSearch size={20} color='#fff'/>
        </button>
      </form>

      <div className='consulta'>
        {resquest ? (
          <table>
            <thead>
              <tr>
                <td>Dia</td>
                <td>Mês</td>
                <td>Ano</td>
                <td>Tipo</td>
                <td>Descricao</td>
                <td>Valor</td>
                <td>#</td>
              </tr>
            </thead>
            <tbody>
              {despesa.map((item, index)=> {
                return(
                  <tr key={index}>
                    <td>{item.dia}</td>
                    <td>{item.mes}</td>
                    <td>{item.mes}</td>
                    <td>{item.tipo}</td>
                    <td>{item.descricao}</td>
                    <td>{item.valor}</td>
                    <td>
                      <button 
                      className='btn-remove' 
                      type='button'
                      onClick={()=>handleRemove(item.id)}
                      >
                        <FaTimes size={20} color='#fff'/>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          ) : (
            <>
            <h1>Despesas</h1>
            </>
          )
        }
      </div>

    </div>    
   </div>
 );
}