// Simple progress tracking service
// In a real app, this would use AsyncStorage or a database

export interface LabStats {
  chemistryExperiments: number;
  physicsExperiments: number;
  totalActions: number;
}

class ProgressService {
  private stats: LabStats = {
    chemistryExperiments: 0,
    physicsExperiments: 0,
    totalActions: 0,
  };

  private listeners: (() => void)[] = [];

  getStats() {
    return { ...this.stats };
  }

  recordAction(type: 'chemistry' | 'physics') {
    this.stats.totalActions++;
    if (type === 'chemistry') this.stats.chemistryExperiments++;
    if (type === 'physics') this.stats.physicsExperiments++;
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const progressService = new ProgressService();
