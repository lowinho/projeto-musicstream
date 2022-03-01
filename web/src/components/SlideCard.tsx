import '../styles/slideCard.scss';
import { HorizontalScrollContainer } from 'react-simple-horizontal-scroller';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../services/axios';
import { get } from 'lodash';

type SlideCardProps = {
  name?: string;
  album?: string;
  description?: string;
  duration?: string;
  urlImage?: string;
  data: [];
};

export function SlideCard(props: SlideCardProps) {
  const history = useHistory();
  const [id, setId] = useState(null);
  const [music, setMusic] = useState([] as any);

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
            // teste[i].push(data.url)
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
 
  return (
      <div className='slide-card'>
        <HorizontalScrollContainer>
        {music.map((value: any) => (
          <div key={value.id} className="card-inside">
            <div id="card" key={value.id}>
              <img src={value.url} alt="Capa" onClick={() => {navigateToMusic(value.id)}}/>
              <div id="name">{value.name}</div>
            </div>
          </div>
          ))}
        </HorizontalScrollContainer> 
      </div>
    )
}