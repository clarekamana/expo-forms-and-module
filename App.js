import { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FormScreen from './FormScreen';
import ResultScreen from './ResultScreen';

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {result ? (
        <ResultScreen data={result} onBack={() => setResult(null)} />
      ) : (
        <FormScreen onSubmit={setResult} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}
