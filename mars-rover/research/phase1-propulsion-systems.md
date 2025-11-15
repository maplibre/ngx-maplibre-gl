# Phase 1: Propulsion Systems Research ⚙️

## Overview
Research and selection of motors, gearboxes, wheels, and drive systems for the Mars Rover to achieve optimal performance on rough terrain.

## Motor Types Comparison

### 1. DC Brushed Motors ⭐ RECOMMENDED FOR PROTOTYPING
**Description:** Traditional DC motors with brushes for commutation.

**Advantages:**
- ✅ Simple to control (just voltage/PWM)
- ✅ Low cost
- ✅ No complex driver needed
- ✅ Good torque at low speeds
- ✅ Widely available

**Disadvantages:**
- ❌ Brushes wear out over time
- ❌ Lower efficiency than brushless
- ❌ Electrical noise (EMI)
- ❌ Requires maintenance

**Typical Specifications:**
```
Voltage: 6V, 12V, 24V
Power: 10-100W per motor
Speed: 3000-10000 RPM (no load)
Efficiency: 60-80%
Cost: €5-25 per motor
```

**Recommended Models:**
- **JGA25-370** (12V, 200 RPM with gearbox, €8-12)
- **RS-555** (12V, high torque, €10-15)
- **Pololu 37D** (12V, metal gearbox, €15-25)

### 2. DC Brushless Motors (BLDC)
**Description:** High-efficiency motors with electronic commutation.

**Advantages:**
- ✅ High efficiency (85-95%)
- ✅ Long lifespan (no brush wear)
- ✅ High power-to-weight ratio
- ✅ Low maintenance
- ✅ Better speed control

**Disadvantages:**
- ❌ Requires ESC (Electronic Speed Controller)
- ❌ More expensive
- ❌ More complex control
- ❌ Higher initial cost

**Typical Specifications:**
```
Voltage: 11.1V-22.2V (3S-6S LiPo)
Power: 50-500W per motor
KV Rating: 1000-3000 RPM/V
Efficiency: 85-95%
Cost: €15-50 per motor + €10-30 per ESC
```

**Best For:** High-performance rovers, long mission duration, efficiency-critical applications

### 3. Stepper Motors
**Description:** Motors that move in discrete steps, providing precise position control.

**Advantages:**
- ✅ Precise position control
- ✅ No encoder needed for position
- ✅ Good holding torque
- ✅ Open-loop control possible

**Disadvantages:**
- ❌ Lower efficiency
- ❌ Can lose steps under high load
- ❌ Requires stepper driver
- ❌ Resonance issues at certain speeds
- ❌ Lower top speed

**Typical Specifications:**
```
Voltage: 12V-24V
Steps: 200 steps/rev (1.8° per step)
Torque: 0.3-2.0 Nm
Cost: €10-30 per motor + €5-15 per driver
```

**Best For:** Robotic arms, camera gimbals, precise positioning (NOT recommended for rover wheels)

### 4. Servo Motors
**Description:** Motors with built-in position feedback and control.

**Advantages:**
- ✅ Built-in position control
- ✅ Easy to use
- ✅ Good for specific angles

**Disadvantages:**
- ❌ Limited rotation (typically 180°)
- ❌ Not suitable for continuous rotation wheels
- ❌ Expensive for continuous rotation versions

**Best For:** Steering mechanisms, camera pan/tilt, robotic arms (NOT for wheel drive)

## Gearbox Selection

### Why Gearboxes Are Essential
Motors typically spin at 3000-10000 RPM, but rover wheels need 30-100 RPM. Gearboxes provide:
- **Torque multiplication** (critical for climbing obstacles)
- **Speed reduction** (for controlled movement)
- **Better efficiency** at optimal motor speeds

### Gear Ratio Calculation
```
Gear Ratio = Motor Speed / Desired Wheel Speed

Example:
Motor: 6000 RPM
Desired Wheel Speed: 60 RPM
Required Gear Ratio: 6000 / 60 = 100:1
```

### Gearbox Types

#### 1. Spur Gearbox
**Pros:** Simple, efficient (90-95%), low cost  
**Cons:** Noisy, less compact  
**Typical Ratios:** 10:1 to 100:1

#### 2. Planetary Gearbox ⭐ RECOMMENDED
**Pros:** Compact, high torque, efficient (85-90%), quiet  
**Cons:** More expensive  
**Typical Ratios:** 3:1 to 100:1  
**Cost:** €10-30

#### 3. Worm Gearbox
**Pros:** Very high ratios (100:1+), self-locking  
**Cons:** Lower efficiency (40-60%), heat generation  
**Not Recommended** for rover wheels

### Recommended Gear Ratios for Mars Rover
```
Terrain Type          | Gear Ratio | Wheel Speed | Top Speed
---------------------|------------|-------------|----------
Flat/Indoor          | 30:1       | 100 RPM     | Fast
Mixed Terrain        | 50:1       | 60 RPM      | Medium ⭐
Rough/Steep Terrain  | 100:1      | 30 RPM      | Slow
```

**Recommended:** 50:1 to 75:1 for balanced performance

## Wheel Selection

### Wheel Diameter
**Small (100-150mm):**
- ✅ Lower torque requirement
- ✅ Better acceleration
- ❌ Smaller obstacle climbing
- ❌ Lower top speed

**Medium (150-200mm):** ⭐ RECOMMENDED
- ✅ Good obstacle climbing (30-40mm obstacles)
- ✅ Balanced speed and torque
- ✅ Suitable for most terrains

**Large (200-300mm):**
- ✅ Excellent obstacle climbing
- ✅ Higher top speed
- ❌ Higher torque requirement
- ❌ Heavier

### Wheel Types

#### 1. Rubber Wheels
**Pros:** Good traction, shock absorption, quiet  
**Cons:** Can slip on loose terrain  
**Best For:** Indoor, hard surfaces, moderate outdoor

#### 2. Foam Wheels
**Pros:** Lightweight, won't go flat, good shock absorption  
**Cons:** Lower traction, wear faster  
**Best For:** Prototyping, lightweight rovers

#### 3. Knobby/Treaded Wheels ⭐ RECOMMENDED
**Pros:** Excellent traction on loose terrain (sand, gravel, dirt)  
**Cons:** More expensive  
**Best For:** Outdoor rovers, Mars-like terrain

#### 4. Mecanum Wheels
**Pros:** Omnidirectional movement  
**Cons:** Complex control, poor on rough terrain, expensive  
**Best For:** Indoor robots, NOT for Mars rover

### Recommended Wheel Specifications
```
Diameter: 150-180mm
Width: 50-70mm
Material: Rubber with aggressive tread pattern
Hub: Aluminum or 3D printed
Mounting: 6mm or 8mm shaft
Cost: €8-15 per wheel
```

## Drive System Configurations

### 1. 6-Wheel Drive (6WD) ⭐ RECOMMENDED
**Configuration:** All 6 wheels powered independently

**Advantages:**
- ✅ Maximum traction and climbing ability
- ✅ Redundancy (can lose 1-2 motors and still function)
- ✅ Best for rough terrain
- ✅ Even weight distribution

**Disadvantages:**
- ❌ 6 motors required (higher cost)
- ❌ More complex wiring and control
- ❌ Higher power consumption

**Motor Requirements:**
- 6× DC brushed motors with gearboxes
- 6× motor drivers (H-bridges)
- Synchronized control for straight movement

### 2. 4-Wheel Drive (4WD)
**Configuration:** 4 corner wheels powered

**Advantages:**
- ✅ Good traction
- ✅ Simpler than 6WD
- ✅ Lower cost

**Disadvantages:**
- ❌ Middle wheels (if present) are passive
- ❌ Less climbing ability than 6WD

### 3. Differential Drive (2WD)
**Configuration:** 2 wheels powered (left/right), others are passive

**Advantages:**
- ✅ Very simple control
- ✅ Zero-radius turning
- ✅ Lowest cost

**Disadvantages:**
- ❌ Poor traction on rough terrain
- ❌ Limited obstacle climbing
- ❌ Not suitable for Mars rover concept

**Not Recommended** for this project

## Motor Control Electronics

### Motor Drivers (H-Bridges)

#### 1. L298N Dual H-Bridge ⭐ BUDGET OPTION
**Specifications:**
- Voltage: 5-35V
- Current: 2A per channel (4A peak)
- Channels: 2 (controls 2 motors)
- Cost: €3-5 per module

**Pros:** Cheap, easy to use, widely available  
**Cons:** Lower efficiency (70%), heat generation, bulky

#### 2. TB6612FNG Dual H-Bridge
**Specifications:**
- Voltage: 4.5-13.5V
- Current: 1.2A per channel (3.2A peak)
- Channels: 2
- Cost: €5-8 per module

**Pros:** More efficient than L298N, compact, less heat  
**Cons:** Lower current capacity

#### 3. BTS7960 High-Power H-Bridge
**Specifications:**
- Voltage: 5.5-27V
- Current: 43A continuous
- Channels: 1 (single motor)
- Cost: €8-12 per module

**Pros:** Very high current, efficient, robust  
**Cons:** More expensive, need 6 for 6WD

#### 4. Motor Driver Shield (Arduino Compatible)
**Examples:** Adafruit Motor Shield V2, DFRobot Motor Shield

**Pros:** Easy integration, stackable, built-in protection  
**Cons:** Limited current, more expensive

### Recommended Configuration for 6WD Rover:
```
Option A (Budget):
- 3× L298N modules (each controls 2 motors)
- Total Cost: €9-15

Option B (Better Performance):
- 3× TB6612FNG modules
- Total Cost: €15-24

Option C (High Power):
- 6× BTS7960 modules (one per motor)
- Total Cost: €48-72
```

## Power Requirements Calculation

### Example Calculation for 6WD Rover

**Assumptions:**
- Rover weight: 12 kg
- Wheel diameter: 150mm
- Desired speed: 0.5 m/s
- Terrain: Moderate (rolling resistance coefficient = 0.15)
- Climbing angle: 20°

**Step 1: Calculate Required Torque per Wheel**
```
Force per wheel = (Weight × g × (cos(θ) × μ + sin(θ))) / 6
                = (12 × 9.81 × (cos(20°) × 0.15 + sin(20°))) / 6
                = (117.72 × (0.94 × 0.15 + 0.34)) / 6
                = (117.72 × 0.48) / 6
                = 9.4 N per wheel

Torque = Force × Radius
       = 9.4 N × 0.075 m
       = 0.71 Nm per wheel
```

**Step 2: Calculate Motor Speed**
```
Wheel RPM = (Speed × 60) / (π × Diameter)
          = (0.5 × 60) / (π × 0.15)
          = 63.7 RPM

With 50:1 gearbox:
Motor RPM = 63.7 × 50 = 3185 RPM
```

**Step 3: Calculate Power**
```
Power per motor = (Torque × RPM × 2π) / 60
                = (0.71 × 3185 × 2π) / 60
                = 236 W per motor

Total Power (6 motors) = 236 × 6 = 1416 W
```

**Step 4: Account for Efficiency**
```
Motor Efficiency: 70%
Gearbox Efficiency: 85%
Total Efficiency: 0.70 × 0.85 = 59.5%

Actual Power Required = 1416 / 0.595 = 2380 W
```

**Step 5: Battery Capacity**
```
For 12V system:
Current Draw = 2380 W / 12 V = 198 A (peak)

Typical operation (30% duty cycle):
Average Current = 198 × 0.3 = 59.4 A

For 1 hour operation:
Battery Capacity = 59.4 Ah (at 12V)

Practical: Use 2× 12V 30Ah batteries in parallel
```

### Realistic Motor Selection

**For 12kg Rover with Moderate Performance:**

**Motor:** JGA25-370 with 50:1 gearbox
- Voltage: 12V
- No-load Speed: 200 RPM (after gearbox)
- Stall Torque: 1.5 Nm
- Rated Power: 10W
- Cost: €10 per motor

**Total System:**
- 6× Motors: €60
- 3× L298N Drivers: €12
- 12V 20Ah Battery: €40-60
- **Total Propulsion Cost: €112-132**

## Recommended Propulsion System for FSDM Mars Rover

### Configuration Summary
```
Drive System:        6WD (all wheels powered)
Motors:              6× JGA25-370 DC brushed motors
Gearbox:             50:1 planetary gearbox (integrated)
Motor Drivers:       3× L298N dual H-bridge modules
Wheels:              6× 150mm diameter, knobby tread
Power:               12V system
Battery:             12V 20Ah LiPo or Li-ion
Expected Speed:      0.3-0.5 m/s (1-1.8 km/h)
Climbing Ability:    20-25° slopes
Obstacle Height:     40-50mm
Runtime:             2-3 hours continuous
```

### Cost Breakdown
```
Motors (6×):         €60
Motor Drivers (3×):  €12
Wheels (6×):         €48
Battery:             €50
Wiring & Connectors: €15
------------------------
Total:               €185
```

## Control Strategy

### Basic Control (PWM)
- Use PWM (Pulse Width Modulation) for speed control
- Frequency: 1-20 kHz
- Duty Cycle: 0-100% for speed variation

### Advanced Control (PID)
- Implement PID control for precise speed regulation
- Use encoders for feedback (optional but recommended)
- Maintain synchronized wheel speeds for straight movement

### Steering Methods
1. **Differential Steering** (different speeds left/right)
   - Turn radius = (Track Width × (VL + VR)) / (VR - VL)
   - Zero-radius turns possible (one side forward, other reverse)

2. **Ackermann Steering** (front wheels turn)
   - More complex mechanically
   - Better for high-speed applications
   - Not recommended for slow rover

## Next Steps

1. ✅ Complete propulsion system research
2. ⏳ Create motor torque calculator (TypeScript utility)
3. ⏳ Design motor mounting brackets
4. ⏳ Plan electrical wiring diagram
5. ⏳ Select specific motor and driver models
6. ⏳ Order components for prototyping

## References
- "Electric Motor Handbook" by H. Wayne Beaty
- NASA JPL Mars Rover Mobility System
- "Robot Builder's Bonanza" by Gordon McComb
- Pololu Motor Selection Guide
- RobotShop Motor Sizing Calculator

---
**Document Version:** 1.0  
**Last Updated:** November 15, 2025  
**Author:** FSDM Robotics Team
