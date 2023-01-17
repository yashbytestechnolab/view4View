import {StyleSheet} from 'react-native';
import {Colors} from '../../Theme';

export const style = StyleSheet.create({

  card: {
    shadowColor: Colors?.whiteShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 4,
    backgroundColor: Colors?.white,
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
    borderRadius: 8,
    shadowRadius: 4,
    elevation: 8,

  },
  main: { flex: 1, backgroundColor: Colors?.lightWhite },
  leftRow: { flexDirection: 'row', alignItems: 'center' },
  text: { margin: 10, fontSize: 30, color: Colors?.green, textAlign: 'center' },
})