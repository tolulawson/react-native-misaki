import { Text, View, StyleSheet } from 'react-native';
import { EnglishG2P } from 'react-native-misaki';

const g2p = new EnglishG2P();

export default function App() {
  const { phonemes } = g2p.phonemize('Hello, world!');
  return (
    <View style={styles.container}>
      <Text>Result: {phonemes}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
