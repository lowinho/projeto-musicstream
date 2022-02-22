import { useState } from 'react';
import { useHistory } from 'react-router-dom'

import { Button } from '../components/Button';
// import { useAuth } from '../hooks/useAuth';
import { IconBack } from '../components/iconBack';

import '../styles/store.scss';

export function Genre() {
  const history = useHistory();
  // const { user, signInWithGoogle } = useAuth();
  const [nome, setNome] = useState('');

  // async function handleCreateRoom() {
  //   if (!user) {
  //     await signInWithGoogle()
  //   }

  //   history.push('/rooms/new');
  // }

  function goBackNavigate() {
    history.goBack();
  }

  return (
    <div id="page-store">
    <IconBack cursor="pointer" onClick={goBackNavigate}/>
    
    <div >
      <div className='content-card'>
        <h2>Cadastro do Genêro Musical</h2>
        <div id='label'>Nome</div>
          <input 
              type="text"
              id="input"
              placeholder="Digite o nome do Autor..."
              onChange={event => setNome(event.target.value)}
              value={nome}
            />
          <Button>Cadastrar</Button>
        </div>
    </div>
  </div>
  )
}