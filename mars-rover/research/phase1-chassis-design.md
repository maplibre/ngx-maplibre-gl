# Phase 1: Chassis Design Research 🏗️

## Overview
Research and conception of the Mars Rover chassis structure optimized for rough terrain navigation, stability, and modularity.

## Chassis Design Options

### 1. Rocker-Bogie Suspension System ⭐ RECOMMENDED
**Description:** The rocker-bogie system is NASA's proven design used on Mars rovers (Sojourner, Spirit, Opportunity, Curiosity, Perseverance).

**Advantages:**
- ✅ Excellent obstacle climbing capability (obstacles up to 2x wheel diameter)
- ✅ Maintains all 6 wheels in contact with ground on uneven terrain
- ✅ No springs or dampers needed (passive suspension)
- ✅ Equal weight distribution across all wheels
- ✅ Proven reliability in Mars missions

**Disadvantages:**
- ❌ Complex mechanical design
- ❌ Requires precise manufacturing tolerances
- ❌ More parts = more potential failure points

**Key Specifications:**
- **Wheel Configuration:** 6 wheels (3 per side)
- **Suspension Type:** Passive mechanical linkage
- **Articulation:** Differential bar connects left/right rockers
- **Climbing Angle:** Up to 45° slopes
- **Obstacle Height:** Up to 2x wheel diameter

**Design Parameters:**
```
Rocker Length: 1.5 × Wheel Diameter
Bogie Length: 1.0 × Wheel Diameter
Differential Bar: Allows ±15° articulation
Wheel Spacing: 2.0 × Wheel Diameter (front-to-back)
```

### 2. Differential Drive Chassis
**Description:** Simple 4-wheel or 6-wheel platform with independent left/right motor control.

**Advantages:**
- ✅ Simple mechanical design
- ✅ Easy to manufacture
- ✅ Excellent maneuverability (zero-radius turns)
- ✅ Fewer moving parts

**Disadvantages:**
- ❌ Limited obstacle climbing
- ❌ Poor performance on very rough terrain
- ❌ Wheels may lose ground contact on uneven surfaces

**Best For:** Indoor robots, flat terrain, educational projects

### 3. Four-Wheel Independent Suspension
**Description:** Each wheel has independent suspension with springs/dampers.

**Advantages:**
- ✅ Good shock absorption
- ✅ Comfortable ride over bumps
- ✅ Moderate terrain capability

**Disadvantages:**
- ❌ Requires springs and dampers
- ❌ More complex than differential drive
- ❌ Less capable than rocker-bogie on extreme terrain

## Material Selection

### Chassis Frame Materials

#### 1. Aluminum 6061-T6 ⭐ RECOMMENDED
**Properties:**
- Density: 2.70 g/cm³
- Tensile Strength: 310 MPa
- Yield Strength: 276 MPa
- Machinability: Excellent

**Pros:**
- ✅ Lightweight and strong
- ✅ Easy to machine and weld
- ✅ Corrosion resistant
- ✅ Good thermal properties
- ✅ Readily available

**Cons:**
- ❌ More expensive than steel
- ❌ Lower strength than carbon fiber

**Cost:** Moderate (€15-30/kg)

#### 2. Carbon Fiber Composite
**Properties:**
- Density: 1.55 g/cm³
- Tensile Strength: 600-800 MPa
- Very high stiffness-to-weight ratio

**Pros:**
- ✅ Extremely lightweight
- ✅ Very high strength
- ✅ Excellent stiffness

**Cons:**
- ❌ Expensive
- ❌ Difficult to manufacture
- ❌ Requires specialized tools
- ❌ Brittle (poor impact resistance)

**Cost:** High (€50-150/kg)

#### 3. 3D Printed PLA/PETG
**Properties:**
- Density: 1.24 g/cm³ (PLA), 1.27 g/cm³ (PETG)
- Tensile Strength: 50 MPa (PLA), 53 MPa (PETG)

**Pros:**
- ✅ Very low cost
- ✅ Rapid prototyping
- ✅ Complex geometries possible
- ✅ Easy to modify design

**Cons:**
- ❌ Lower strength than metals
- ❌ Temperature sensitive
- ❌ Not suitable for high-stress components
- ❌ Layer adhesion can fail

**Cost:** Very Low (€20-30/kg filament)

**Best For:** Prototyping, non-structural components, brackets

#### 4. Steel (Mild Steel / Stainless)
**Properties:**
- Density: 7.85 g/cm³
- Tensile Strength: 400-500 MPa

**Pros:**
- ✅ Very strong
- ✅ Low cost
- ✅ Easy to weld

**Cons:**
- ❌ Heavy (3x heavier than aluminum)
- ❌ Rust (unless stainless)

**Best For:** Budget builds, high-load components

## Recommended Chassis Configuration

### For FSDM Mars Rover Project:

**Suspension System:** Rocker-Bogie (scaled down)  
**Frame Material:** Aluminum 6061-T6 for main structure  
**Supplementary Materials:** 3D printed PETG for brackets and non-structural parts  
**Wheel Configuration:** 6 wheels, 150-200mm diameter  
**Overall Dimensions:** 600mm L × 400mm W × 300mm H  

### Weight Budget:
```
Chassis Frame:        2.0 kg
Suspension System:    1.5 kg
Wheels (6×):          1.2 kg
Motors (6×):          1.8 kg
Electronics:          1.5 kg
Battery:              2.0 kg
Payload:              2.0 kg
------------------------
Total Target Weight:  12.0 kg
```

## Design Considerations

### 1. Center of Gravity (CG)
- Keep CG as low as possible for stability
- Position heavy components (battery, motors) near chassis bottom
- Target CG height: < 40% of total rover height

### 2. Ground Clearance
- Minimum: 80mm for rough terrain
- Recommended: 100-120mm
- Consider belly pan protection for electronics

### 3. Wheelbase and Track Width
- Longer wheelbase = better stability, worse maneuverability
- Wider track = better stability on slopes
- Recommended ratio: Track Width / Wheelbase ≈ 0.7-0.8

### 4. Modularity
- Design for easy disassembly and maintenance
- Use standardized fasteners (M3, M4, M5 bolts)
- Modular electronics mounting system
- Accessible battery compartment

### 5. Waterproofing
- IP54 rating minimum (dust and splash resistant)
- Sealed electronics enclosures
- Cable glands for wire entry points
- Conformal coating on PCBs

## Next Steps for Phase 1

1. ✅ Complete chassis design research
2. ⏳ Research propulsion systems (motors, gearboxes)
3. ⏳ Create detailed CAD sketches
4. ⏳ Calculate power requirements
5. ⏳ Finalize material selection based on budget
6. ⏳ Prepare for Phase 2 (3D modeling)

## References
- NASA JPL Mars Rover Rocker-Bogie Design
- "Mobile Robots: Inspiration to Implementation" by Jones & Flynn
- MIT OpenCourseWare: Mobile Autonomous Systems Laboratory
- ESA ExoMars Rover Design Documentation

---
**Document Version:** 1.0  
**Last Updated:** November 15, 2025  
**Author:** FSDM Robotics Team
