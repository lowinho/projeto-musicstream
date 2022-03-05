import { Link, useHistory } from 'react-router-dom'

// import { useAuth } from '../hooks/useAuth';
import logoImg from '../assets/images/logo.png';
import urlImg from '../assets/images/redtheband.jpg';
import { FaAngleDown, FaUser, FaSignOutAlt } from 'react-icons/fa';

import '../styles/home.scss';
import { useEffect, useState } from 'react';
import { SlideCard } from '../components/SlideCard';
import axios from '../services/axios';
import PropTypes from 'prop-types';
import { Loading } from '../components/Loading'
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const history = useHistory();
  const [genre, setGenre] = useState([] as any);
  const [avatar, setAvatar] = useState<string | undefined>('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const { user, logout } = useAuth()

  useEffect(() => {
    async function getMusic() {
      try {
        const data = await axios.get('/genre');
        setGenre(data.data);
        setAvatar(user?.avatar);
      } catch(e) {
      }
    }
    getMusic();
    setIsLoading(false);
  }, [])

  function handleShowDropdown() {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  }

  async function logoutSystem() {
    await logout();
    history.push('/');
  }

  function navigateToAccount() {
    history.push('/account');
  }

  return (
    <>
      {isLoading ? <Loading /> : 
      <>
        <nav>
        <div className="nav-left">
          <img id="logo" src={logoImg} alt="musicstream" />
          <Link to="/home">Home</Link>
          <Link to="/mylist">My List</Link>
        </div>

        <div className="nav-right">
          <div id="title">{user?.name}</div>
          <div className="photo" onClick={handleShowDropdown}>
            <div id="profile-photo">
              {avatar ? <img src={avatar} alt="#" id="profile-avatar"/>: <div id="profile-no-photo">CL</div>}
              <FaAngleDown color="#000000" id="icon-profile" />
              </div>
            {showDropdown ? 
            <div className="dropdown">
              <div id="account-sign"onClick={navigateToAccount}>
                <FaUser color="#000000" id="icon-account-sign" size="20px"/>
                <Link to="#" id="links">Account</Link>
              </div>
              <div id="account-sign" onClick={logoutSystem}>
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
        {/* <div id="title-lists">My List</div>
          <SlideCard 
            name="Red"
            urlImage={urlImg}/> */}

          {genre.map((value: any) => (
            <div key={value.id}>
              <div key={value.id} id="title-lists">{value.name}</div>
              <SlideCard 
                data={value.music}
                urlImage={urlImg}/>
            </div>
          ))}
        
        </div>
      </>}
    </>
  )
}

Home.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
