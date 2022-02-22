import { Link, useHistory } from 'react-router-dom'

import { Button } from '../components/Button';
// import { useAuth } from '../hooks/useAuth';
import logoImg from '../assets/images/logo.png';
import { FaAngleDown, FaUser, FaSignOutAlt } from 'react-icons/fa';

import '../styles/home.scss';
import { useState } from 'react';

export function Home() {
  const history = useHistory();
  const [photo, setPhoto] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  // const { user, signInWithGoogle } = useAuth()

  // async function handleCreateRoom() {
  //   if (!user) {
  //     await signInWithGoogle()
  //   }

  //   history.push('/rooms/new');
  // }

  function handleShowDropdown() {
    console.log('aqui')
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
    history.push('/music');
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
      

      <div id="teste">
      <p>Home</p>
        <Button onClick={navigateToMusic}>Music</Button>
        
      </div>
      
     
    </div>
  )
}
