import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import { Button } from '../components/Button';
// import { useAuth } from '../hooks/useAuth';
import { IconBack } from '../components/iconBack';
import { FaPlus } from 'react-icons/fa';
// FaEdit
import '../styles/account.scss';

export function Account() {
  const history = useHistory();
  // const { user, signInWithGoogle } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');

  // async function handleCreateRoom() {
  //   if (!user) {
  //     await signInWithGoogle()
  //   }

  //   history.push('/rooms/new');
  // }

  function handleChangePhoto(event: any) {
    const file = event.target.files[0];
    const photoURL = URL.createObjectURL(file);

    setPhoto(photoURL);
    console.log(photo);

    // const formData = new FormData();
    // formData.append('register_id', id);
    // formData.append('file', file);
  }

  function goBackNavigate() {
    history.goBack();
  }

  return (
    <>
    <IconBack cursor="pointer" onClick={goBackNavigate}/>
    <div className="page-store">
    
    <div className='content-card'>
      <div id="firstRow">
        <h2>Dados da Conta</h2>
      </div>
      <div id="secondRow">
        <label htmlFor="photo">
          <div className="photo">
            {photo 
            ? <div id="picture-loaded">
                <img src={photo} alt="Foto" />
                <input type="file" id="photo" onChange={handleChangePhoto} />
                
              </div> 
            : <div id="picture">
                <input type="file" id="photo" onChange={handleChangePhoto} />
                  <FaPlus color="white" size="60px" id="icon-photo"/>
              </div>}
          </div>
          
        </label>
      </div>
      <div id="thirdRow">
        <div className="firstColumn">
          <div id='label'>Nome</div>
            <input 
                type="text"
                id="input"
                placeholder="Digite o nome do Autor..."
                onChange={event => setNome(event.target.value)}
                value={nome}
              />
          </div>
          <div id="secondColumn">
            <div id='label'>Email</div>
              <input 
                type="text"
                id="input"
                placeholder="Digite o nome do Autor..."
                onChange={event => setEmail(event.target.value)}
                value={email}
              />
          </div>
      </div>
      <div id="fourthRow">
        <Button>Cadastrar</Button>
      </div>

      <div id="fifthRow">
        <h5>Redefinir senha? <Link to="/change-password">Clique aqui.</Link></h5>
      </div>
    </div>
  </div>
  </>
  )
}