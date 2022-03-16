import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HorizontalScrollContainer } from 'react-simple-horizontal-scroller';

import { get } from 'lodash';
import { FaGooglePlay, FaPlusSquare } from 'react-icons/fa';

import { SlideCardModel } from '../../models/index';
import axios from '../../services/axios';
import '../../styles/slideCard.scss';


export function SlideCard(props: SlideCardModel) {
  const history = useHistory();
  const [music, setMusic] = useState([] as any);
  const [showPlay, setShowPlay] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        let teste: any[];
        
        teste = props.data;
        for (let i=0; i < teste.length; i++){
          let id = teste[i].id;
          const response = await axios.get(`/cover/music/${id}`);
          const data = response.data;
          let photo = get(data, 'data[0].url', '')
          console.log('photo', photo);
          if (data.length > 0) {
            teste[i] = {
                  ...teste[i],
                  url: data[0].url
                }
          }
        }
        setMusic(teste);
      } catch(e) {
        console.log(e)
      }
    }
    getData();
  }, [props.data])

  function navigateToMusic(id: number) {
    history.push(`/play-music/${id}`);
  }

  function setChangeShowPlay() {
    showPlay ? setShowPlay(true) : setShowPlay(false);
  }
 
  return (
      <div className='slide-card' onBlur={setChangeShowPlay}>
        <HorizontalScrollContainer>
        {music.map((value: any) => (
          <div key={value.id} className="card-inside">
            <div id="card" key={value.id}>
              {showPlay ? 
              <div className="icon">
                <FaGooglePlay color="#f1efef" id="icon-profile" />
                <FaPlusSquare color="#f1efef" id="icon-profile" />
              </div>
              : null}
              <img src={value.url} alt="Capa" onClick={() => {navigateToMusic(value.id)}}/>
              <div id="name">{value.name}</div>
            </div>
          </div>
          ))}
        </HorizontalScrollContainer> 
      </div>
    )
}