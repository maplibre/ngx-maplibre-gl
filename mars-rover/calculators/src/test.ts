/**
 * Test Suite for Mars Rover Calculators
 * FSDM Robotics Edition
 */

import { MotorCalculator } from './motorCalculator';
import { WeightCalculator } from './weightCalculator';
import { TerrainCalculator } from './terrainCalculator';
import {
  RoverSpecifications,
  MotorSpecifications,
  TerrainParameters,
} from './types';

console.log('🧪 Running Mars Rover Calculator Tests...\n');

let passedTests = 0;
let failedTests = 0;

function test(name: string, condition: boolean, expected?: string) {
  if (condition) {
    console.log(`✅ ${name}`);
    passedTests++;
  } else {
    console.log(`❌ ${name}`);
    if (expected) console.log(`   Expected: ${expected}`);
    failedTests++;
  }
}

// Test data
const testRover: RoverSpecifications = {
  weight: 10,
  wheelDiameter: 0.15,
  wheelWidth: 0.06,
  numberOfWheels: 6,
  trackWidth: 0.4,
  wheelbase: 0.5,
  groundClearance: 0.1,
};

const testMotor: MotorSpecifications = {
  voltage: 12,
  noLoadSpeed: 200,
  stallTorque: 1.5,
  stallCurrent: 5,
  noLoadCurrent: 0.2,
  efficiency: 0.7,
  gearRatio: 50,
  gearboxEfficiency: 0.85,
};

const testTerrain: TerrainParameters = {
  rollingResistanceCoefficient: 0.15,
  slopeAngle: 20,
  surfaceType: 'dirt',
};

console.log('--- Motor Calculator Tests ---\n');

// Test 1: Wheel torque calculation
const torque = MotorCalculator.calculateWheelTorque(testRover, testTerrain);
test(
  'Wheel torque calculation returns positive value',
  torque > 0 && torque < 10
);
test('Wheel torque is reasonable (0.5-2 Nm)', torque > 0.5 && torque < 2);

// Test 2: Motor RPM calculation
const rpm = MotorCalculator.calculateMotorRPM(0.5, 0.15, 50);
test('Motor RPM calculation returns positive value', rpm > 0);
test('Motor RPM is reasonable (1000-5000 RPM)', rpm > 1000 && rpm < 5000);

// Test 3: Motor power calculation
const power = MotorCalculator.calculateMotorPower(1.0, 3000);
test('Motor power calculation returns positive value', power > 0);
test('Motor power is reasonable (100-500W)', power > 100 && power < 500);

// Test 4: Current draw calculation
const current = MotorCalculator.calculateCurrentDraw(1000, 12, 0.7);
test('Current draw calculation returns positive value', current > 0);
test('Current draw is reasonable (50-200A)', current > 50 && current < 200);

// Test 5: Battery capacity calculation
const capacity = MotorCalculator.calculateBatteryCapacity(100, 2, 0.3);
test('Battery capacity calculation returns positive value', capacity > 0);
test('Battery capacity is reasonable (10-100 Ah)', capacity > 10 && capacity < 100);

// Test 6: Max speed calculation
const maxSpeed = MotorCalculator.calculateMaxSpeed(testMotor, 0.15);
test('Max speed calculation returns positive value', maxSpeed > 0);
test('Max speed is reasonable (0.1-2 m/s)', maxSpeed > 0.1 && maxSpeed < 2);

// Test 7: Max slope calculation
const maxSlope = MotorCalculator.calculateMaxSlope(
  testRover,
  testMotor,
  testTerrain
);
test('Max slope calculation returns positive value', maxSlope > 0);
test('Max slope is reasonable (10-45°)', maxSlope > 10 && maxSlope < 45);

console.log('\n--- Weight Calculator Tests ---\n');

// Test 8: Weight distribution
const cgPosition = { x: 0, y: 0, z: 0.12 };
const weightDist = WeightCalculator.calculateWeightDistribution(
  testRover,
  cgPosition
);
test('Weight distribution returns valid values', weightDist.frontAxle > 0);
test(
  'Total weight equals rover weight',
  Math.abs(
    weightDist.frontAxle + weightDist.middleAxle + weightDist.rearAxle - testRover.weight
  ) < 0.01
);

// Test 9: Stability factor
const stability = WeightCalculator.calculateStabilityFactor(testRover, 0.12);
test('Stability factor is between 0 and 1', stability >= 0 && stability <= 1);

// Test 10: Tip-over angle
const tipAngle = WeightCalculator.calculateTipOverAngle(testRover, 0.12);
test('Tip-over angle is positive', tipAngle > 0);
test('Tip-over angle is reasonable (30-70°)', tipAngle > 30 && tipAngle < 70);

// Test 11: Optimal CG height
const optimalCG = WeightCalculator.calculateOptimalCGHeight(testRover);
test('Optimal CG height is positive', optimalCG > 0);
test(
  'Optimal CG is reasonable fraction of track width',
  optimalCG > testRover.trackWidth * 0.2 &&
    optimalCG < testRover.trackWidth * 0.5
);

// Test 12: Ground pressure
const wheelLoads = WeightCalculator.calculateLoadPerWheel(
  testRover,
  weightDist
);
const pressure = WeightCalculator.calculateGroundPressure(
  testRover,
  wheelLoads[0]
);
test('Ground pressure is positive', pressure > 0);
test('Ground pressure is reasonable (1-100 kPa)', pressure > 1000 && pressure < 100000);

console.log('\n--- Terrain Calculator Tests ---\n');

// Test 13: Rolling resistance
const rollingRes = TerrainCalculator.getRollingResistance('dirt');
test('Rolling resistance is positive', rollingRes > 0);
test('Rolling resistance is reasonable (0-0.3)', rollingRes > 0 && rollingRes < 0.3);

// Test 14: Traction force
const traction = TerrainCalculator.calculateTractionForce(
  testRover,
  testTerrain,
  6
);
test('Traction force is positive', traction > 0);
test('Traction force is reasonable (10-500 N)', traction > 10 && traction < 500);

// Test 15: Speed reduction
const speedReduction = TerrainCalculator.estimateSpeedReduction(
  testTerrain,
  1.0
);
test('Speed reduction returns positive value', speedReduction > 0);
test('Speed reduction is less than nominal', speedReduction <= 1.0);

// Test 16: Power multiplier
const powerMult = TerrainCalculator.calculatePowerMultiplier(testTerrain);
test('Power multiplier is greater than 1', powerMult >= 1);
test('Power multiplier is reasonable (1-5x)', powerMult > 1 && powerMult < 5);

// Test 17: Terrain difficulty
const difficulty = TerrainCalculator.getTerrainDifficulty(testTerrain);
test('Difficulty rating is between 0 and 10', difficulty.rating >= 0 && difficulty.rating <= 10);
test('Difficulty description is not empty', difficulty.description.length > 0);

// Test 18: Battery life estimation
const batteryLife = TerrainCalculator.estimateBatteryLife(2, testTerrain);
test('Battery life is positive', batteryLife > 0);
test('Battery life is less than nominal on difficult terrain', batteryLife <= 2);

console.log('\n--- Integration Tests ---\n');

// Test 19: Complete power calculation
const powerReq = MotorCalculator.calculatePowerRequirements(
  testRover,
  testMotor,
  testTerrain,
  {
    desiredSpeed: 0.5,
    maxClimbAngle: 25,
    maxObstacleHeight: 0.05,
    operationTime: 2,
  }
);
test('Power requirements calculation completes', powerReq !== null);
test('All power values are positive', 
  powerReq.torquePerWheel > 0 &&
  powerReq.motorRPM > 0 &&
  powerReq.powerPerMotor > 0 &&
  powerReq.totalPower > 0
);

// Test 20: Motor suitability check
const suitability = MotorCalculator.isMotorSuitable(
  testMotor,
  powerReq.torquePerWheel,
  powerReq.motorRPM
);
test('Motor suitability check completes', suitability !== null);
test('Suitability has reason string', suitability.reason.length > 0);

// Test 21: Terrain traversability
const traversable = TerrainCalculator.isTerrainTraversable(
  testRover,
  testTerrain,
  maxSlope,
  0.05
);
test('Traversability check completes', traversable !== null);
test('Traversability has warnings array', Array.isArray(traversable.warnings));

console.log('\n' + '='.repeat(50));
console.log(`✅ Passed: ${passedTests}`);
console.log(`❌ Failed: ${failedTests}`);
console.log(`📊 Total:  ${passedTests + failedTests}`);
console.log(`🎯 Success Rate: ${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%`);
console.log('='.repeat(50));

if (failedTests === 0) {
  console.log('\n🎉 All tests passed! Calculators are working correctly.\n');
} else {
  console.log('\n⚠️  Some tests failed. Please review the implementation.\n');
  process.exit(1);
}
