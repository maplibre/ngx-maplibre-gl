/**
 * Motor and Power Calculations for Mars Rover
 * FSDM Robotics Edition
 */

import {
  RoverSpecifications,
  MotorSpecifications,
  TerrainParameters,
  PerformanceRequirements,
  PowerCalculationResult,
} from './types';

export class MotorCalculator {
  private static readonly GRAVITY = 9.81; // m/s²

  /**
   * Calculate required torque per wheel
   */
  static calculateWheelTorque(
    rover: RoverSpecifications,
    terrain: TerrainParameters
  ): number {
    const weightNewtons = rover.weight * this.GRAVITY;
    const slopeRadians = (terrain.slopeAngle * Math.PI) / 180;

    // Force per wheel considering slope and rolling resistance
    const forcePerWheel =
      (weightNewtons *
        (Math.cos(slopeRadians) * terrain.rollingResistanceCoefficient +
          Math.sin(slopeRadians))) /
      rover.numberOfWheels;

    // Torque = Force × Radius
    const wheelRadius = rover.wheelDiameter / 2;
    const torque = forcePerWheel * wheelRadius;

    return torque;
  }

  /**
   * Calculate required motor RPM for desired speed
   */
  static calculateMotorRPM(
    desiredSpeed: number,
    wheelDiameter: number,
    gearRatio: number
  ): number {
    // Wheel RPM = (Speed × 60) / (π × Diameter)
    const wheelRPM = (desiredSpeed * 60) / (Math.PI * wheelDiameter);

    // Motor RPM = Wheel RPM × Gear Ratio
    const motorRPM = wheelRPM * gearRatio;

    return motorRPM;
  }

  /**
   * Calculate motor power requirement
   */
  static calculateMotorPower(torque: number, rpm: number): number {
    // Power (watts) = (Torque × RPM × 2π) / 60
    const power = (torque * rpm * 2 * Math.PI) / 60;
    return power;
  }

  /**
   * Calculate current draw from battery
   */
  static calculateCurrentDraw(
    totalPower: number,
    voltage: number,
    efficiency: number
  ): number {
    // Account for inefficiency
    const actualPower = totalPower / efficiency;

    // Current = Power / Voltage
    const current = actualPower / voltage;

    return current;
  }

  /**
   * Calculate required battery capacity
   */
  static calculateBatteryCapacity(
    currentDraw: number,
    operationTime: number,
    dutyCycle: number = 0.3
  ): number {
    // Average current considering duty cycle
    const averageCurrent = currentDraw * dutyCycle;

    // Capacity (Ah) = Current × Time
    const capacity = averageCurrent * operationTime;

    return capacity;
  }

  /**
   * Complete power calculation
   */
  static calculatePowerRequirements(
    rover: RoverSpecifications,
    motor: MotorSpecifications,
    terrain: TerrainParameters,
    performance: PerformanceRequirements
  ): PowerCalculationResult {
    // Step 1: Calculate torque per wheel
    const torquePerWheel = this.calculateWheelTorque(rover, terrain);

    // Step 2: Calculate motor RPM
    const motorRPM = this.calculateMotorRPM(
      performance.desiredSpeed,
      rover.wheelDiameter,
      motor.gearRatio
    );

    // Step 3: Calculate power per motor
    const powerPerMotor = this.calculateMotorPower(torquePerWheel, motorRPM);

    // Step 4: Calculate total power
    const totalPower = powerPerMotor * rover.numberOfWheels;

    // Step 5: Calculate overall efficiency
    const overallEfficiency = motor.efficiency * motor.gearboxEfficiency;

    // Step 6: Calculate current draw
    const currentDraw = this.calculateCurrentDraw(
      totalPower,
      motor.voltage,
      overallEfficiency
    );

    // Step 7: Calculate battery capacity
    const batteryCapacity = this.calculateBatteryCapacity(
      currentDraw,
      performance.operationTime,
      0.3 // 30% duty cycle
    );

    return {
      torquePerWheel,
      motorRPM,
      powerPerMotor,
      totalPower,
      currentDraw,
      batteryCapacity,
      efficiency: overallEfficiency,
    };
  }

  /**
   * Check if motor can provide required torque
   */
  static isMotorSuitable(
    motor: MotorSpecifications,
    requiredTorque: number,
    requiredRPM: number
  ): { suitable: boolean; reason: string } {
    // Check torque capacity (with safety factor of 1.5)
    const availableTorque = motor.stallTorque * motor.gearRatio;
    if (requiredTorque * 1.5 > availableTorque) {
      return {
        suitable: false,
        reason: `Insufficient torque. Required: ${(requiredTorque * 1.5).toFixed(2)} Nm, Available: ${availableTorque.toFixed(2)} Nm`,
      };
    }

    // Check speed capacity
    if (requiredRPM > motor.noLoadSpeed) {
      return {
        suitable: false,
        reason: `Insufficient speed. Required: ${requiredRPM.toFixed(0)} RPM, Available: ${motor.noLoadSpeed.toFixed(0)} RPM`,
      };
    }

    return {
      suitable: true,
      reason: 'Motor is suitable for the application',
    };
  }

  /**
   * Calculate maximum speed achievable
   */
  static calculateMaxSpeed(
    motor: MotorSpecifications,
    wheelDiameter: number
  ): number {
    // Wheel RPM at motor no-load speed
    const wheelRPM = motor.noLoadSpeed / motor.gearRatio;

    // Speed = (RPM × π × Diameter) / 60
    const maxSpeed = (wheelRPM * Math.PI * wheelDiameter) / 60;

    return maxSpeed;
  }

  /**
   * Calculate maximum climbable slope
   */
  static calculateMaxSlope(
    rover: RoverSpecifications,
    motor: MotorSpecifications,
    terrain: TerrainParameters
  ): number {
    const availableTorque = motor.stallTorque * motor.gearRatio;
    const wheelRadius = rover.wheelDiameter / 2;
    const maxForcePerWheel = availableTorque / wheelRadius;
    const totalForce = maxForcePerWheel * rover.numberOfWheels;
    const weight = rover.weight * this.GRAVITY;

    // sin(θ) = (F - μ × W × cos(θ)) / W
    // Simplified: sin(θ) ≈ F/W - μ
    const sinTheta =
      totalForce / weight - terrain.rollingResistanceCoefficient;
    const maxSlopeRadians = Math.asin(Math.min(sinTheta, 1));
    const maxSlopeDegrees = (maxSlopeRadians * 180) / Math.PI;

    return Math.max(0, maxSlopeDegrees);
  }
}
