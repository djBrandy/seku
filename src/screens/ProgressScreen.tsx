import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <Text style={styles.subtitle}>Track your lab achievements and data recordings.</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Chemistry Lab</Text>
          <Text style={styles.cardPercent}>60%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '60%', backgroundColor: '#38a169' }]} />
        </View>
        <Text style={styles.cardStats}>3/5 Experiments Completed</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Physics Lab</Text>
          <Text style={styles.cardPercent}>20%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '20%', backgroundColor: '#3182ce' }]} />
        </View>
        <Text style={styles.cardStats}>1/5 Experiments Completed</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 30, 
    backgroundColor: '#f0f4f8' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#1a365d',
    marginBottom: 5 
  },
  subtitle: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  cardPercent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#edf2f7',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  cardStats: {
    fontSize: 14,
    color: '#718096',
  }
});

export default ProgressScreen;
