import '../styles/slideCard.scss';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

type SlideCardProps = {
  title?: string;
  name?: string;
  album?: string;
  description?: string;
  duration?: string;
  urlImage?: string;
};

export function SlideCard(props: SlideCardProps) {
  return (
    <div className='slide-card'>
    <FaAngleLeft color="#ffffff" size="30px" id="icon-left"/>
    <div className="card-inside">
      <div id="title">{props.title}</div>
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

      <FaAngleRight color="#ffffff" size="30px" id="icon-right"/>
    </div>
  )
}