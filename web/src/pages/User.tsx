import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Button, IconBack } from '../components/Atoms/index';
import axios from '../services/axios';
import { UserModel } from '../models/index';
import { validateEmail } from '../services/validadeEmail';
import '../styles/user.scss';


export function User() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [admin, setAdmin] = useState(false);


  // function validateEmail() {
  //   var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //   const validation = email.match(validRegex) ? true :  false;
  //   return validation
  // }

  function formValidation() {
    let valida = true;
    if (name.length < 6) {toast.error('O Nome precisa ter no mínimo 5 caracteres'); valida = false};
    if (!validateEmail(email)) {toast.error('Email incorreto'); valida = false};
    if (password.length < 6) {toast.error('A senha precisa ter pelo menos 6 caracteres'); valida = false};
    if (password !== confirm) {toast.error('A confirmação de senha digitada está incorreta'); valida = false}

    return valida
  }

  async function onSubmit() {
    setAdmin(false);
    // verificar esse setter depois
    if (!formValidation()) return

    try {
        await axios.post(`/user`, {
          name,
          email,
          password,
          admin
        } as UserModel);
        toast.success("Registro cadastrado com sucesso!");
        // history.push('/home');
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
    <div>
      {/* <div id="back">
      <FaArrowLeft cursor="pointer" onClick={goBackNavigate}/>
      </div> */}

      <IconBack cursor="pointer" onClick={goBackNavigate}/>
      
      <div id="page-user">
        <div className='content-card'>
          <h2>Novo Cadastro</h2>
          <div id='label'>Nome</div>
            <input 
                type="text"
                id="input"
                placeholder="Digite seu nome..."
                onChange={event => setName(event.target.value)}
                value={name}
              />
          <div id='label'>Email</div>
            <input 
                type="text"
                id="input"
                placeholder="Digite seu email..."
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
            <Button type="submit" onClick={onSubmit}>Cadastrar</Button>
          </div>
        <div className="empty-card"></div>
      </div>
    </div>
   
  )
}