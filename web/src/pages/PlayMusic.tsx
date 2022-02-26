import { useState } from 'react';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom'
import urlImg from '../assets/images/redtheband.jpg';
import { AiTwotoneLike, AiTwotoneDislike } from 'react-icons/ai';
// import { get } from 'lodash';

// import { useAuth } from '../hooks/useAuth';
import { IconBack } from '../components/iconBack';

import '../styles/playMusic.scss';

export function PlayMusic() {
  // const id = get(match, 'params.id', '');
  const history = useHistory();
  const [ like, setLike ] = useState(false);
  function _onReady(event: any) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  // const { user, signInWithGoogle } = useAuth()

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
    <>
      <IconBack cursor="pointer" color="white" onClick={goBackNavigate}/>
      <div className="page-music">
 
        <div className="firstRow">
          <div id="name">
            <label>Breathe into me</label>
          </div>
      
          <ReactPlayer url='https://www.youtube.com/watch?v=yJl-kZmONY8&ab_channel=CASAWorship'/>

            <div className="informations">
            <div id="info">
              <label>Album: End of Silence</label>
              <label>Gender: Rock</label>
              <label>Author: Red</label>
              <label>A música You and me do Lifehouse fala do amor de duas pessoas baseado em Deus.</label>
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
    </> 
  )
}