import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SettingsScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Configure your lab experience.</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Language</Text>
          <Text style={styles.settingValue}>English (US)</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Text style={styles.settingValue}>Off</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>High Contrast</Text>
          <Text style={styles.settingValue}>Disabled</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Text Size</Text>
          <Text style={styles.settingValue}>Medium</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Version</Text>
          <Text style={styles.settingValue}>1.0.0-beta</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Developer</Text>
          <Text style={styles.settingValue}>djBrandy</Text>
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
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: 'center',
    elevation: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 14,
    color: '#3182ce',
    fontWeight: '600',
  },
});

export default SettingsScreen;
