import { useState } from 'react';
import { useHistory } from 'react-router-dom'


import { Button } from '../components/Button';
// import { useAuth } from '../hooks/useAuth';

import '../styles/user.scss';
import { IconBack } from '../components/iconBack';

export function User() {
  const history = useHistory();
  // const { user, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

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
    <div>
      {/* <div id="back">
      <FaArrowLeft cursor="pointer" onClick={goBackNavigate}/>
      </div> */}

      <IconBack cursor="pointer" onClick={goBackNavigate}/>
      
      <div id="page-user">
        <div className='content-card'>
          <h2>Novo Cadastro</h2>
          <div id='label'>Email</div>
            <input 
                type="text"
                id="input"
                placeholder="Digite um email..."
                onChange={event => setEmail(event.target.value)}
                value={email}
              />

            <div id='label'>Senha</div>
            <input 
              type="password"
              id="input"
              placeholder="Digite uma senha..."
              onChange={event => setPassword(event.target.value)}
              value={password}
            />

            <div id='label'>Confirmar senha</div>
            <input 
              type="password"
              id="input"
              placeholder="Confirme a senha..."
              onChange={event => setConfirm(event.target.value)}
              value={confirm}
            />
            <Button>Cadastrar</Button>
          </div>
        <div className="empty-card"></div>
      </div>
    </div>
   
  )
}