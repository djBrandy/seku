import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlaskConical, Zap } from 'lucide-react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>3D Virtual Science Lab</Text>
      <Text style={styles.subtitle}>Choose an experiment to start learning</Text>
      
      <View style={styles.experimentContainer}>
        <TouchableOpacity 
          style={[styles.card, styles.chemCard]}
          onPress={() => navigation.navigate('Lab', { experiment: 'chemistry' })}
        >
          <FlaskConical color="#38a169" size={32} style={{ marginBottom: 12 }} />
          <Text style={styles.cardTitle}>Chemistry</Text>
          <Text style={styles.cardSubtitle}>Acid-Base Reactions</Text>
          <Text style={styles.cardDesc}>Learn about pH, indicators, and neutralization through interactive 3D experiments.</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, styles.physicsCard]}
          onPress={() => navigation.navigate('Lab', { experiment: 'physics' })}
        >
          <Zap color="#3182ce" size={32} style={{ marginBottom: 12 }} />
          <Text style={styles.cardTitle}>Physics</Text>
          <Text style={styles.cardSubtitle}>Electric Circuits</Text>
          <Text style={styles.cardDesc}>Build DC circuits with resistors, batteries, and bulbs to explore Ohm's Law.</Text>
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
    marginBottom: 5,
    color: '#1a365d',
  },
  subtitle: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 30,
  },
  experimentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderTopWidth: 4,
  },
  chemCard: {
    borderTopColor: '#38a169',
  },
  physicsCard: {
    borderTopColor: '#3182ce',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2d3748',
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
    marginBottom: 10,
  },
  cardDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: '#4a5568',
  },
});

export default HomeScreen;
