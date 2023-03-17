import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from '../screen/Home/home.style';

interface ITileProps extends TouchableOpacityProps {
  isPlaying: boolean;
  children: number;
}

export function Tile(props: ITileProps) {
  const tileStyle = props.isPlaying ? styles.playingTile : undefined;

  return (
    <TouchableOpacity {...props} style={[styles.tile, tileStyle]}>
      {props.children}
    </TouchableOpacity>
  );
}