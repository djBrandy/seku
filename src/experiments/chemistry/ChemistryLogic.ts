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

  private static normalizeHex(hex: string): string {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(char => char + char).join('');
    }
    return `#${cleanHex.padStart(6, '0')}`;
  }

  private static toRGB(hex: string) {
    const normalized = this.normalizeHex(hex);
    return {
      r: parseInt(normalized.slice(1, 3), 16),
      g: parseInt(normalized.slice(3, 5), 16),
      b: parseInt(normalized.slice(5, 7), 16),
    };
  }

  private static fromRGB(r: number, g: number, b: number): string {
    const toHex = (c: number) => Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  private static interpolateColor(color1: string, color2: string, factor: number): string {
    const rgb1 = this.toRGB(color1);
    const rgb2 = this.toRGB(color2);

    const r = rgb1.r + (rgb2.r - rgb1.r) * factor;
    const g = rgb1.g + (rgb2.g - rgb1.g) * factor;
    const b = rgb1.b + (rgb2.b - rgb1.b) * factor;

    return this.fromRGB(r, g, b);
  }
}
