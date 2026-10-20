import { useState } from 'react';
import {
  Button,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Fallback so there is always a picture to show if no photo was taken.
const placeholder = require('./assets/icon.png');

export default function ResultScreen({ data, onBack }) {
  const [open, setOpen] = useState(false);
  const source = data.photo ? { uri: data.photo.uri } : placeholder;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hello, {data.name || 'stranger'}</Text>

      <Pressable onPress={() => setOpen(true)}>
        <Image source={source} style={styles.thumb} />
        <Text style={styles.hint}>Tap to enlarge</Text>
      </Pressable>

      <Text style={styles.json}>{JSON.stringify(data, null, 2)}</Text>
      <Button title="Back" onPress={onBack} />

      <Modal
        visible={open}
        animationType="fade"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Image source={source} style={styles.full} resizeMode="contain" />
          <Text style={styles.close}>Tap anywhere to close</Text>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, gap: 16 },
  title: { fontSize: 24, fontWeight: '600' },
  thumb: { width: 160, height: 160, borderRadius: 8, backgroundColor: '#eee' },
  hint: { color: '#666', marginTop: 4 },
  json: { fontFamily: 'monospace', fontSize: 12 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  full: { width: '100%', height: '80%' },
  close: { color: '#fff', marginTop: 12 },
});
