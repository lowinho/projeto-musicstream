import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';

import { get } from 'lodash';
import PropTypes from 'prop-types';

import { IconBack } from '../components/Atoms/index';
import axios from '../services/axios';
import img from '../assets/images/redtheband.jpg';
import '../styles/mylist.scss';
export function MyList({ match }: any) {
  const history = useHistory();
  const id = get(match, 'params.id', '');
  const [music, setMusic] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/cover/music/${id}`);
        const data = response.data;
        // setMusic();
      } catch(e) {
        console.log(e)
      }
    }
    getData();
  }, [])

  function goBackNavigate() {
    history.goBack();
  }

  const musics = [
    {
      id: 1,
      name: 'teste',
      url: img,
    },
    {
      id: 1,
      name: 'teste2',
      url: img,
    },
  ]

  function navigateToMusic(id: number) {
    history.push(`/play-music/${id}`);
  }

  return (
    <div id="page-my-list">
      <IconBack cursor="pointer" onClick={goBackNavigate}/>
      <div>
        
        <div className="content-card">
          <div className="title">
            Minha Lista
          </div>
          <div className="firstColumn">
            <div className='slide-card'>
            {musics.map((value: any) => (
              <div key={value.id} className="card-inside">
                <div id="card" key={value.id}>
                  <img src={value.url} alt="Capa" onClick={() => {navigateToMusic(value.id)}}/>
                  <div id="name">{value.name}</div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

MyList.propTypes = {
  match: PropTypes.shape({}).isRequired,
};