import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SceneContainer } from '../components/SceneContainer';
import * as THREE from 'three';
import { RotateCcw } from 'lucide-react-native';
import { useChemistryExperiment } from '../experiments/chemistry/useChemistryExperiment';
import { ChemistryScene } from '../experiments/chemistry/ChemistryScene';

// some ui stuff i guess
const LabScreen = ({ route }: any) => {
  const { experiment } = route.params || { experiment: 'chemistry' };
  const [status, setStatus] = useState('Initializing...');
  const [threeScene, setThreeScene] = useState<THREE.Scene | null>(null);

  const { beakerSolution, addSolutionToBeaker, resetExperiment } = useChemistryExperiment();

  const onSceneInit = (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
    setStatus(`${experiment.toUpperCase()} LAB READY`);
    setThreeScene(scene);
    camera.position.set(0, 2, 5);
  };

  const onSelect = (object: THREE.Object3D | null) => {
    if (object) {
      setStatus(`Selected: ${object.name || 'Object'}`);
    } else {
      setStatus(beakerSolution ? `pH: ${beakerSolution.pH}` : `${experiment.toUpperCase()} LAB READY`);
    }
  };

  const [activeCategory, setActiveCategory] = useState('Acids');

  const solutionPortfolios: Record<string, any[]> = {
    'Acids': [
      { name: 'Hydrochloric Acid (0.1M)', pH: 1, concentration: 0.1, volume: 50, color: '#ff0000' },
      { name: 'Sulfuric Acid (0.05M)', pH: 1.2, concentration: 0.05, volume: 50, color: '#ff4400' },
      { name: 'Acetic Acid (Vinegar)', pH: 2.88, concentration: 0.1, volume: 50, color: '#ffcc00' },
    ],
    'Bases': [
      { name: 'Sodium Hydroxide (0.1M)', pH: 13, concentration: 0.1, volume: 50, color: '#0000ff' },
      { name: 'Ammonia (0.1M)', pH: 11.12, concentration: 0.1, volume: 50, color: '#77aaff' },
      { name: 'Baking Soda Sol.', pH: 8.3, concentration: 0.1, volume: 50, color: '#00ffcc' },
    ],
    'Household': [
      { name: 'Lemon Juice', pH: 2.2, concentration: 0.05, volume: 50, color: '#ffff00' },
      { name: 'Milk', pH: 6.7, concentration: 0.0001, volume: 50, color: '#ffffff' },
      { name: 'Distilled Water', pH: 7, concentration: 0, volume: 50, color: '#00ffff' },
      { name: 'Bleach', pH: 12.5, concentration: 0.5, volume: 50, color: '#f0fff0' },
    ]
  };

  const currentSolutions = solutionPortfolios[activeCategory] || [];

  return (
    <View style={styles.container}>
      <SceneContainer onSceneInit={onSceneInit} onSelect={onSelect} />
      
      {experiment === 'chemistry' && threeScene && (
        <ChemistryScene scene={threeScene} solution={beakerSolution} />
      )}

      <View style={styles.overlay}>
        <View style={styles.meterContainer}>
          <Text style={styles.meterLabel}>PH LEVEL</Text>
          <Text style={[styles.meterValue, { color: beakerSolution ? '#48bb78' : '#718096' }]}>
            {beakerSolution ? beakerSolution.pH.toFixed(2) : '--.--'}
          </Text>
        </View>
        <View style={styles.infoBadge}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
        {beakerSolution && (
          <View style={styles.dataDisplay}>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Volume:</Text>
              <Text style={styles.dataValue}>{beakerSolution.volume.toFixed(1)} mL</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Conc.:</Text>
              <Text style={styles.dataValue}>{beakerSolution.concentration.toFixed(3)} M</Text>
            </View>
          </View>
        )}
        <View style={styles.phScale}>
          {[...Array(15)].map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.phStep, 
                { backgroundColor: i < 7 ? `rgb(255, ${Math.floor(255 * (i/7))}, 0)` : (i === 7 ? '#ffffff' : `rgb(0, ${Math.floor(255 * (1 - (i-7)/7))}, 255)`) }
              ]} 
            />
          ))}
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.controlHeader}>
          <View style={styles.portfolioTabs}>
            {Object.keys(solutionPortfolios).map(cat => (
              <TouchableOpacity 
                key={cat} 
                onPress={() => setActiveCategory(cat)}
                style={[styles.portfolioTab, activeCategory === cat && styles.activeTab]}
              >
                <Text style={[styles.portfolioTabText, activeCategory === cat && styles.activeTabText]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {currentSolutions.map((sol) => (
            <TouchableOpacity 
              key={sol.name} 
              style={[styles.button, { borderLeftColor: sol.color, borderLeftWidth: 4 }]}
              onPress={() => addSolutionToBeaker(sol)}
            >
              <Text style={styles.buttonText}>{sol.name}</Text>
              <Text style={styles.buttonSubtext}>pH {sol.pH}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.resetFab} onPress={resetExperiment}>
          <RotateCcw color="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 220,
  },
  meterContainer: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2d3748',
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  meterLabel: {
    color: '#718096',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 4,
  },
  meterValue: {
    fontSize: 42,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textShadowColor: 'rgba(72, 187, 120, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  infoBadge: {
    backgroundColor: 'rgba(26, 32, 44, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  statusText: {
    color: '#e2e8f0',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  dataDisplay: {
    backgroundColor: 'rgba(26, 32, 44, 0.85)',
    padding: 12,
    borderRadius: 12,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dataLabel: {
    color: '#a0aec0',
    fontSize: 11,
  },
  dataValue: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  phScale: {
    flexDirection: 'row',
    marginTop: 15,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  phStep: {
    flex: 1,
    height: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(26, 32, 44, 0.9)',
    borderRadius: 20,
    padding: 15,
  },
  controlHeader: {
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  portfolioTabs: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  portfolioTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#1a202c',
  },
  activeTab: {
    backgroundColor: '#3182ce',
  },
  portfolioTabText: {
    color: '#a0aec0',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  activeTabText: {
    color: '#fff',
  },
  controlTitle: {
    color: '#718096',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scrollContent: {
    paddingRight: 80,
  },
  button: {
    backgroundColor: '#2d3748',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 10,
    minWidth: 140,
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  buttonSubtext: {
    color: '#a0aec0',
    fontSize: 10,
    marginTop: 2,
  },
  resetFab: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    backgroundColor: '#e53e3e',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  resetFabText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default LabScreen;
