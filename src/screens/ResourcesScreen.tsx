import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResourcesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learning Resources</Text>
      <Text>Access videos, diagrams, and scientific terms here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f8' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});

export default ResourcesScreen;
