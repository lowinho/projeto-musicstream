import { useState } from 'react';
import { useHistory } from 'react-router-dom'

import { Button } from '../components/Button';
// import { useAuth } from '../hooks/useAuth';
import { IconBack } from '../components/iconBack';
import { FaEye } from 'react-icons/fa';

import '../styles/changePassword.scss';

export function ChangePassword() {
  const history = useHistory();
  // const { user, signInWithGoogle } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassord] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  // async function handleCreateRoom() {
  //   if (!user) {
  //     await signInWithGoogle()
  //   }
  //   history.push('/rooms/new');
  // }

  function handleChangeTypeInput(option: string) {
    let type = (document.getElementById(option) as HTMLInputElement).type;
    if (type === 'text') {
      (document.getElementById(option) as HTMLInputElement).type = 'password';
    } else {
      (document.getElementById(option) as HTMLInputElement).type = 'text';
    }
  }

  function goBackNavigate() {
    history.goBack();
  }

  return (
    <>
    <IconBack cursor="pointer" color="white" onClick={goBackNavigate}/>
    <div id="page-store">
    <div id='content-card'>
        <h2>Trocar Senha</h2>

        <div className="firstColumn">
          <div id='label'>Senha atual</div>
            <div className="input">
              <input 
                  type="password"
                  id="old-password"
                  placeholder="Digite sua senha atual..."
                  onChange={event => setOldPassword(event.target.value)}
                  value={oldPassword}
                />
                <FaEye color='blue' className="icon" size="20px" onClick={event => handleChangeTypeInput('old-password')}/>
            </div>
          </div>
          <div className="secondColumn">
            <div id='label'>Nova senha</div>
              <input 
                type="password"
                id="new-password"
                placeholder="Digite sua nova senha..."
                onChange={event => setNewPassord(event.target.value)}
                value={newPassword}
              />
              <FaEye color='blue' className="icon" size="20px" onClick={event => handleChangeTypeInput('new-password')}/>
          </div>
          <div className="thirdColumn">
            <div id='label'>Confirmar nova senha</div>

              <input 
                type="password"
                id="confirm-password"
                placeholder="Confirme sua nova senha..."
                onChange={event => setConfirmPassword(event.target.value)}
                value={confirmPassword}
              />
              <FaEye color='blue' className="icon" size="20px" onClick={event => handleChangeTypeInput('confirm-password')}/>
        </div>
        <Button>Confirmar</Button>
        </div>
    </div>
    </>
  )
}