import { Link } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resume Builder</Text>
      <Text style={styles.subtitle}>Create and manage your resume</Text>

      <View style={styles.buttonContainer}>
        <Link href="/editor" asChild>
          <Button title="Create New Resume" />
        </Link>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/preview" asChild>
          <Button title="View Preview" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
});
