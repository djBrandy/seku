import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { progressService, LabStats } from '../services/ProgressService';

const ProgressScreen = () => {
  const [stats, setStats] = useState<LabStats>(progressService.getStats());

  useEffect(() => {
    const unsubscribe = progressService.subscribe(() => {
      setStats(progressService.getStats());
    });
    return unsubscribe;
  }, []);

  // Calculate percentages based on some targets (e.g., 20 actions for 100%)
  const chemPercent = Math.min(100, (stats.chemistryExperiments / 10) * 100);
  const physicsPercent = Math.min(100, (stats.physicsExperiments / 10) * 100);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Your Progress</Text>
      <Text style={styles.subtitle}>Track your lab achievements and data recordings.</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Chemistry Lab</Text>
          <Text style={styles.cardPercent}>{chemPercent.toFixed(0)}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${chemPercent}%`, backgroundColor: '#38a169' }]} />
        </View>
        <Text style={styles.cardStats}>{stats.chemistryExperiments} actions performed</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Physics Lab</Text>
          <Text style={styles.cardPercent}>{physicsPercent.toFixed(0)}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${physicsPercent}%`, backgroundColor: '#3182ce' }]} />
        </View>
        <Text style={styles.cardStats}>{stats.physicsExperiments} actions performed</Text>
      </View>

      <View style={styles.totalStats}>
        <Text style={styles.totalText}>Total Lab Actions: {stats.totalActions}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f4f8' 
  },
  scrollContent: {
    padding: 30,
    paddingBottom: 50,
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
  },
  totalStats: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#1a365d',
    borderRadius: 16,
    alignItems: 'center',
  },
  totalText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default ProgressScreen;
