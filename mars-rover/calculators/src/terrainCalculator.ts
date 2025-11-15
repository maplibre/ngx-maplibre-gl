/**
 * Terrain Analysis and Performance Calculations
 * FSDM Robotics Edition
 */

import { RoverSpecifications, TerrainParameters } from './types';

export class TerrainCalculator {
  /**
   * Get rolling resistance coefficient for different surfaces
   */
  static getRollingResistance(
    surfaceType: TerrainParameters['surfaceType']
  ): number {
    const coefficients: Record<TerrainParameters['surfaceType'], number> = {
      asphalt: 0.01,
      concrete: 0.015,
      dirt: 0.08,
      sand: 0.15,
      gravel: 0.12,
      grass: 0.1,
    };

    return coefficients[surfaceType];
  }

  /**
   * Calculate maximum obstacle height the rover can climb
   */
  static calculateMaxObstacleHeight(
    rover: RoverSpecifications,
    availableTorque: number
  ): number {
    // Simplified model: obstacle height ≈ 0.5 × wheel diameter
    // This is conservative; rocker-bogie can do better
    const geometricLimit = rover.wheelDiameter * 0.5;

    // Check if torque is sufficient
    const wheelRadius = rover.wheelDiameter / 2;
    const requiredForce = rover.weight * 9.81 * 0.5; // Half weight on climbing wheel
    const availableForce = availableTorque / wheelRadius;

    if (availableForce < requiredForce) {
      // Torque limited
      return (availableForce / requiredForce) * geometricLimit;
    }

    return geometricLimit;
  }

  /**
   * Calculate traction force available
   */
  static calculateTractionForce(
    rover: RoverSpecifications,
    terrain: TerrainParameters,
    numberOfDrivenWheels: number
  ): number {
    const weightPerWheel = rover.weight / rover.numberOfWheels;
    const normalForce = weightPerWheel * 9.81;

    // Friction coefficient estimates
    const frictionCoefficients: Record<
      TerrainParameters['surfaceType'],
      number
    > = {
      asphalt: 0.8,
      concrete: 0.7,
      dirt: 0.6,
      sand: 0.4,
      gravel: 0.5,
      grass: 0.5,
    };

    const frictionCoeff = frictionCoefficients[terrain.surfaceType];
    const tractionPerWheel = normalForce * frictionCoeff;
    const totalTraction = tractionPerWheel * numberOfDrivenWheels;

    return totalTraction;
  }

  /**
   * Estimate speed reduction on different terrains
   */
  static estimateSpeedReduction(
    terrain: TerrainParameters,
    nominalSpeed: number
  ): number {
    const reductionFactors: Record<TerrainParameters['surfaceType'], number> = {
      asphalt: 1.0, // No reduction
      concrete: 0.95,
      dirt: 0.7,
      sand: 0.5,
      gravel: 0.6,
      grass: 0.75,
    };

    const factor = reductionFactors[terrain.surfaceType];
    const slopeFactor = Math.max(0.1, 1 - terrain.slopeAngle / 45); // Reduce speed on slopes

    return nominalSpeed * factor * slopeFactor;
  }

  /**
   * Calculate power consumption multiplier for terrain
   */
  static calculatePowerMultiplier(terrain: TerrainParameters): number {
    const baseMultipliers: Record<TerrainParameters['surfaceType'], number> = {
      asphalt: 1.0,
      concrete: 1.1,
      dirt: 1.5,
      sand: 2.5,
      gravel: 1.8,
      grass: 1.6,
    };

    const baseMultiplier = baseMultipliers[terrain.surfaceType];

    // Add slope penalty
    const slopeMultiplier = 1 + terrain.slopeAngle / 30;

    return baseMultiplier * slopeMultiplier;
  }

  /**
   * Check if terrain is traversable
   */
  static isTerrainTraversable(
    rover: RoverSpecifications,
    terrain: TerrainParameters,
    maxSlope: number,
    maxObstacle: number
  ): { traversable: boolean; warnings: string[] } {
    const warnings: string[] = [];

    // Check slope
    if (terrain.slopeAngle > maxSlope) {
      warnings.push(
        `Slope too steep: ${terrain.slopeAngle.toFixed(1)}° (max: ${maxSlope.toFixed(1)}°)`
      );
    }

    // Check ground clearance
    if (rover.groundClearance < maxObstacle * 0.5) {
      warnings.push(
        `Insufficient ground clearance for obstacles: ${(rover.groundClearance * 1000).toFixed(0)}mm`
      );
    }

    // Check soft terrain (sand)
    if (terrain.surfaceType === 'sand') {
      warnings.push(
        'Sand terrain detected: expect reduced speed and increased power consumption'
      );
    }

    return {
      traversable: warnings.length === 0,
      warnings,
    };
  }

  /**
   * Estimate battery life on different terrains
   */
  static estimateBatteryLife(
    nominalBatteryLife: number,
    terrain: TerrainParameters
  ): number {
    const powerMultiplier = this.calculatePowerMultiplier(terrain);

    // Battery life inversely proportional to power consumption
    return nominalBatteryLife / powerMultiplier;
  }

  /**
   * Generate terrain difficulty rating
   */
  static getTerrainDifficulty(terrain: TerrainParameters): {
    rating: number;
    description: string;
  } {
    let rating = 0;

    // Surface type contribution (0-5)
    const surfaceRatings: Record<TerrainParameters['surfaceType'], number> = {
      asphalt: 1,
      concrete: 1,
      grass: 2,
      dirt: 3,
      gravel: 4,
      sand: 5,
    };
    rating += surfaceRatings[terrain.surfaceType];

    // Slope contribution (0-5)
    rating += Math.min(5, terrain.slopeAngle / 9); // 45° = max 5 points

    // Normalize to 0-10 scale
    rating = Math.min(10, rating);

    const descriptions = [
      'Very Easy',
      'Easy',
      'Moderate',
      'Challenging',
      'Difficult',
      'Very Difficult',
      'Extreme',
    ];
    const descriptionIndex = Math.min(
      Math.floor(rating / 1.5),
      descriptions.length - 1
    );

    return {
      rating,
      description: descriptions[descriptionIndex],
    };
  }
}
