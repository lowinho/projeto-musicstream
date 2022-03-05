import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { IconBack } from '../components/iconBack';
import { FaPlus } from 'react-icons/fa';
// FaEdit
import '../styles/account.scss';
import { toast } from 'react-toastify';
import axios from '../services/axios';
import { UserModel } from '../models/userModel';

export function Account() {
  const history = useHistory();
  const { user } = useAuth();
  const [googleLogin, setGoogleLogin] = useState(false);
  const [id, setId] = useState<number>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [admin, setAdmin] = useState(false);
  const [file, setFile] = useState({} as Blob);

  useEffect(() => {
    user?.id ? setId(user?.id) : setId(undefined);
    user?.login === 'google' ? setGoogleLogin(false) : setGoogleLogin(true);
    user?.avatar ? setAvatar(user?.avatar) : setAvatar('');
    user?.name ? setName(user?.name) : setName('');
    user?.email ? setEmail(user?.email) : setEmail('');
    user?.admin === true ? setAdmin(true) : setAdmin(false);
  }, [user])

  function handleChangePhoto(event: any) {
    setFile(event.target.files[0]);
    let fileLoaded = event.target.files[0];
    const photoURL = URL.createObjectURL(fileLoaded);
    setAvatar(photoURL);
  }

  function validateEmail() {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validation = email.match(validRegex) ? true :  false;
    return validation
  }

  function formValidation() {
    let valida = true;
    if (!avatar) {toast.error('Insira uma foto'); valida = false}
    if (name.length < 3) {toast.error('Digite um nome válido'); valida = false}
    if (!validateEmail()) {toast.error('Email incorreto'); valida = false};
    return valida
  }

  async function onSubmit() {
    var idRetorno;
    formValidation();

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      if (id) {
        await axios.put(`/user/${id}`, {
          id,
          name,
          email,
          admin
        } as UserModel).then((response) => {
          idRetorno = response.data.id;
        });
        await axios.post(`/avatar/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }});
        toast.success("Registro cadastrado com sucesso!");
        // history.push('/account');

      } else {
        await axios.post(`/user`, {
          name,
          email,
          admin
        } as UserModel).then((response) => {
          idRetorno = response.data.id;
        });
        await axios.post(`/avatar/${idRetorno}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }});
        toast.success("Registro cadastrado com sucesso!");
        // history.push('/account');
      }
        
      } catch(e) {
        toast.error('Erro ao cadastrar registro, tente novamente mais tarde');
        console.log('error', e)
        // history.push('/account');
    }
  }

  function navigateToAdd(type: string) {
    if(type === 'genre') history.push('/genre');
    if(type === 'author') history.push('/author');
    if(type === 'music') history.push('/music');
  }

  function goBackNavigate() {
    history.goBack();
  }

  return (
    <>
    <IconBack cursor="pointer" onClick={goBackNavigate}/>
    <div className="page-store">
    
    <div className='content-card'>
    {googleLogin ? 
      <>
        <div id="firstRow">
          <div id="title">
            <h2>Dados da Conta</h2>
          </div>
          <label htmlFor="photo">
            <div className="photo">
              {avatar 
              ? <div id="picture-loaded">
                  <img src={avatar} alt="Foto" />
                  <input type="file" id="photo" onChange={handleChangePhoto} />
                  
                </div> 
              : <div id="picture">
                  <input type="file" id="photo" onChange={handleChangePhoto} />
                    <FaPlus color="white" size="60px" id="icon-photo"/>
                </div>}
            </div>
            
          </label>
        </div>
        <div id="secondRow">
          <div className="firstColumn">
            <div id='label'>Nome</div>
              <input 
                  type="text"
                  id="input"
                  placeholder="Digite o nome do Autor..."
                  onChange={event => setName(event.target.value)}
                  value={name}
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
        <div id="thirdRow">
          <Button onClick={onSubmit}>Cadastrar</Button>
        </div>

        <div id="fourthRow">
          <h5>Redefinir senha? <Link to="/change-password">Clique aqui.</Link></h5>
        </div>

        {!user?.admin ?  
        <div id="fifthRow">
          <hr />
            <div id="title">
              <h3>Adicionar conteúdo</h3>
            </div>
            <div className="btn-plus">
              <Button id="btn" onClick={() => navigateToAdd('genre')}>Adicionar Gênero</Button>
              <Button id="btn" onClick={() => navigateToAdd('author')}>Adicionar Autor</Button>
              <Button id="btn" onClick={() => navigateToAdd('music')}>Adicionar Música</Button>
            </div>
          </div> : null}
       
      </>
      : <>
          <div id="firstRow">
          <div id="title">
            <h2>Dados da Conta Google</h2>
          </div>
          <label htmlFor="photo">
            <div className="photo">
              {avatar 
              ? <div id="picture-loaded">
                  <img src={avatar} alt="#" />
                  <input type="file" id="photo" onChange={handleChangePhoto} />
                  
                </div> 
              : <div id="picture">
                  <input type="file" id="photo" onChange={handleChangePhoto} />
                    <FaPlus color="white" size="60px" id="icon-photo"/>
                </div>}
            </div>
            
          </label>
        </div>
        <div id="secondRow">
          <div className="firstColumn">
            <div id='label'>Nome</div>
              <label htmlFor="">{user?.name}</label>
            </div>
            <div id="secondColumn">
              <div id='label'>Email</div>
              <label htmlFor="">{user?.email}</label>
            </div>
        </div>
        </>}
      
    </div>
  </div>
  </>
  )
}