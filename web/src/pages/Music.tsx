import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';

import { Button, IconBack } from '../components/Atoms/index';
import axios from '../services/axios';
import { MusicModel, StoreModel } from '../models/index';
import '../styles/music.scss';


export function Music({ match }: any) {
  const history = useHistory();
  const id = null;
  const [name, setName] = useState('');
  const [album, setAlbum] = useState('');
  const [genreId, setGenreId] = useState(0);
  const [getGenre, setGetGenre] = useState([]);
  const [authorId, setAuthorId] = useState(0);
  const [getAuthor, setGetAuthor] = useState([]);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [like, setLike] = useState(true);
  const [photo, setPhoto] = useState('');
  const [file, setFile] = useState({} as Blob);


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
  }

  function formValidation() {
    let valida = true;
    if (!photo) {toast.error('Insira uma foto'); valida = false}
    if (name.length < 3) {toast.error('Digite um nome válido'); valida = false}
    if (album.length < 3) {toast.error('Digite um albúm válido'); valida = false}
    if (description.length < 30) {toast.error('A descrição precisa ter no mínimo 30 caracteres'); valida = false}
    if (link.length < 30) {toast.error('Digite um link do youtube válido'); valida = false}
    if (genreId === 0) {toast.error('Insira um gênero musical'); valida = false}
    if (authorId === 0) {toast.error('Insira um autor'); valida = false}
    return valida
  }

  async function onSubmit() {

    formValidation();

    setLike(false); 
    // tirar essa validação

    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log(file);
      console.log(formData);

      
      if (id !== null ) {
        var idRetorno;
        await axios.put(`/music/${id}`, {
          id,
          photo,
          name,
          album,
          genreId,
          authorId,
          description,
          link, 
          like
        } as MusicModel);
        await axios.put(`/cover/${id}`, {formData});
        toast.success("Registro atualizado com sucesso!");
        // history.push('/account');
      } else {
        await axios.post(`/music`, {
          id,
          photo,
          name,
          album,
          genreId,
          authorId,
          description,
          link, 
          like
        } as MusicModel).then((response) => {
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
              onChange={(event: any) => setGenreId(event.target.value)}
              value={genreId}>
                {getGenre.map((value: StoreModel, index) => (
                  <option key={value.id} value={value.id}>{ value.name }</option>
                  ))}
            </select>
          </div>
          <div id="secondColumn">
            <div id='label-select'>Autor</div>
            <select
            placeholder='Selecione...'
              onChange={(event: any) => setAuthorId(event.target.value)}
              value={authorId}>
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