import { useHistory } from 'react-router-dom'

// import { useAuth } from '../hooks/useAuth';
import { IconBack } from '../components/iconBack';

import '../styles/home.scss';

export function Music() {
  const history = useHistory();
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
    <div id="page-auth">
      <IconBack cursor="pointer" onClick={goBackNavigate}/>
      <p>Music</p>
    </div>
  )
}