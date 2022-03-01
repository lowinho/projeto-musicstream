import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import axios from '../services/axios';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { Button } from '../components/Button';
// import { useAuth } from '../hooks/useAuth';
import { IconBack } from '../components/iconBack';

import '../styles/store.scss';

export function Author({ match }: any) {
  const history = useHistory();
  // const { user, signInWithGoogle } = useAuth();
  const id = get(match, 'params.id', '');
  const [name, setName] = useState('');

  // async function handleCreateRoom() {
  //   if (!user) {
  //     await signInWithGoogle()
  //   }

  //   history.push('/rooms/new');
  // }

  function formValidation() {
    if (name.length < 3) {toast.error('Digite um nome válido'); return}
  }

  async function onSubmit() {

    formValidation();

    let params = {
      id: id,
      name: name,
    }

    try {
      if (id) {
        await axios.put(`/author/${id}`, {params});
        toast.success("Registro atualizado com sucesso!");
        // history.push('/account');
      } else {
        await axios.post(`/author`, {params});
        toast.success("Registro cadastrado com sucesso!");
        // history.push('/account');
      }
    } catch(e) {
        toast.error('Erro ao cadastrar registro, tente novamente mais tarde');
        console.log('error', e)
        // history.push('/account');
    }
  }

  function goBackNavigate() {
    history.goBack();
  }

  return (
    <div id="page-store">
    <IconBack cursor="pointer" onClick={goBackNavigate}/>
    
    <div>
      <div className='content-card'>
        <h2>Cadastro do Autor</h2>
        <div id='label'>Nome</div>
          <input 
              type="text"
              id="input"
              placeholder="Digite o nome do Autor..."
              onChange={event => setName(event.target.value)}
              value={name}
            />
          <Button type="submit" onClick={onSubmit}>Cadastrar</Button>
        </div>
    </div>
  </div>
  ) 
}

Author.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

