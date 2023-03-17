import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Tile } from '../../components/Tile';
import { styles } from './home.style';

export function Home() {
  const [soundList, setSoundList] = useState<{ sound: Audio.Sound, isPlaying: boolean }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const soundsToPlay = [];

  useEffect(() => {
    async function mountList(): Promise<void> {
      const sounds = await Promise.all([...Array.from({ length: 9 }, (_, index) => index + 1)].map(async (index) => {
        const sound = new Audio.Sound();
        await sound.loadAsync(require(`../../../assets/sounds/sound${index}.mp3`));
        return sound;
      }));
      setSoundList(sounds.map((sound) => {
        return { sound, isPlaying: false };
      }));
    }
    mountList();
  }, []);

  async function handlePlaySound(index: number, multiple = false) {
    const currentSound = soundList[index]?.sound;
    if (currentSound) {
      await currentSound.playAsync();

      setIsPlaying(true);
      setSoundList((oldList) => oldList.map((item, i) => {
        if (i === index) return { sound: item.sound, isPlaying: true };
        return { sound: item.sound, isPlaying: false };
      }));

      await new Promise<void>((resolve) => {
        currentSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            currentSound.setOnPlaybackStatusUpdate(null);
            resolve();
          }
        });
      });

      setIsPlaying(false);
      setSoundList((oldList) => oldList.map((item) => ({ sound: item.sound, isPlaying: false })));
    } else await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));

    if (multiple) {
      soundsToPlay.shift();
      if (soundsToPlay.length) {
        await handlePlaySound(soundsToPlay[0], true);
      }
    }
  }

  async function handleSubmit() {
    soundsToPlay.push(...inputValue.split('').map((value) => Number(value) - 1));
    setInputValue('');
    await handlePlaySound(soundsToPlay[0], true);
  }

  return (
    <View style={styles.home}>
      <Text style={styles.title}>
        Atenção: Os áudios estão EXTREMAMENTE altos. Não use fones de ouvido.
      </Text>

      <Text style={styles.text}>
        Apenas números de 0 a 9 são aceitos. 0 não toca nenhum áudio e um pause de 1 segundo é adicionado.
      </Text>

      <View style={styles.main}>
        <View style={styles.tiles}>
          {soundList.map((__, index) => (
            <Tile key={index} onPress={() => handlePlaySound(index)} isPlaying={soundList[index].isPlaying} disabled={isPlaying}>{index + 1}</Tile>
          ))}
        </View>

        <TextInput keyboardType='numeric' style={styles.input} value={inputValue} onChangeText={(value) => {
          if (!value.match(/[^0-9]/g)) {
            setInputValue(value);
          }
        }}/>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => setInputValue('')} disabled={isPlaying}>
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => handleSubmit()} disabled={isPlaying}>
            <Text style={styles.buttonText}>Tocar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
