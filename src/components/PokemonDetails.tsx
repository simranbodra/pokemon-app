import { useState } from "react";
import Tooltip from '@mui/material/Tooltip';

const PokemonDetails: React.FC = () => {
    const [hover, setHover] = useState<boolean>(true);

    const tooltipStyle = {
        display: hover ? 'block' : 'none'
      }

      function handleMouseIn() {
        setHover(true);
      }
      
      function handleMouseOut() {
        setHover(false);
      }

    return (
        <div>
    <div onMouseOver={handleMouseIn.bind(this)} onMouseOut={handleMouseOut.bind(this)}>on hover here we will show the tooltip</div>
    <div>
      <div style={tooltipStyle}>this is the tooltip!!</div>
    </div>
  </div>
    )
}

export default PokemonDetails;