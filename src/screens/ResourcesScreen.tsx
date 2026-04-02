import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ResourcesScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Learning Resources</Text>
      <Text style={styles.subtitle}>Deepen your knowledge with extra materials.</Text>

      <View style={styles.resourceList}>
        <View style={styles.resourceItem}>
          <View style={[styles.iconBox, { backgroundColor: '#38a169' }]} />
          <View style={styles.resourceText}>
            <Text style={styles.resourceTitle}>The pH Scale: Explained</Text>
            <Text style={styles.resourceMeta}>5 min video • Chemistry</Text>
          </View>
        </View>

        <View style={styles.resourceItem}>
          <View style={[styles.iconBox, { backgroundColor: '#3182ce' }]} />
          <View style={styles.resourceText}>
            <Text style={styles.resourceTitle}>Ohm's Law Fundamentals</Text>
            <Text style={styles.resourceMeta}>PDF Guide • Physics</Text>
          </View>
        </View>

        <View style={styles.resourceItem}>
          <View style={[styles.iconBox, { backgroundColor: '#718096' }]} />
          <View style={styles.resourceText}>
            <Text style={styles.resourceTitle}>Lab Safety 101</Text>
            <Text style={styles.resourceMeta}>Article • General Science</Text>
          </View>
        </View>
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
  resourceList: {
    marginTop: 10,
  },
  resourceItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 15,
  },
  resourceText: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 2,
  },
  resourceMeta: {
    fontSize: 12,
    color: '#718096',
  }
});

export default ResourcesScreen;
