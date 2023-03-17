import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 56,
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    width: '100%',
  },
  tiles: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  tile: {
    width: 64,
    height: 64,
    backgroundColor: 'white',
    borderRadius: 99999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playingTile: {
    backgroundColor: '#8dc7f0',
  },
  input: {
    width: '80%',
    height: 32,
    backgroundColor: 'inherit',
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    gap: 16,
  },
  button: {
    flex: 1,
    height: 32,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: 'white' },
});
