import '../styles/slideCard.scss';
import { HorizontalScrollContainer } from 'react-simple-horizontal-scroller';
import { useHistory } from 'react-router-dom';

type SlideCardProps = {
  name?: string;
  album?: string;
  description?: string;
  duration?: string;
  urlImage?: string;
};

export function SlideCard(props: SlideCardProps) {
  const history = useHistory();

  function navigateToMusic() {
    history.push('/play-music');
  }
  
  return (
    <div className='slide-card'>
       <HorizontalScrollContainer>
        <div className="card-inside">
          <div id="card">
            <img src={props.urlImage} alt="Capa" onClick={navigateToMusic}/>
            <div id="name">{props.name}</div>
          </div>
        </div>

        <div className="card-inside">
          <div id="title"></div>
          <div id="card">
            <img src={props.urlImage} alt="Capa" />
            <div id="name">{props.name}</div>
          </div>
        </div>

        <div className="card-inside">
          <div id="title"></div>
          <div id="card">
            <img src={props.urlImage} alt="Capa" />
            <div id="name">{props.name}</div>
          </div>
        </div>

        <div className="card-inside">
          <div id="title"></div>
          <div id="card">
            <img src={props.urlImage} alt="Capa" />
            <div id="name">{props.name}</div>
          </div>
        </div>

        <div className="card-inside">
          <div id="title"></div>
          <div id="card">
            <img src={props.urlImage} alt="Capa" />
            <div id="name">{props.name}</div>
          </div>
        </div>

        <div className="card-inside">
          <div id="title"></div>
          <div id="card">
            <img src={props.urlImage} alt="Capa" />
            <div id="name">{props.name}</div>
          </div>
        </div>

        <div className="card-inside">
          <div id="title"></div>
          <div id="card">
            <img src={props.urlImage} alt="Capa" />
            <div id="name">{props.name}</div>
          </div>
        </div>

        <div className="card-inside">
          <div id="title"></div>
          <div id="card">
            <img src={props.urlImage} alt="Capa" />
            <div id="name">{props.name}</div>
          </div>
        </div>

        <div className="card-inside">
          <div id="title"></div>
          <div id="card">
            <img src={props.urlImage} alt="Capa" />
            <div id="name">{props.name}</div>
          </div>
        </div>
      </HorizontalScrollContainer> 
    </div>
  )
}