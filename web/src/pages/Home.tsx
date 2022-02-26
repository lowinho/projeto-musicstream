import { Link, useHistory } from 'react-router-dom'

// import { useAuth } from '../hooks/useAuth';
import logoImg from '../assets/images/logo.png';
import urlImg from '../assets/images/redtheband.jpg';
import { FaAngleDown, FaUser, FaSignOutAlt } from 'react-icons/fa';

import '../styles/home.scss';
import { useEffect, useState } from 'react';
import { SlideCard } from '../components/SlideCard';
import axios from '../services/axios';

export function Home() {
  const history = useHistory();
  // const [photo, setPhoto] = useState([]);
  // const [music, setMusic] = useState([] as any);
  const [showDropdown, setShowDropdown] = useState(false);
  // const { user, signInWithGoogle } = useAuth()

  // async function handleCreateRoom() {
  //   if (!user) {
  //     await signInWithGoogle()
  //   }

  //   history.push('/rooms/new');
  // }

  // useEffect(() => {
  //   async function getMusic() {
  //     try {
  //       const { data } = await axios.get('/music');
  //       setMusic(data);
  //     } catch(e) {
  //       console.log(e)
  //     }
  //   }

  //   async function getCoverAlbum() {
  //     try {
  //       const { data } = await axios.get('/cover');
  //       music.unshift({
  //         photo: data
  //       });
  //       setPhoto(data);
  //     } catch(e) {
  //       console.log(e)
  //     } 
  //   }
  //   getMusic();
  //   getCoverAlbum();
  // }, [])

  function handleShowDropdown() {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  }

  function logout() {
    alert('LOGOUT');
  }

  function navigateToMusic() {
    history.push('/play-music');
  }

  function navigateToAccount() {
    history.push('/account');
  }

  return (
    <div>
      <nav>
        <div className="nav-left">
          <img id="logo" src={logoImg} alt="musicstream" />
          <Link to="/home">Home</Link>
          <Link to="/mylist">My List</Link>
        </div>

        <div className="nav-right">
          <div className="photo" onClick={handleShowDropdown}>
            <div id="profile-photo"><FaAngleDown color="white" id="icon-profile" /></div>
            {showDropdown ? 
            <div className="dropdown">
              <div id="account-sign"onClick={navigateToAccount}>
                <FaUser color="#000000" id="icon-account-sign" size="20px"/>
                <Link to="#" id="links">Account</Link>
              </div>
              <div id="account-sign" onClick={logout}>
                <FaSignOutAlt color="#000000" id="icon-account-sign" />
                <Link to="#" id="links">Exit</Link>
              </div>
              
            </div>
            : null}
              {/* {photo ? <img src={photo} alt="Foto" id="profile-photo"/> : <div id="profile-photo"></div>} */}
          </div>
        </div>
      </nav>
      

      <div className="container">
        <div id="title-lists">My List</div>
          <SlideCard 
            name="Red"
            urlImage={urlImg}/>

          <div id="title-lists">Rock</div>
          <SlideCard 
            name="Red"
            urlImage={urlImg}/>

          <div id="title-lists">Sertanejo</div>
          <SlideCard 
            name="Red"
            urlImage={urlImg}/>

          <div id="title-lists">Pop</div>
          <SlideCard 
            name="Red"
            urlImage={urlImg}/>
        </div>
    </div>
  )
}
