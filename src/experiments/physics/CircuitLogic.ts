export enum ComponentType {
  RESISTOR,
  BATTERY,
  LED,
  SWITCH,
  BULB,
}

export interface CircuitComponent {
  id: string;
  type: ComponentType;
  value: number; // Resistance (ohms) or Voltage (volts)
  nodeA: number;
  nodeB: number;
  label: string;
}

export class CircuitSimulation {
  // Simplistic DC circuit solver using nodal analysis
  // For a full implementation, modified nodal analysis (MNA) is required
  // to handle voltage sources easily.
  
  static solve(components: CircuitComponent[]) {
    // Basic single-loop circuit solver (one battery, one resistor)
    const battery = components.find(c => c.type === ComponentType.BATTERY);
    const resistor = components.find(c => c.type === ComponentType.RESISTOR);

    if (battery && resistor && resistor.value > 0) {
      const current = battery.value / resistor.value;
      return components.map(c => ({
        id: c.id,
        voltage: c.type === ComponentType.BATTERY ? battery.value : (c.type === ComponentType.RESISTOR ? battery.value : 0),
        current: current,
      }));
    }

    // Returning dummy values for now
    return components.map(c => ({
      id: c.id,
      voltage: 0,
      current: 0,
    }));
  }
}
