import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Button } from '../components/Atoms/index';
import { useAuth } from '../hooks/useAuth';
import { validateEmail } from '../services/validadeEmail';
import googleIconImg from '../assets/images/google-icon.svg';
import logoImg from '../assets/images/logo.png';
import '../styles/login.scss';

export function Login() {
  const history = useHistory();
  const { user, signInWithGoogle, signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleAcessGoogle() {
    await signInWithGoogle();
    history.push('/home');

    console.log('user', user);
  }

  function formValidation() {
    let valida = true;
    if (!validateEmail(email)) {toast.error('Email incorreto'); valida = false};
    if (password.length < 6) {toast.error('A senha precisa ter pelo menos 6 caracteres'); valida = false};

    return valida
  }

  async function onSubmit() {
    // verificar esse setter depois
    if (!formValidation()) return

    try {
      await signInWithEmail(email, password);
      history.push('/home');
    } catch(e) {
      toast.error('Erro ao logar, verifique seu email e senha');
      console.log('error', e)
    }
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
        <Button onClick={onSubmit}>Entrar</Button>

        <button onClick={handleAcessGoogle} className="login-google">
          <img src={googleIconImg} alt="Logo do Google" />
          Entre com google
        </button>
        <h5>Novo por aqui? <Link to="/user">Assine agora.</Link></h5>

      </div>
      <div className="empty-card"></div>
    </div>
  )
}