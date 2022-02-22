import { FaArrowLeft } from "react-icons/fa";

import '../styles/iconBack.scss';

type IconBackProps = {
  class?: string;
  id?: string;
  cursor?: string;
  href?: string;
  color?: string;
  onClick?: VoidFunction;
}

export function IconBack(props: IconBackProps) {
  return (
    <div id="back">
      <FaArrowLeft {...props}/>
    </div>
  )
}