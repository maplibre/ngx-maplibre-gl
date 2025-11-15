/**
 * Mars Rover Calculator Types
 * FSDM Robotics Edition
 */

export interface RoverSpecifications {
  weight: number; // kg
  wheelDiameter: number; // meters
  wheelWidth: number; // meters
  numberOfWheels: number;
  trackWidth: number; // meters (distance between left and right wheels)
  wheelbase: number; // meters (distance between front and rear wheels)
  groundClearance: number; // meters
}

export interface MotorSpecifications {
  voltage: number; // volts
  noLoadSpeed: number; // RPM
  stallTorque: number; // Nm
  stallCurrent: number; // amperes
  noLoadCurrent: number; // amperes
  efficiency: number; // 0-1 (e.g., 0.7 = 70%)
  gearRatio: number; // e.g., 50 for 50:1
  gearboxEfficiency: number; // 0-1
}

export interface TerrainParameters {
  rollingResistanceCoefficient: number; // 0-1
  slopeAngle: number; // degrees
  surfaceType: 'asphalt' | 'concrete' | 'dirt' | 'sand' | 'gravel' | 'grass';
}

export interface PerformanceRequirements {
  desiredSpeed: number; // m/s
  maxClimbAngle: number; // degrees
  maxObstacleHeight: number; // meters
  operationTime: number; // hours
}

export interface PowerCalculationResult {
  torquePerWheel: number; // Nm
  motorRPM: number; // RPM
  powerPerMotor: number; // watts
  totalPower: number; // watts
  currentDraw: number; // amperes
  batteryCapacity: number; // Ah
  efficiency: number; // 0-1
}

export interface BatterySpecifications {
  voltage: number; // volts
  capacity: number; // Ah
  chemistry: 'LiPo' | 'Li-ion' | 'NiMH' | 'Lead-acid';
  weight: number; // kg
  dischargeCurrent: number; // C-rating
}

export interface WeightDistribution {
  frontAxle: number; // kg
  middleAxle: number; // kg
  rearAxle: number; // kg
  centerOfGravityHeight: number; // meters
  stabilityFactor: number; // 0-1 (higher is more stable)
}
