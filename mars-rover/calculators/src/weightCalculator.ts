/**
 * Weight Distribution and Stability Calculations
 * FSDM Robotics Edition
 */

import { RoverSpecifications, WeightDistribution } from './types';

export class WeightCalculator {
  /**
   * Calculate weight distribution across axles
   * Assumes uniform weight distribution for simplicity
   */
  static calculateWeightDistribution(
    rover: RoverSpecifications,
    cgPosition: { x: number; y: number; z: number } // relative to rover center
  ): WeightDistribution {
    // For 6-wheel rover with 3 axles
    const numberOfAxles = rover.numberOfWheels / 2;

    // Simplified: assume equal distribution
    // In reality, this depends on CG position
    const weightPerAxle = rover.weight / numberOfAxles;

    return {
      frontAxle: weightPerAxle,
      middleAxle: weightPerAxle,
      rearAxle: weightPerAxle,
      centerOfGravityHeight: cgPosition.z,
      stabilityFactor: this.calculateStabilityFactor(rover, cgPosition.z),
    };
  }

  /**
   * Calculate stability factor
   * Higher is more stable (less likely to tip over)
   */
  static calculateStabilityFactor(
    rover: RoverSpecifications,
    cgHeight: number
  ): number {
    // Stability factor = (Track Width / 2) / CG Height
    // Higher value = more stable
    const stabilityFactor = rover.trackWidth / 2 / cgHeight;

    // Normalize to 0-1 scale (assuming typical values)
    // Good stability: > 1.5, Poor stability: < 0.5
    const normalized = Math.min(stabilityFactor / 2, 1);

    return normalized;
  }

  /**
   * Calculate maximum safe slope angle before tipping
   */
  static calculateTipOverAngle(
    rover: RoverSpecifications,
    cgHeight: number
  ): number {
    // Tip-over angle = arctan((Track Width / 2) / CG Height)
    const angleRadians = Math.atan(rover.trackWidth / 2 / cgHeight);
    const angleDegrees = (angleRadians * 180) / Math.PI;

    return angleDegrees;
  }

  /**
   * Calculate optimal CG height for stability
   */
  static calculateOptimalCGHeight(rover: RoverSpecifications): number {
    // Optimal CG height is typically 30-40% of track width
    const optimalHeight = rover.trackWidth * 0.35;

    return optimalHeight;
  }

  /**
   * Check if weight distribution is balanced
   */
  static isWeightBalanced(
    distribution: WeightDistribution,
    tolerance: number = 0.1
  ): { balanced: boolean; message: string } {
    const avgWeight =
      (distribution.frontAxle +
        distribution.middleAxle +
        distribution.rearAxle) /
      3;

    const maxDeviation = Math.max(
      Math.abs(distribution.frontAxle - avgWeight),
      Math.abs(distribution.middleAxle - avgWeight),
      Math.abs(distribution.rearAxle - avgWeight)
    );

    const deviationPercent = maxDeviation / avgWeight;

    if (deviationPercent > tolerance) {
      return {
        balanced: false,
        message: `Weight imbalance detected: ${(deviationPercent * 100).toFixed(1)}% deviation (tolerance: ${(tolerance * 100).toFixed(0)}%)`,
      };
    }

    return {
      balanced: true,
      message: 'Weight distribution is balanced',
    };
  }

  /**
   * Calculate load per wheel
   */
  static calculateLoadPerWheel(
    rover: RoverSpecifications,
    distribution: WeightDistribution
  ): number[] {
    // Returns array of loads for each wheel [FL, FR, ML, MR, RL, RR]
    const wheelsPerAxle = 2;

    return [
      distribution.frontAxle / wheelsPerAxle, // Front Left
      distribution.frontAxle / wheelsPerAxle, // Front Right
      distribution.middleAxle / wheelsPerAxle, // Middle Left
      distribution.middleAxle / wheelsPerAxle, // Middle Right
      distribution.rearAxle / wheelsPerAxle, // Rear Left
      distribution.rearAxle / wheelsPerAxle, // Rear Right
    ];
  }

  /**
   * Calculate ground pressure (important for soft terrain)
   */
  static calculateGroundPressure(
    rover: RoverSpecifications,
    wheelLoad: number
  ): number {
    // Contact area per wheel (simplified as rectangle)
    const contactLength = rover.wheelDiameter * 0.3; // ~30% of diameter in contact
    const contactArea = contactLength * rover.wheelWidth;

    // Pressure = Force / Area
    const pressure = (wheelLoad * 9.81) / contactArea; // Pa (N/m²)

    return pressure;
  }

  /**
   * Recommend component placement for optimal CG
   */
  static recommendComponentPlacement(rover: RoverSpecifications): {
    battery: string;
    electronics: string;
    payload: string;
    optimalCGHeight: number;
  } {
    const optimalHeight = this.calculateOptimalCGHeight(rover);

    return {
      battery: `Place at chassis bottom, centered. Target height: ${(optimalHeight * 0.5).toFixed(3)}m`,
      electronics: `Place at mid-height, centered. Target height: ${optimalHeight.toFixed(3)}m`,
      payload: `Place at top, centered. Maximum height: ${(optimalHeight * 1.5).toFixed(3)}m`,
      optimalCGHeight: optimalHeight,
    };
  }
}
