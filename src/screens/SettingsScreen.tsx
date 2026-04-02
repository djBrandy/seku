import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const handlePress = (label: string) => {
    Alert.alert('Setting Selected', `You pressed: ${label}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Configure your lab experience.</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity style={styles.settingItem} onPress={() => handlePress('Language')}>
          <Text style={styles.settingLabel}>Language</Text>
          <Text style={styles.settingValue}>English (US)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.settingItem} 
          activeOpacity={0.7}
          onPress={() => setIsDarkMode(!isDarkMode)}
        >
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch 
            value={isDarkMode} 
            onValueChange={setIsDarkMode}
            trackColor={{ false: "#718096", true: "#3182ce" }}
            thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility</Text>
        <TouchableOpacity 
          style={styles.settingItem} 
          activeOpacity={0.7}
          onPress={() => setIsHighContrast(!isHighContrast)}
        >
          <Text style={styles.settingLabel}>High Contrast</Text>
          <Switch 
            value={isHighContrast} 
            onValueChange={setIsHighContrast}
            trackColor={{ false: "#718096", true: "#38a169" }}
            thumbColor={isHighContrast ? "#fff" : "#f4f3f4"}
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem} onPress={() => handlePress('Text Size')}>
          <Text style={styles.settingLabel}>Text Size</Text>
          <Text style={styles.settingValue}>Medium</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity style={styles.settingItem} onPress={() => handlePress('Version')}>
          <Text style={styles.settingLabel}>Version</Text>
          <Text style={styles.settingValue}>1.0.0-beta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => handlePress('Developer')}>
          <Text style={styles.settingLabel}>Developer</Text>
          <Text style={styles.settingValue}>djBrandy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
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
