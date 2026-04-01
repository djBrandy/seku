// idk man this math is kinda crazy but it works for now
export interface Solution {
  name: string;
  pH: number;
  concentration: number;
  volume: number;
  color: string;
}

const PH_NEUTRAL = 7.0;
const PH_MIN = 0.0;
const PH_MAX = 14.0;

export class ChemistryLogic {
  static calculateMixedPH(solutionA: Solution, solutionB: Solution): Solution {
    const totalVolume = solutionA.volume + solutionB.volume;
    if (totalVolume <= 0) {
      return { ...solutionA, name: 'Empty Solution' };
    }
    
    // Calculate total moles of H+ and OH-
    // pH = -log10([H+])  => [H+] = 10^-pH
    // [OH-] = 10^-(14-pH)
    
    const hA = Math.pow(10, -solutionA.pH);
    const ohA = Math.pow(10, -(PH_MAX - solutionA.pH));
    
    const hB = Math.pow(10, -solutionB.pH);
    const ohB = Math.pow(10, -(PH_MAX - solutionB.pH));
    
    const totalH = solutionA.volume * hA + solutionB.volume * hB;
    const totalOH = solutionA.volume * ohA + solutionB.volume * ohB;
    
    let mixedPH: number;
    if (totalH > totalOH) {
      const netH = (totalH - totalOH) / totalVolume;
      mixedPH = -Math.log10(netH);
    } else if (totalOH > totalH) {
      const netOH = (totalOH - totalH) / totalVolume;
      mixedPH = PH_MAX + Math.log10(netOH);
    } else {
      mixedPH = PH_NEUTRAL;
    }
    
    return {
      name: 'Mixed Solution',
      pH: parseFloat(Math.max(PH_MIN, Math.min(PH_MAX, mixedPH)).toFixed(2)),
      concentration: (solutionA.concentration * solutionA.volume + solutionB.concentration * solutionB.volume) / totalVolume,
      volume: totalVolume,
      color: this.interpolateColor(solutionA.color, solutionB.color, solutionB.volume / totalVolume),
    };
  }

  private static interpolateColor(color1: string, color2: string, factor: number): string {
    // Basic color interpolation for visualization
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);

    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}
