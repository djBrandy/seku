import { useState, useCallback } from 'react';
import { Solution, ChemistryLogic } from './ChemistryLogic';

export const useChemistryExperiment = () => {
  const [beakerSolution, setBeakerSolution] = useState<Solution | null>(null);
  const [isPouring, setIsPouring] = useState(false);

  const addSolutionToBeaker = useCallback((newSolution: Solution) => {
    if (!beakerSolution) {
      setBeakerSolution(newSolution);
    } else {
      const mixed = ChemistryLogic.calculateMixedPH(beakerSolution, newSolution);
      setBeakerSolution(mixed);
    }
  }, [beakerSolution]);

  const resetExperiment = () => {
    setBeakerSolution(null);
  };

  return {
    beakerSolution,
    addSolutionToBeaker,
    isPouring,
    setIsPouring,
    resetExperiment,
  };
};
