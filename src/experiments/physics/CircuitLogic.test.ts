import { CircuitSimulation, ComponentType, CircuitComponent } from './CircuitLogic';

describe('CircuitSimulation', () => {
  test('solve should calculate correct current for 9V battery and 10 ohm resistor', () => {
    const components: CircuitComponent[] = [
      { id: 'b1', type: ComponentType.BATTERY, value: 9, unit: 'V', nodeA: 0, nodeB: 1, label: 'Battery' },
      { id: 'r1', type: ComponentType.RESISTOR, value: 10, unit: 'Ω', nodeA: 1, nodeB: 0, label: 'Resistor' },
    ];
    
    const results = CircuitSimulation.solve(components);
    const resistorResult = results.find(r => r.id === 'r1');
    
    expect(resistorResult?.current).toBe(0.9);
    expect(resistorResult?.voltage).toBe(9);
  });

  test('solve should return zeros for empty circuit', () => {
    const results = CircuitSimulation.solve([]);
    expect(results).toEqual([]);
  });
});
