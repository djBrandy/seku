import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SceneContainer } from '../components/SceneContainer';
import * as THREE from 'three';
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

  const solutions = [
    { name: 'Hydrochloric Acid (0.1M)', pH: 1, concentration: 0.1, volume: 50, color: '#ff0000' },
    { name: 'Acetic Acid (0.1M)', pH: 2.88, concentration: 0.1, volume: 50, color: '#ff7700' },
    { name: 'Distilled Water', pH: 7, concentration: 0, volume: 50, color: '#ffffff' },
    { name: 'Ammonia (0.1M)', pH: 11.12, concentration: 0.1, volume: 50, color: '#77aaff' },
    { name: 'Sodium Hydroxide (0.1M)', pH: 13, concentration: 0.1, volume: 50, color: '#0000ff' },
  ];

  return (
    <View style={styles.container}>
      <SceneContainer onSceneInit={onSceneInit} onSelect={onSelect} />
      
      {experiment === 'chemistry' && threeScene && (
        <ChemistryScene scene={threeScene} solution={beakerSolution} />
      )}

      <View style={styles.overlay}>
        <View style={styles.meterContainer}>
          <Text style={styles.meterLabel}>pH METER</Text>
          <Text style={[styles.meterValue, { color: beakerSolution ? '#48bb78' : '#718096' }]}>
            {beakerSolution ? beakerSolution.pH.toFixed(2) : '--.--'}
          </Text>
        </View>
        <Text style={styles.statusText}>{status}</Text>
        {beakerSolution && (
          <View style={styles.dataDisplay}>
            <Text style={styles.dataText}>Volume: {beakerSolution.volume.toFixed(1)} mL</Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {solutions.map((sol) => (
            <TouchableOpacity 
              key={sol.name} 
              style={styles.button}
              onPress={() => addSolutionToBeaker(sol)}
            >
              <Text style={styles.buttonText}>Add {sol.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetExperiment}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </ScrollView>
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
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 8,
  },
  meterContainer: {
    backgroundColor: '#1a202c',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4a5568',
    marginBottom: 10,
    alignItems: 'center',
  },
  meterLabel: {
    color: '#a0aec0',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  meterValue: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#3182ce',
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dataDisplay: {
    marginTop: 10,
  },
  dataText: {
    color: '#cbd5e0',
    fontSize: 14,
  },
  resetButton: {
    backgroundColor: '#e53e3e',
  },
});

export default LabScreen;
