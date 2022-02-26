import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'

import { Button } from '../components/Button';
import { toast } from 'react-toastify';
import axios from '../services/axios';
// import { useAuth } from '../hooks/useAuth';
import { IconBack } from '../components/iconBack';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { MusicModel } from '../models/musicModel';
import { StoreModel } from '../models/storeModel';

import '../styles/music.scss';


export function Music() {
  const history = useHistory();
  // const { user, signInWithGoogle } = useAuth();
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState(0);
  const [getGenre, setGetGenre] = useState([]);
  const [author, setAuthor] = useState(0);
  const [getAuthor, setGetAuthor] = useState([]);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [like, setLike] = useState(true);
  const [photo, setPhoto] = useState('');
  const [file, setFile] = useState({} as Blob);

  // async function handleCreateRoom() {
  //   if (!user) {
  //     await signInWithGoogle()
  //   }

  //   history.push('/rooms/new');
  // }

  useEffect(() => {
    async function getGenre() {
      try {
        const { data } = await axios.get('/genre');
        data.unshift({
          id: 0,
          name: 'Selecione...'
        });
        setGetGenre(data);
      } catch(e) {
        console.log(e)
      }
    }

    async function getAuthor() {
      try {
        const { data } = await axios.get('/author');
        data.unshift({
          id: 0,
          name: 'Selecione...'
        });
        setGetAuthor(data);
      } catch(e) {
        console.log(e)
      } 
    }
    getGenre();
    getAuthor();
  }, [])

  function handleChangePhoto(event: any) {
    setFile(event.target.files[0]);
    let fileLoaded = event.target.files[0];
    console.log(fileLoaded);
    const photoURL = URL.createObjectURL(fileLoaded);
    setPhoto(photoURL);
    
    // const formData = new FormData();
    // formData.append('file', file);

    // console.log('file', file);
    // console.log('formaData', formData);
    // await axios.post(`/cover/${1}`, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   }});
    // setFile(file);
  }

  function formValidation() {
    if (!photo) {toast.error('Insira uma foto'); return}
    if (name.length < 3) {toast.error('Digite um nome válido'); return}
    if (album.length < 3) {toast.error('Digite um albúm válido'); return}
    if (description.length < 30) {toast.error('A descrição precisa ter no mínimo 30 caracteres'); return}
    if (link.length < 30) {toast.error('Digite um link do youtube válido'); return}
    if (genre === 0) {toast.error('Insira um gênero musical'); return}
    if (author === 0) {toast.error('Insira um autor'); return}
  }

  async function onSubmit() {

    formValidation();

    let params: MusicModel = {
      id: id,
      photo: photo,
      name: name,
      album: album,
      genreId: genre,
      authorId: author,
      description: description,
      link: link,
      like: like
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log(file);
      console.log(formData);

      if (id !== null) {
        var idRetorno;
        await axios.put(`/music/${id}`, {params});
        await axios.put(`/cover/${id}`, {formData});
        toast.success("Registro atualizado com sucesso!");
        // history.push('/account');
      } else {
        await axios.post(`/music`, {params}).then((response) => {
          console.log('response', response);
          idRetorno = response.data.id;
        });
        await axios.post(`/cover/${idRetorno}`, formData, {
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

  function goBackNavigate() {
    history.goBack();
  }

  return (
    <>
    <IconBack cursor="pointer" onClick={goBackNavigate}/>
    <div className="page-store">
 
    <div className='content-card'>
      <div id="firstRow">
      <div id="title">
        <h2>Cadastrar uma música</h2>
      </div>
        <label>
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
      <div id="secondRow">
        <div className="firstColumn">
          <div id='label'>Nome</div>
            <input 
                type="text"
                id="input"
                placeholder="Digite o name do Autor..."
                onChange={event => setName(event.target.value)}
                value={name}
              />
          </div>
          <div id="secondColumn">
            <div id='label'>Albúm</div>
              <input 
                type="text"
                id="input"
                placeholder="Digite o name do Autor..."
                onChange={event => setAlbum(event.target.value)}
                value={album}
              />
          </div>
      </div>
      <div id="thirdRow">
        <div className="firstColumn">
          <div id='label-select'>Gênero Musical</div>
            <select 
              onChange={(event: any) => setGenre(event.target.value)}
              value={genre}>
                {getGenre.map((value: StoreModel, index) => (
                  <option key={value.id} value={value.id}>{ value.name }</option>
                  ))}
            </select>
          </div>
          <div id="secondColumn">
            <div id='label-select'>Autor</div>
            <select
            placeholder='Selecione...'
              onChange={(event: any) => setAuthor(event.target.value)}
              value={author}>
              {getAuthor.map((value: StoreModel, index) => (
                  <option key={value.id} value={value.id}>{ value.name }</option>
                  ))}
            </select>
          </div>
      </div>
      <div id="fourthRow">
        <div className="column">
          <div id="input-row">
            <div id='label'>Link Youtube</div>
              <input 
                type="text"
                id="input"
                placeholder="Digite o link do youtube..."
                onChange={event => setLink(event.target.value)}
                value={link}
              />
          </div>
          <div id="textarea-row">
            <div id='label-textarea'>Descrição</div>
            <textarea 
                name="description" 
                id="description" 
                onChange={event => setDescription(event.target.value)}
                value={description}>
            </textarea>
          </div>
        </div>
      </div>
      <div id="fifthRow">
        <Button type='submit' onClick={onSubmit}>Cadastrar</Button>
      </div>
    </div>
  </div>
  </>
  )
}