/**
 * Mars Rover Engineering Calculators
 * FSDM Robotics Edition
 * 
 * Main entry point for demonstration calculations
 */

import { MotorCalculator } from './motorCalculator';
import { WeightCalculator } from './weightCalculator';
import { TerrainCalculator } from './terrainCalculator';
import {
  RoverSpecifications,
  MotorSpecifications,
  TerrainParameters,
  PerformanceRequirements,
} from './types';

// Example rover configuration
const exampleRover: RoverSpecifications = {
  weight: 12, // kg
  wheelDiameter: 0.15, // 150mm
  wheelWidth: 0.06, // 60mm
  numberOfWheels: 6,
  trackWidth: 0.4, // 400mm
  wheelbase: 0.5, // 500mm
  groundClearance: 0.1, // 100mm
};

// Example motor configuration (JGA25-370 with 50:1 gearbox)
const exampleMotor: MotorSpecifications = {
  voltage: 12, // 12V
  noLoadSpeed: 200, // RPM (after gearbox)
  stallTorque: 1.5, // Nm
  stallCurrent: 5, // A
  noLoadCurrent: 0.2, // A
  efficiency: 0.7, // 70%
  gearRatio: 50, // 50:1
  gearboxEfficiency: 0.85, // 85%
};

// Example terrain (moderate difficulty)
const exampleTerrain: TerrainParameters = {
  rollingResistanceCoefficient: 0.15,
  slopeAngle: 20, // degrees
  surfaceType: 'dirt',
};

// Performance requirements
const examplePerformance: PerformanceRequirements = {
  desiredSpeed: 0.5, // 0.5 m/s
  maxClimbAngle: 25, // degrees
  maxObstacleHeight: 0.05, // 50mm
  operationTime: 2, // 2 hours
};

console.log('='.repeat(70));
console.log('🚀 MARS ROVER FSDM - ENGINEERING CALCULATIONS');
console.log('='.repeat(70));
console.log();

// 1. Power Requirements
console.log('📊 POWER REQUIREMENTS ANALYSIS');
console.log('-'.repeat(70));

const powerResults = MotorCalculator.calculatePowerRequirements(
  exampleRover,
  exampleMotor,
  exampleTerrain,
  examplePerformance
);

console.log(`Torque per wheel:        ${powerResults.torquePerWheel.toFixed(3)} Nm`);
console.log(`Motor RPM required:      ${powerResults.motorRPM.toFixed(0)} RPM`);
console.log(`Power per motor:         ${powerResults.powerPerMotor.toFixed(1)} W`);
console.log(`Total power (6 motors):  ${powerResults.totalPower.toFixed(1)} W`);
console.log(`System efficiency:       ${(powerResults.efficiency * 100).toFixed(1)}%`);
console.log(`Current draw (12V):      ${powerResults.currentDraw.toFixed(1)} A`);
console.log(`Battery capacity needed: ${powerResults.batteryCapacity.toFixed(1)} Ah`);
console.log();

// 2. Motor Suitability Check
console.log('🔧 MOTOR SUITABILITY CHECK');
console.log('-'.repeat(70));

const suitability = MotorCalculator.isMotorSuitable(
  exampleMotor,
  powerResults.torquePerWheel,
  powerResults.motorRPM
);

console.log(`Status: ${suitability.suitable ? '✅ SUITABLE' : '❌ NOT SUITABLE'}`);
console.log(`Reason: ${suitability.reason}`);
console.log();

// 3. Performance Capabilities
console.log('⚡ PERFORMANCE CAPABILITIES');
console.log('-'.repeat(70));

const maxSpeed = MotorCalculator.calculateMaxSpeed(
  exampleMotor,
  exampleRover.wheelDiameter
);

const maxSlope = MotorCalculator.calculateMaxSlope(
  exampleRover,
  exampleMotor,
  exampleTerrain
);

console.log(`Maximum speed:           ${maxSpeed.toFixed(2)} m/s (${(maxSpeed * 3.6).toFixed(1)} km/h)`);
console.log(`Maximum climbable slope: ${maxSlope.toFixed(1)}°`);
console.log();

// 4. Weight Distribution
console.log('⚖️  WEIGHT DISTRIBUTION ANALYSIS');
console.log('-'.repeat(70));

const cgPosition = { x: 0, y: 0, z: 0.12 }; // CG at 120mm height
const weightDist = WeightCalculator.calculateWeightDistribution(
  exampleRover,
  cgPosition
);

console.log(`Front axle load:         ${weightDist.frontAxle.toFixed(2)} kg`);
console.log(`Middle axle load:        ${weightDist.middleAxle.toFixed(2)} kg`);
console.log(`Rear axle load:          ${weightDist.rearAxle.toFixed(2)} kg`);
console.log(`CG height:               ${(weightDist.centerOfGravityHeight * 1000).toFixed(0)} mm`);
console.log(`Stability factor:        ${(weightDist.stabilityFactor * 100).toFixed(0)}%`);

const tipOverAngle = WeightCalculator.calculateTipOverAngle(
  exampleRover,
  cgPosition.z
);
console.log(`Tip-over angle:          ${tipOverAngle.toFixed(1)}°`);

const optimalCG = WeightCalculator.calculateOptimalCGHeight(exampleRover);
console.log(`Optimal CG height:       ${(optimalCG * 1000).toFixed(0)} mm`);
console.log();

// 5. Ground Pressure
console.log('🌍 GROUND PRESSURE ANALYSIS');
console.log('-'.repeat(70));

const wheelLoads = WeightCalculator.calculateLoadPerWheel(
  exampleRover,
  weightDist
);
const avgWheelLoad = wheelLoads.reduce((a, b) => a + b, 0) / wheelLoads.length;
const groundPressure = WeightCalculator.calculateGroundPressure(
  exampleRover,
  avgWheelLoad
);

console.log(`Average load per wheel:  ${avgWheelLoad.toFixed(2)} kg`);
console.log(`Ground pressure:         ${(groundPressure / 1000).toFixed(1)} kPa`);
console.log(`                         ${(groundPressure / 6894.76).toFixed(2)} psi`);
console.log();

// 6. Terrain Analysis
console.log('🏔️  TERRAIN ANALYSIS');
console.log('-'.repeat(70));

const difficulty = TerrainCalculator.getTerrainDifficulty(exampleTerrain);
console.log(`Surface type:            ${exampleTerrain.surfaceType}`);
console.log(`Slope angle:             ${exampleTerrain.slopeAngle}°`);
console.log(`Difficulty rating:       ${difficulty.rating.toFixed(1)}/10 (${difficulty.description})`);

const rollingResistance = TerrainCalculator.getRollingResistance(
  exampleTerrain.surfaceType
);
console.log(`Rolling resistance:      ${rollingResistance.toFixed(3)}`);

const tractionForce = TerrainCalculator.calculateTractionForce(
  exampleRover,
  exampleTerrain,
  6
);
console.log(`Available traction:      ${tractionForce.toFixed(1)} N`);

const speedReduction = TerrainCalculator.estimateSpeedReduction(
  exampleTerrain,
  maxSpeed
);
console.log(`Effective speed:         ${speedReduction.toFixed(2)} m/s (${(speedReduction * 3.6).toFixed(1)} km/h)`);

const powerMultiplier = TerrainCalculator.calculatePowerMultiplier(exampleTerrain);
console.log(`Power multiplier:        ${powerMultiplier.toFixed(2)}x`);

const batteryLife = TerrainCalculator.estimateBatteryLife(
  examplePerformance.operationTime,
  exampleTerrain
);
console.log(`Estimated battery life:  ${batteryLife.toFixed(1)} hours`);
console.log();

// 7. Traversability Check
console.log('✅ TERRAIN TRAVERSABILITY CHECK');
console.log('-'.repeat(70));

const traversability = TerrainCalculator.isTerrainTraversable(
  exampleRover,
  exampleTerrain,
  maxSlope,
  examplePerformance.maxObstacleHeight
);

console.log(`Traversable: ${traversability.traversable ? '✅ YES' : '❌ NO'}`);
if (traversability.warnings.length > 0) {
  console.log('Warnings:');
  traversability.warnings.forEach((warning) => {
    console.log(`  ⚠️  ${warning}`);
  });
} else {
  console.log('No warnings - terrain is suitable for this rover configuration');
}
console.log();

// 8. Component Placement Recommendations
console.log('📦 COMPONENT PLACEMENT RECOMMENDATIONS');
console.log('-'.repeat(70));

const placement = WeightCalculator.recommendComponentPlacement(exampleRover);
console.log(`Battery:     ${placement.battery}`);
console.log(`Electronics: ${placement.electronics}`);
console.log(`Payload:     ${placement.payload}`);
console.log();

// 9. Summary and Recommendations
console.log('📋 SUMMARY AND RECOMMENDATIONS');
console.log('='.repeat(70));
console.log();

console.log('✅ RECOMMENDED CONFIGURATION:');
console.log(`   • Motors: 6× JGA25-370 (12V, 50:1 gearbox)`);
console.log(`   • Battery: 12V ${Math.ceil(powerResults.batteryCapacity * 1.5)} Ah LiPo/Li-ion`);
console.log(`   • Wheels: 6× 150mm diameter with aggressive tread`);
console.log(`   • Expected performance:`);
console.log(`     - Speed: ${speedReduction.toFixed(2)} m/s on dirt terrain`);
console.log(`     - Climb: ${maxSlope.toFixed(0)}° slopes`);
console.log(`     - Runtime: ${batteryLife.toFixed(1)} hours`);
console.log();

console.log('⚠️  IMPORTANT NOTES:');
console.log(`   • Keep CG below ${(optimalCG * 1000).toFixed(0)}mm for optimal stability`);
console.log(`   • Use motor drivers rated for at least ${Math.ceil(powerResults.currentDraw / 2)} A per channel`);
console.log(`   • Add 30% safety margin to battery capacity`);
console.log(`   • Consider heat sinks for motor drivers on steep terrain`);
console.log();

console.log('='.repeat(70));
console.log('✨ Calculations complete! Ready for Phase 2: 3D Modeling');
console.log('='.repeat(70));

// Export calculators for use in other modules
export { MotorCalculator, WeightCalculator, TerrainCalculator };
export * from './types';
