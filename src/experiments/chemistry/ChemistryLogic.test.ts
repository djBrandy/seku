import { ChemistryLogic, Solution } from './ChemistryLogic';

describe('ChemistryLogic', () => {
  test('calculateMixedPH should return 7 for mixing equal parts of pH 1 and pH 13', () => {
    const solA: Solution = { name: 'Acid', pH: 1, concentration: 0.1, volume: 100, color: '#ff0000' };
    const solB: Solution = { name: 'Base', pH: 13, concentration: 0.1, volume: 100, color: '#0000ff' };
    
    const mixed = ChemistryLogic.calculateMixedPH(solA, solB);
    expect(mixed.pH).toBeCloseTo(7, 0);
  });

  test('mixing pH 1 with more pH 1 should stay pH 1', () => {
    const solA: Solution = { name: 'Acid', pH: 1, concentration: 0.1, volume: 100, color: '#ff0000' };
    const solB: Solution = { name: 'Acid', pH: 1, concentration: 0.1, volume: 100, color: '#ff0000' };
    
    const mixed = ChemistryLogic.calculateMixedPH(solA, solB);
    expect(mixed.pH).toBe(1);
  });

  test('mixing solutions with zero volume should return an empty solution', () => {
    const solA: Solution = { name: 'Acid', pH: 1, concentration: 0.1, volume: 0, color: '#ff0000' };
    const solB: Solution = { name: 'Base', pH: 13, concentration: 0.1, volume: 0, color: '#0000ff' };
    
    const mixed = ChemistryLogic.calculateMixedPH(solA, solB);
    expect(mixed.name).toBe('Empty Solution');
  });
});
