import { useState } from 'react';
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

const initial = {
  name: '',
  email: '',
  password: '',
  age: '',
  phone: '',
  bio: '',
  plan: 'free',
  newsletter: false,
  document: null,
  photo: null,
};

const plans = ['free', 'pro', 'team'];

export default function FormScreen({ onSubmit }) {
  const [form, setForm] = useState(initial);
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const pickDocument = async () => {
    const res = await DocumentPicker.getDocumentAsync();
    if (res.canceled) return;
    const { name, uri, mimeType, size } = res.assets[0];
    set('document')({ name, uri, mimeType, size });
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) return;
    const res = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'] });
    if (res.canceled) return;
    const { uri, width, height, mimeType } = res.assets[0];
    set('photo')({ uri, width, height, mimeType });
  };

  const submit = () => {
    const data = { ...form, age: form.age === '' ? null : Number(form.age) };
    console.log(JSON.stringify(data, null, 2));
    onSubmit(data);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Sign up</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={set('name')}
          placeholder="Jane Doe"
          autoCapitalize="words"
          autoComplete="name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={form.email}
          onChangeText={set('email')}
          placeholder="jane@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={form.password}
          onChangeText={set('password')}
          placeholder="••••••••"
          secureTextEntry
          autoCapitalize="none"
        />

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={form.age}
          onChangeText={(t) => set('age')(t.replace(/\D/g, ''))}
          placeholder="30"
          keyboardType="number-pad"
          maxLength={3}
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={form.phone}
          onChangeText={set('phone')}
          placeholder="+250 788 000 000"
          keyboardType="phone-pad"
          autoComplete="tel"
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={form.bio}
          onChangeText={set('bio')}
          placeholder="Tell us a bit about yourself"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Plan</Text>
        <View style={styles.row}>
          {plans.map((p) => (
            <Pressable
              key={p}
              onPress={() => set('plan')(p)}
              style={[styles.chip, form.plan === p && styles.chipActive]}
            >
              <Text style={form.plan === p && styles.chipTextActive}>{p}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Document</Text>
        <View style={styles.row}>
          <Button title="Choose file" onPress={pickDocument} />
          <Text style={styles.flex}>{form.document?.name ?? 'No file selected'}</Text>
        </View>

        <Text style={styles.label}>Photo</Text>
        <View style={styles.row}>
          <Button title="Take photo" onPress={takePhoto} />
          {form.photo && (
            <Image source={{ uri: form.photo.uri }} style={styles.photo} />
          )}
        </View>

        <View style={[styles.row, styles.switchRow]}>
          <Text style={styles.label}>Subscribe to newsletter</Text>
          <Switch value={form.newsletter} onValueChange={set('newsletter')} />
        </View>

        <Button title="Submit" onPress={submit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingTop: 60, gap: 6 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
  label: { fontSize: 14, color: '#444', marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  multiline: { minHeight: 90 },
  row: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  switchRow: { justifyContent: 'space-between', marginBottom: 16 },
  chip: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  photo: { width: 60, height: 60, borderRadius: 6 },
  chipActive: { backgroundColor: '#222', borderColor: '#222' },
  chipTextActive: { color: '#fff' },
});
