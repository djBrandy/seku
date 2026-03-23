import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>3D Virtual Science Lab</Text>
      <View style={styles.experimentContainer}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Lab', { experiment: 'chemistry' })}
        >
          <Text style={styles.cardTitle}>Chemistry: Acid-Base Reactions</Text>
          <Text style={styles.cardDesc}>Learn about pH and neutralization.</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Lab', { experiment: 'physics' })}
        >
          <Text style={styles.cardTitle}>Physics: Electric Circuits</Text>
          <Text style={styles.cardDesc}>Build and test Ohm's Law.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a365d',
  },
  experimentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    width: '45%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2d3748',
  },
  cardDesc: {
    fontSize: 14,
    color: '#4a5568',
  },
});

export default HomeScreen;
