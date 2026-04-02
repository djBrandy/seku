import { useState, useCallback } from 'react';
import { Solution, ChemistryLogic } from './ChemistryLogic';

const MAX_BEAKER_VOLUME = 500; // mL

export const useChemistryExperiment = () => {
  const [beakerSolution, setBeakerSolution] = useState<Solution | null>(null);
  const [isPouring, setIsPouring] = useState(false);

  const addSolutionToBeaker = useCallback((newSolution: Solution) => {
    if (!beakerSolution) {
      setBeakerSolution({ ...newSolution });
    } else {
      if (beakerSolution.volume >= MAX_BEAKER_VOLUME) return;
      
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
