import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// An original engineering illustration: folded airframe, carbon spars, a compact
// gimbal, and small stereo sensors. It does not reproduce an employer's hardware.
export function createDrone(materials) {
  const drone = new THREE.Group();
  const shell = new THREE.Group();
  const board = new THREE.Group();
  const underside = new THREE.Group();
  const gimbal = new THREE.Group();
  drone.add(shell, board, underside, gimbal);
  const mesh = (geometry, material, parent, x = 0, y = 0, z = 0) => {
    const object = new THREE.Mesh(geometry, material);
    object.position.set(x, y, z);
    parent.add(object);
    return object;
  };
  const box = (w, h, d, r = 0.018) => new RoundedBoxGeometry(w, h, d, 2, r);
  const beam = (a, b, width, height, material, parent) => {
    const start = new THREE.Vector3(...a),
      end = new THREE.Vector3(...b);
    const object = mesh(
      box(width, height, start.distanceTo(end), 0.014),
      material,
      parent,
    );
    object.position.copy(start).add(end).multiplyScalar(0.5);
    object.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      end.sub(start).normalize(),
    );
    return object;
  };
  const ring = (radius, thickness, material, parent, x, y, z) => {
    const object = mesh(
      new THREE.TorusGeometry(radius, thickness, 6, 40),
      material,
      parent,
      x,
      y,
      z,
    );
    object.rotation.x = Math.PI / 2;
    return object;
  };
  // Filleted panel perimeter with four bevel segments: hard panel surfaces and
  // smooth manufactured edges, instead of a low-poly or inflated body.
  const hull = (width, length, height) => {
    const outline = [
      [-0.28, 1],
      [0.28, 1],
      [0.5, 0.58],
      [0.46, -0.62],
      [0.29, -1],
      [-0.29, -1],
      [-0.46, -0.62],
      [-0.5, 0.58],
    ].map(([x, z]) => new THREE.Vector2(x * width, z * length * 0.5));
    const shape = new THREE.Shape();
    for (let i = 0; i < outline.length; i++) {
      const current = outline[i];
      const before = current
        .clone()
        .lerp(outline[(i + outline.length - 1) % outline.length], 0.12);
      const after = current
        .clone()
        .lerp(outline[(i + 1) % outline.length], 0.12);
      if (i === 0) shape.moveTo(before.x, before.y);
      else shape.lineTo(before.x, before.y);
      shape.quadraticCurveTo(current.x, current.y, after.x, after.y);
    }
    shape.closePath();
    const bevel = Math.min(0.028, height * 0.24);
    const depth = height - bevel * 2;
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 4,
      steps: 1,
      curveSegments: 8,
    });
    geometry.rotateX(Math.PI / 2);
    geometry.translate(0, depth / 2, 0);
    return geometry;
  };

  const fuselage = mesh(
    hull(0.94, 1.88, 0.22),
    materials.shell,
    shell,
    0,
    0.12,
    0,
  );
  const topPanel = mesh(
    hull(0.62, 1.25, 0.045),
    materials.dark,
    shell,
    0,
    0.255,
    -0.12,
  );
  const cap = mesh(
    box(0.36, 0.025, 0.53),
    materials.carbon,
    shell,
    0,
    0.285,
    -0.18,
  );
  // Recessed cooling slots and four flush fasteners.
  for (let i = 0; i < 7; i++)
    mesh(
      box(0.24, 0.007, 0.014, 0.003),
      materials.dark,
      shell,
      0,
      0.302,
      -0.39 + i * 0.057,
    );
  for (const side of [-1, 1]) {
    mesh(
      box(0.012, 0.018, 0.48, 0.004),
      materials.accent,
      shell,
      side * 0.34,
      0.2,
      -0.05,
    );
    for (const end of [-1, 1]) {
      mesh(
        new THREE.CylinderGeometry(0.016, 0.016, 0.006, 10),
        materials.silver,
        shell,
        side * 0.35,
        0.21,
        end * 0.56,
      );
    }
    // Small navigation LED, with a surrounding black bezel.
    mesh(
      box(0.1, 0.032, 0.025, 0.006),
      materials.dark,
      shell,
      side * 0.365,
      0.12,
      0.63,
    );
    mesh(
      box(0.055, 0.012, 0.008, 0.003),
      materials.cyan,
      shell,
      side * 0.365,
      0.122,
      0.647,
    );
  }
  // A low-profile orange identification panel, rather than an orange airframe.
  mesh(box(0.19, 0.008, 0.13, 0.005), materials.accent, shell, 0, 0.24, 0.43);
  for (let i = 0; i < 3; i++)
    mesh(
      box(0.09 - i * 0.02, 0.003, 0.009, 0.002),
      materials.dark,
      shell,
      0,
      0.246,
      0.4 + i * 0.028,
    );

  mesh(box(0.76, 0.033, 1.08, 0.022), materials.board, board, 0, -0.012, -0.05);
  mesh(box(0.31, 0.045, 0.32), materials.dark, board, 0, 0.023, -0.12);
  for (let i = 0; i < 8; i++)
    mesh(
      box(0.26, 0.035, 0.013, 0.003),
      materials.silver,
      board,
      0,
      0.055,
      -0.25 + i * 0.038,
    );
  for (let i = 0; i < 6; i++) {
    mesh(
      box(0.08, 0.018, 0.12, 0.003),
      materials.dark,
      board,
      -0.25,
      0.018,
      -0.35 + i * 0.14,
    );
    mesh(
      box(0.028, 0.012, 0.1, 0.003),
      materials.accent,
      board,
      0.28,
      0.016,
      -0.33 + i * 0.135,
    );
  }
  mesh(hull(0.88, 1.78, 0.1), materials.carbon, underside, 0, -0.065, -0.025);
  for (const side of [-1, 1])
    for (const end of [-1, 1]) {
      beam(
        [side * 0.4, -0.08, end * 0.55],
        [side * 0.57, -0.35, end * 0.66],
        0.035,
        0.04,
        materials.dark,
        underside,
      );
      mesh(
        box(0.11, 0.035, 0.14, 0.012),
        materials.carbon,
        underside,
        side * 0.57,
        -0.36,
        end * 0.66,
      );
    }

  // Single gimbal camera; two miniature flush stereo lenses sit above it.
  for (const side of [-1, 1]) {
    mesh(
      box(0.032, 0.18, 0.09, 0.008),
      materials.silver,
      gimbal,
      side * 0.18,
      -0.15,
      0.75,
    );
    const pivot = mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.04, 20),
      materials.dark,
      gimbal,
      side * 0.19,
      -0.22,
      0.76,
    );
    pivot.rotation.z = Math.PI / 2;
  }
  mesh(box(0.32, 0.23, 0.29, 0.035), materials.dark, gimbal, 0, -0.22, 0.83);
  const lenses = [];
  const lens = (radius, x, y, z, parent) => {
    const barrel = mesh(
      new THREE.CylinderGeometry(radius * 1.22, radius * 1.22, 0.055, 32),
      materials.carbon,
      parent,
      x,
      y,
      z,
    );
    barrel.rotation.x = Math.PI / 2;
    const element = mesh(
      new THREE.CylinderGeometry(radius, radius, 0.008, 32),
      materials.lens,
      parent,
      x,
      y,
      z + 0.031,
    );
    element.rotation.x = Math.PI / 2;
    const surround = mesh(
      new THREE.TorusGeometry(radius * 1.04, 0.004, 5, 32),
      materials.silver,
      parent,
      x,
      y,
      z + 0.036,
    );
    lenses.push(element);
    mesh(
      new THREE.SphereGeometry(radius * 0.12, 8, 6),
      materials.cyan,
      parent,
      x - radius * 0.25,
      y + radius * 0.3,
      z + 0.038,
    );
    return surround;
  };
  lens(0.085, 0, -0.22, 1.0, gimbal);
  for (const side of [-1, 1]) {
    mesh(
      box(0.13, 0.085, 0.055, 0.015),
      materials.dark,
      gimbal,
      side * 0.3,
      0.066,
      0.91,
    );
    lens(0.029, side * 0.3, 0.066, 0.946, gimbal);
  }

  const arms = [],
    rotors = [];
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0.035, -0.022);
  bladeShape.bezierCurveTo(0.25, -0.014, 0.58, 0.015, 0.84, 0.075);
  bladeShape.lineTo(0.88, 0.108);
  bladeShape.bezierCurveTo(0.64, 0.15, 0.25, 0.115, 0.035, 0.022);
  bladeShape.closePath();
  const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, {
    depth: 0.01,
    bevelEnabled: true,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.004,
    bevelThickness: 0.003,
  });
  bladeGeo.rotateX(-Math.PI / 2);
  for (const sx of [-1, 1])
    for (const sz of [-1, 1]) {
      const arm = new THREE.Group();
      drone.add(arm);
      const root = [sx * 0.35, 0.025, sz * 0.48];
      const end = [sx * 1.29, 0.075, sz * 1.04];
      mesh(box(0.22, 0.11, 0.25, 0.025), materials.shell, arm, ...root);
      beam(root, end, 0.115, 0.075, materials.carbon, arm);
      beam(
        [sx * 0.44, 0.06, sz * 0.53],
        [sx * 1.16, 0.105, sz * 0.96],
        0.035,
        0.014,
        materials.silver,
        arm,
      );
      mesh(
        new THREE.CylinderGeometry(0.073, 0.073, 0.014, 20),
        materials.accent,
        arm,
        sx * 0.46,
        0.09,
        sz * 0.55,
      );
      mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 0.018, 8),
        materials.dark,
        arm,
        sx * 0.46,
        0.102,
        sz * 0.55,
      );
      mesh(
        new THREE.CylinderGeometry(0.135, 0.12, 0.16, 32),
        materials.dark,
        arm,
        ...end,
      );
      mesh(
        new THREE.CylinderGeometry(0.125, 0.125, 0.018, 32),
        materials.silver,
        arm,
        end[0],
        0.15,
        end[2],
      );
      ring(0.128, 0.006, materials.accent, arm, end[0], 0.128, end[2]);
      const rotor = new THREE.Group();
      rotor.position.set(end[0], 0.185, end[2]);
      arm.add(rotor);
      mesh(
        new THREE.CylinderGeometry(0.045, 0.055, 0.03, 6),
        materials.dark,
        rotor,
      );
      for (const angle of [0, Math.PI]) {
        const blade = mesh(bladeGeo, materials.carbon, rotor);
        blade.rotation.y = angle;
      }
      const sweep = mesh(
        new THREE.RingGeometry(0.13, 0.87, 64),
        new THREE.MeshBasicMaterial({
          color: 0xaccce1,
          transparent: true,
          opacity: 0.022,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
        rotor,
        0,
        -0.005,
        0,
      );
      sweep.rotation.x = -Math.PI / 2;
      arms.push({ group: arm, sx, sz });
      rotors.push(rotor);
    }

  const reticleMaterial = new THREE.MeshBasicMaterial({
    color: 0x82c3eb,
    transparent: true,
    opacity: 0.19,
    depthWrite: false,
  });
  ring(2.09, 0.004, reticleMaterial, drone, 0, -0.48, 0);
  const outer = ring(2.33, 0.002, reticleMaterial, drone, 0, -0.49, 0);
  outer.scale.z = 0.82;
  return {
    drone,
    shell,
    board,
    underside,
    gimbal,
    arms,
    rotors,
    hoverables: [fuselage, topPanel, cap, ...lenses],
  };
}
