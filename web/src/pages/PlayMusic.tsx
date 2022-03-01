import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom'
import { AiTwotoneLike, AiTwotoneDislike } from 'react-icons/ai';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Loading } from '../components/Loading';

// import { useAuth } from '../hooks/useAuth';
import { IconBack } from '../components/iconBack';

import '../styles/playMusic.scss';
import axios from '../services/axios';

export function PlayMusic({ match }: any) {
  const id = get(match, 'params.id', '');
  const history = useHistory();
  const [ music, setMusic ] = useState({} as any);
  const [ genre, setGenre ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [ like, setLike ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  // const { user, signInWithGoogle } = useAuth()

  // async function handleCreateRoom() {
  //   if (!user) {
  //     await signInWithGoogle()
  //   }

  //   history.push('/rooms/new');
  // }

  useEffect(() => {

    async function getMusic() {
      try {
        console.log('id', id);
        const { data } = await axios.get(`/music/${id}`);
        setMusic(data);
        setGenre(data.genre['name']);
        setAuthor(data.author['name']);
        setLike(data.like);
      } catch(e) {
        console.log(e)
      }
    }
    getMusic();
    setIsLoading(false);
  }, [id])

  function goBackNavigate() {
    history.goBack();

    console.log(id);
    // excluir esse setter
  }

  return (
    <>
      {isLoading ? <Loading /> : 
      <> 
        <IconBack cursor="pointer" color="white" onClick={goBackNavigate}/>
        <div className="page-music">
          <div className="firstRow">
            <div id="name">
              <label>{music.name}</label>
            </div>
            <ReactPlayer url={music.link}/>
              <div className="informations">
              <div id="info">
                <label>Album: {music.album}</label>
                <label>Gênero: {genre}</label>
                <label>Autor: {author}</label>
                <label>{music.description}</label>
              </div>
            </div>
          </div>
          <div className="secondRow">
            <div id="like">
                {like 
                ? <AiTwotoneLike size="50px"color="#ffffff"/>
                : <AiTwotoneDislike size="50px"color="#ffffff"/>
                }
            </div>
          </div>
        </div>
      </>}
    </> 
  )
}

PlayMusic.propTypes = {
  match: PropTypes.shape({}).isRequired,
};