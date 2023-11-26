import { RotatingLines } from 'react-loader-spinner';
import {} from './Loader.css';
export const Loader = () => {
  return (
    <div className="RotatingLines">
      <RotatingLines
        strokeColor="wheat"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};
