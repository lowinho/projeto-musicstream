import { useState } from 'react';
import { useHistory } from 'react-router-dom'

import { get } from 'lodash';
import { toast } from 'react-toastify';

import axios from '../services/axios';
import PropTypes from 'prop-types';
import { IconBack, Button } from '../components/Atoms/index';
import '../styles/store.scss';

export function Genre({ match }: any) {
  const history = useHistory();
  const id = get(match, 'params.id', null);
  const [name, setName] = useState('');

  function formValidation() {
    if (name.length < 3) {toast.error('Digite um nome válido'); return}
  }

  async function onSubmit() {
    formValidation();
    try {
      if (id) {
        await axios.put(`/genre/${id}`, {id, name});
        toast.success("Registro atualizado com sucesso!");
        // history.push('/account');
      } else {
        await axios.post(`/genre`, {id, name});
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
        <h2>Cadastro do Genêro Musical</h2>
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

Genre.propTypes = {
  match: PropTypes.shape({}).isRequired,
};