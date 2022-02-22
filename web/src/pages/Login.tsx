import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import googleIconImg from '../assets/images/google-icon.svg';
import logoImg from '../assets/images/logo.png';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/login.scss';

export function Login() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new');
  }

  function navigateToHome() {
    history.push('/home');
  }

  return (
    <div id="page-login">
      <div className='content-card'>
        <img id="logo" src={logoImg} alt="musicstream" />
        <input 
            type="text"
            id="input"
            placeholder="Email"
            onChange={event => setEmail(event.target.value)}
            value={email}
          />
        <input 
          type="text"
          id="input"
          placeholder="Senha"
          onChange={event => setPassword(event.target.value)}
          value={password}
        />
        <Button onClick={navigateToHome}>Entrar</Button>

        <button onClick={handleCreateRoom} className="login-google">
          <img src={googleIconImg} alt="Logo do Google" />
          Entre com google
        </button>
        <h5>Novo por aqui? <Link to="/user">Assine agora.</Link></h5>

      </div>
      <div className="empty-card"></div>
    </div>
  )
}