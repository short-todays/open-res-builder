import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function EditorScreen() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        {/* Form fields will be added here */}
        <Text style={styles.placeholder}>Form fields coming soon...</Text>
      </View>

      <View style={styles.buttonGroup}>
        <Button title="Save" onPress={() => router.back()} />
        <Button title="Preview" onPress={() => router.push('/preview')} color="green" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  placeholder: {
    color: '#999',
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20,
  },
});
