import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const clamp = THREE.MathUtils.clamp;
const mix = THREE.MathUtils.lerp;
const ease = (a, b, value) => THREE.MathUtils.smoothstep(value, a, b);

// One WebGL scene lives throughout the five scroll chapters. All geometry and
// lighting are local and procedural; the drone is an illustration, not a Parrot model.
export function createExperience(canvas, state, onReady, onFailure) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    onFailure();
    return () => {};
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 1.3, 10);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.AmbientLight(0xd5f6ff, 1.5));
  const key = new THREE.DirectionalLight(0xffffff, 4.2);
  key.position.set(-3, 5, 5);
  const pinkLight = new THREE.PointLight(0xff298c, 55, 16, 2);
  pinkLight.position.set(2, -1, 3);
  const cyanLight = new THREE.PointLight(0x60efff, 65, 16, 2);
  cyanLight.position.set(-4, 3, -2);
  scene.add(key, pinkLight, cyanLight);

  // A screen-space shader adds slow light refraction behind every chapter.
  const atmosphereMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uChapter: { value: 0 },
    },
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,.999,1.0);}`,
    fragmentShader: `
      uniform float uTime; uniform vec2 uPointer; uniform float uChapter; varying vec2 vUv;
      void main(){
        vec2 p=vUv*2.0-1.0;
        p.x+=sin(p.y*2.5+uTime*.16)*.15;
        float flow=sin(p.x*2.0+p.y*1.8+uTime*.12+uChapter*.6)*.5+.5;
        float ripple=sin(length(p-uPointer*.25)*5.0-uTime*.25)*.5+.5;
        float flutes=pow(sin(vUv.x*360.0+flow*4.0)*.5+.5,8.0);
        vec3 col=mix(vec3(.03,.65,.85),vec3(.96,.08,.5),flow);
        gl_FragColor=vec4(col,(.06+flutes*.08)*ripple);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const atmosphere = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    atmosphereMaterial,
  );
  atmosphere.frustumCulled = false;
  atmosphere.renderOrder = -100;
  scene.add(atmosphere);

  const materials = {
    shell: new THREE.MeshPhysicalMaterial({
      color: 0xe83b99,
      metalness: 0.65,
      roughness: 0.21,
      clearcoat: 1,
      clearcoatRoughness: 0.13,
      iridescence: 0.6,
      iridescenceIOR: 1.4,
    }),
    white: new THREE.MeshPhysicalMaterial({
      color: 0xe1f4f7,
      metalness: 0.62,
      roughness: 0.18,
      clearcoat: 1,
    }),
    dark: new THREE.MeshPhysicalMaterial({
      color: 0x142739,
      metalness: 0.7,
      roughness: 0.25,
      clearcoat: 1,
    }),
    silver: new THREE.MeshStandardMaterial({
      color: 0x809ca9,
      metalness: 0.9,
      roughness: 0.22,
    }),
    cyan: new THREE.MeshStandardMaterial({
      color: 0x3fe2f5,
      emissive: 0x03aabb,
      emissiveIntensity: 1.4,
      metalness: 0.3,
      roughness: 0.16,
    }),
    lens: new THREE.MeshPhysicalMaterial({
      color: 0x052d51,
      metalness: 0.8,
      roughness: 0.05,
      iridescence: 1,
      clearcoat: 1,
    }),
    ghost: new THREE.MeshPhysicalMaterial({
      color: 0xa3faff,
      metalness: 0.15,
      roughness: 0.1,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  };
  const mesh = (geometry, material, parent, x = 0, y = 0, z = 0) => {
    const object = new THREE.Mesh(geometry, material);
    object.position.set(x, y, z);
    parent.add(object);
    return object;
  };
  const rounded = (w, h, d, r = 0.08) => new RoundedBoxGeometry(w, h, d, 3, r);
  const rod = (from, to, radius, material, parent) => {
    const a = new THREE.Vector3(...from),
      b = new THREE.Vector3(...to);
    const object = mesh(
      new THREE.CylinderGeometry(radius, radius, a.distanceTo(b), 16),
      material,
      parent,
    );
    object.position.copy(a).add(b).multiplyScalar(0.5);
    object.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      b.sub(a).normalize(),
    );
    return object;
  };
  const drone = new THREE.Group();
  scene.add(drone);
  const shell = new THREE.Group();
  drone.add(shell);
  const fuselage = mesh(
    new THREE.SphereGeometry(1, 64, 32),
    materials.shell,
    shell,
  );
  fuselage.scale.set(0.7, 0.25, 1.02);
  const canopy = mesh(
    new THREE.SphereGeometry(1, 48, 24),
    materials.white,
    shell,
    0,
    0.115,
    -0.04,
  );
  canopy.scale.set(0.58, 0.21, 0.8);
  const cap = mesh(
    rounded(0.43, 0.07, 0.65),
    materials.dark,
    shell,
    0,
    0.3,
    -0.05,
  );
  for (let i = 0; i < 8; i++)
    mesh(
      rounded(0.29, 0.012, 0.018, 0.004),
      materials.silver,
      shell,
      0,
      0.34,
      -0.3 + i * 0.06,
    );
  for (const side of [-1, 1]) {
    mesh(
      rounded(0.025, 0.035, 0.6, 0.01),
      materials.cyan,
      shell,
      side * 0.57,
      0.14,
      0.03,
    );
    for (const end of [-1, 1]) {
      const screw = mesh(
        new THREE.CylinderGeometry(0.035, 0.035, 0.018, 12),
        materials.dark,
        shell,
        side * 0.42,
        0.22,
        end * 0.5,
      );
      screw.rotation.z = side * 0.2;
    }
  }
  const board = new THREE.Group();
  drone.add(board);
  mesh(rounded(0.85, 0.05, 1.1, 0.03), materials.dark, board);
  mesh(rounded(0.34, 0.065, 0.36, 0.02), materials.silver, board, 0, 0.06, 0);
  for (let i = 0; i < 12; i++) {
    mesh(
      rounded(0.035, 0.018, 0.12, 0.004),
      materials.cyan,
      board,
      -0.35 + i * 0.063,
      0.044,
      0.32,
    );
  }
  const underside = new THREE.Group();
  drone.add(underside);
  const bottom = mesh(
    new THREE.SphereGeometry(1, 48, 24),
    materials.dark,
    underside,
    0,
    -0.15,
    0,
  );
  bottom.scale.set(0.61, 0.2, 0.88);
  for (const side of [-1, 1]) {
    rod(
      [side * 0.4, -0.25, 0.45],
      [side * 0.61, -0.72, 0.5],
      0.037,
      materials.silver,
      underside,
    );
    rod(
      [side * 0.4, -0.25, -0.5],
      [side * 0.61, -0.72, -0.55],
      0.037,
      materials.silver,
      underside,
    );
    const skid = mesh(
      rounded(0.07, 0.065, 1.5, 0.025),
      materials.dark,
      underside,
      side * 0.61,
      -0.74,
      0,
    );
    skid.rotation.x = -0.02;
  }
  const gimbal = new THREE.Group();
  drone.add(gimbal);
  mesh(rounded(0.8, 0.31, 0.34, 0.12), materials.white, gimbal, 0, -0.25, 0.95);
  const lenses = [];
  for (const side of [-1, 1]) {
    const ring = mesh(
      new THREE.CylinderGeometry(0.13, 0.13, 0.12, 32),
      materials.dark,
      gimbal,
      side * 0.23,
      -0.25,
      1.14,
    );
    ring.rotation.x = Math.PI / 2;
    const lens = mesh(
      new THREE.CylinderGeometry(0.095, 0.095, 0.013, 32),
      materials.lens,
      gimbal,
      side * 0.23,
      -0.25,
      1.21,
    );
    lens.rotation.x = Math.PI / 2;
    lenses.push(lens);
    mesh(
      new THREE.SphereGeometry(0.024, 12, 8),
      materials.cyan,
      gimbal,
      side * 0.23 - 0.025,
      -0.21,
      1.22,
    );
  }
  const arms = [],
    rotors = [];
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, -0.04);
  bladeShape.bezierCurveTo(0.28, -0.16, 0.7, -0.12, 0.84, -0.02);
  bladeShape.bezierCurveTo(0.92, 0.03, 0.79, 0.16, 0.65, 0.13);
  bladeShape.lineTo(0, 0.04);
  bladeShape.closePath();
  const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, {
    depth: 0.022,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.012,
    bevelThickness: 0.008,
  });
  bladeGeo.rotateX(-Math.PI / 2);
  for (const sx of [-1, 1])
    for (const sz of [-1, 1]) {
      const arm = new THREE.Group();
      drone.add(arm);
      const end = [sx * 1.34, 0, sz * 1.08];
      rod([sx * 0.38, -0.08, sz * 0.42], end, 0.1, materials.shell, arm);
      rod(
        [sx * 0.4, 0, sz * 0.45],
        [sx * 1.34, 0.08, sz * 1.08],
        0.025,
        materials.silver,
        arm,
      );
      mesh(
        new THREE.CylinderGeometry(0.18, 0.16, 0.23, 28),
        materials.dark,
        arm,
        ...end,
      );
      mesh(
        new THREE.CylinderGeometry(0.16, 0.16, 0.065, 28),
        materials.silver,
        arm,
        end[0],
        0.12,
        end[2],
      );
      const rotor = new THREE.Group();
      rotor.position.set(end[0], 0.2, end[2]);
      arm.add(rotor);
      mesh(
        new THREE.CylinderGeometry(0.08, 0.11, 0.08, 20),
        materials.shell,
        rotor,
      );
      for (const angle of [0, Math.PI]) {
        const blade = mesh(bladeGeo, materials.dark, rotor);
        blade.rotation.y = angle;
      }
      const disk = mesh(
        new THREE.RingGeometry(0.12, 0.84, 48),
        new THREE.MeshBasicMaterial({
          color: 0xc1f8ff,
          transparent: true,
          opacity: 0.055,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
        rotor,
        0,
        0.01,
        0,
      );
      disk.rotation.x = -Math.PI / 2;
      arms.push({ group: arm, sx, sz });
      rotors.push(rotor);
    }

  const halo = mesh(
    new THREE.TorusGeometry(2.28, 0.008, 8, 140),
    new THREE.MeshBasicMaterial({
      color: 0xc2f7ff,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
    }),
    drone,
    0,
    -0.7,
    0,
  );
  halo.rotation.x = Math.PI / 2;
  const halo2 = halo.clone();
  halo2.scale.setScalar(1.22);
  halo2.position.y = -0.8;
  drone.add(halo2);

  // Local shader: iridescent, flowing field. Also becomes the learning core.
  const fieldMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: 1 },
      uPointer: { value: new THREE.Vector2() },
    },
    vertexShader: `
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vView;
      varying vec3 vPos;
      void main(){
        vec3 p = position;
        float wave = sin(p.x*3.5+uTime*.6)*cos(p.y*4.0-uTime*.4)*sin(p.z*3.0+uTime*.3);
        p += normal * wave * .09;
        vNormal=normalize(normalMatrix*normal);
        vec4 mv=modelViewMatrix*vec4(p,1.0);
        vView=-mv.xyz; vPos=p;
        gl_Position=projectionMatrix*mv;
      }`,
    fragmentShader: `
      uniform float uTime;
      uniform float uOpacity;
      uniform vec2 uPointer;
      varying vec3 vNormal;
      varying vec3 vView;
      varying vec3 vPos;
      void main(){
        float fresnel=pow(1.0-abs(dot(normalize(vNormal),normalize(vView))),2.0);
        float band=sin(vPos.y*9.0+vPos.x*4.0+uTime*.6+uPointer.x)*.5+.5;
        vec3 col=mix(vec3(.025,.1,.25),vec3(.91,.045,.38),band);
        col=mix(col,vec3(.3,.95,1.0),fresnel*.9);
        float fine=pow(sin(vPos.y*65.0-uTime*.2)*.5+.5,14.0);
        gl_FragColor=vec4(col+fine*.10,uOpacity);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    transparent: true,
  });

  const spatial = new THREE.Group();
  scene.add(spatial);
  const platform = mesh(
    rounded(3.4, 0.08, 2.65, 0.07),
    materials.ghost,
    spatial,
    0,
    -0.7,
    0,
  );
  const grid = new THREE.GridHelper(3.4, 17, 0xc2ffff, 0x6ce4ef);
  grid.position.y = -0.64;
  grid.material.transparent = true;
  grid.material.opacity = 0.2;
  spatial.add(grid);
  const wallMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x94e9fa,
    transparent: true,
    opacity: 0.22,
    metalness: 0.2,
    roughness: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  mesh(rounded(3.4, 0.85, 0.045, 0.015), wallMaterial, spatial, 0, -0.2, -1.3);
  mesh(rounded(0.045, 0.85, 2.65, 0.015), wallMaterial, spatial, -1.7, -0.2, 0);
  mesh(rounded(0.85, 0.3, 0.45), materials.white, spatial, -0.9, -0.45, -0.65);
  mesh(rounded(0.45, 0.5, 1), materials.shell, spatial, 0.85, -0.4, -0.3);
  const cameras = [];
  const coneMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `varying vec2 vUv;uniform float uTime;void main(){float scan=pow(sin(vUv.y*32.0-uTime)*.5+.5,16.0);gl_FragColor=vec4(.25,.92,1.0,(.025+scan*.15)*pow(vUv.y,1.5));}`,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  for (const side of [-1, 1]) {
    const c = new THREE.Group();
    c.position.set(side * 1.5, 0.55, -1.1);
    mesh(rounded(0.3, 0.19, 0.35, 0.06), materials.white, c);
    const lens = mesh(
      new THREE.CylinderGeometry(0.075, 0.075, 0.035, 24),
      materials.lens,
      c,
      0,
      0,
      0.19,
    );
    lens.rotation.x = Math.PI / 2;
    const cone = mesh(
      new THREE.ConeGeometry(0.85, 1.9, 32, 1, true),
      coneMaterial,
      c,
      0,
      -0.65,
      0.65,
    );
    cone.rotation.x = -0.8;
    cameras.push(c);
    spatial.add(c);
  }
  const tracks = [];
  for (let i = 0; i < 5; i++) {
    const person = new THREE.Group();
    mesh(
      new THREE.CapsuleGeometry(0.06, 0.2, 3, 8),
      i % 2 ? materials.shell : materials.cyan,
      person,
      0,
      -0.38,
      0,
    );
    mesh(
      new THREE.SphereGeometry(0.065, 12, 8),
      materials.white,
      person,
      0,
      -0.17,
      0,
    );
    const ring = mesh(
      new THREE.TorusGeometry(0.14, 0.008, 5, 32),
      materials.cyan,
      person,
      0,
      -0.62,
      0,
    );
    ring.rotation.x = Math.PI / 2;
    spatial.add(person);
    tracks.push(person);
  }

  const learning = new THREE.Group();
  scene.add(learning);
  mesh(new THREE.IcosahedronGeometry(0.95, 5), fieldMaterial, learning);
  const outerMaterial = new THREE.MeshBasicMaterial({
    color: 0xc6faff,
    wireframe: true,
    transparent: true,
    opacity: 0.22,
  });
  const outer = mesh(
    new THREE.IcosahedronGeometry(1.32, 2),
    outerMaterial,
    learning,
  );
  const nodes = new THREE.Group();
  learning.add(nodes);
  const nodeGeo = new THREE.SphereGeometry(0.035, 8, 6);
  const nodeInstances = new THREE.InstancedMesh(nodeGeo, materials.white, 110);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 110; i++) {
    const y = 1 - (i / 109) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = i * Math.PI * (3 - Math.sqrt(5));
    dummy.position.set(
      Math.cos(theta) * radius * 1.55,
      y * 1.55,
      Math.sin(theta) * radius * 1.55,
    );
    dummy.updateMatrix();
    nodeInstances.setMatrixAt(i, dummy.matrix);
  }
  nodes.add(nodeInstances);
  for (let i = 0; i < 3; i++) {
    const orbit = mesh(
      new THREE.TorusGeometry(1.8 + i * 0.12, 0.006, 5, 128),
      new THREE.MeshBasicMaterial({
        color: i === 1 ? 0xff78b9 : 0xa6f5ff,
        transparent: true,
        opacity: 0.42,
      }),
      learning,
    );
    orbit.rotation.set(i * 0.7 + 0.3, i * 1.2, i * 0.35);
  }

  const voice = new THREE.Group();
  scene.add(voice);
  const orb = mesh(
    new THREE.SphereGeometry(0.65, 64, 48),
    fieldMaterial,
    voice,
  );
  const waveGeo = new THREE.CylinderGeometry(0.025, 0.025, 1, 8);
  const wave = new THREE.InstancedMesh(waveGeo, materials.white, 120);
  voice.add(wave);
  const outerRing = mesh(
    new THREE.TorusGeometry(1.86, 0.012, 6, 160),
    materials.shell,
    voice,
  );
  outerRing.rotation.x = 0.2;
  const backRing = mesh(
    new THREE.TorusGeometry(2.02, 0.004, 5, 160),
    new THREE.MeshBasicMaterial({
      color: 0x9cf4ff,
      transparent: true,
      opacity: 0.55,
    }),
    voice,
  );
  backRing.rotation.x = 0.2;

  // Sparse ambient points are batched into one draw call.
  const points = new Float32Array(180 * 3);
  for (let i = 0; i < points.length; i++)
    points[i] = Math.sin(i * 127.1 + 311.7) * (i % 3 === 2 ? 4 : 9);
  const pointGeo = new THREE.BufferGeometry();
  pointGeo.setAttribute("position", new THREE.BufferAttribute(points, 3));
  const pointField = new THREE.Points(
    pointGeo,
    new THREE.PointsMaterial({
      color: 0xd3fbff,
      size: 0.018,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
      depthWrite: false,
    }),
  );
  scene.add(pointField);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(9, 9);
  const hoverables = [fuselage, cap, ...lenses];
  let width = 0,
    height = 0,
    visible = true,
    disposed = false;
  let last = 0,
    elapsed = 0,
    progress = 0,
    explosion = 0,
    lastStaticSignature = "";
  const initialSize = canvas.parentElement.getBoundingClientRect();
  const size = (w, h) => {
    width = w;
    height = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  size(initialSize.width, initialSize.height);
  const resizeObserver = new ResizeObserver((entries) => {
    const { width: w, height: h } = entries[0].contentRect;
    if (w > 0 && h > 0) size(w, h);
  });
  resizeObserver.observe(canvas.parentElement);
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
    },
    { rootMargin: "100px" },
  );
  intersectionObserver.observe(canvas.closest(".journey"));
  const contextLost = (event) => {
    event.preventDefault();
    onFailure();
    renderer.setAnimationLoop(null);
  };
  canvas.addEventListener("webglcontextlost", contextLost);

  function animate(time) {
    if (disposed) return;
    const dt = Math.min((time - last) / 1000 || 0, 0.05);
    last = time;
    if (!visible || document.hidden) return;
    const motion = !state.current.reduced;
    if (!motion) {
      const signature = `${state.current.progress.toFixed(4)}/${state.current.exploded}/${state.current.xray}/${width}/${height}`;
      if (signature === lastStaticSignature) return;
      lastStaticSignature = signature;
    } else lastStaticSignature = "";
    if (motion) elapsed += dt;
    const t = elapsed;
    const target = state.current.progress;
    progress = motion ? mix(progress, target, 1 - Math.exp(-dt * 9)) : target;
    const mobile = width < 760;
    const px = motion ? state.current.pointer.x : 0;
    const py = motion ? state.current.pointer.y : 0;
    camera.position.x = px * 0.15;
    camera.position.y = 1.3 - py * 0.1;
    camera.lookAt(0, 0, 0);
    fieldMaterial.uniforms.uTime.value = t;
    fieldMaterial.uniforms.uPointer.value.set(px, py);
    coneMaterial.uniforms.uTime.value = t;
    atmosphereMaterial.uniforms.uTime.value = t;
    atmosphereMaterial.uniforms.uPointer.value.set(px, py);
    atmosphereMaterial.uniforms.uChapter.value = progress;
    pointField.rotation.y = t * 0.015;
    const unit = mobile ? 0.48 : Math.min(1.26, camera.aspect / 1.35);
    const shift = mobile ? 0 : 1.65;
    const targetPos = mobile ? [0, 1.1, 0] : [shift, 0.12, 0];
    drone.position.set(...targetPos);
    drone.position.y += Math.sin(t * 0.65) * (motion ? 0.055 : 0);
    drone.rotation.set(
      0.25 + py * 0.06,
      -0.48 + px * 0.13 + Math.sin(t * 0.16) * 0.06,
      -0.13 - px * 0.03,
    );
    drone.scale.setScalar(unit * (1 - ease(1.3, 1.95, progress)));
    drone.visible = progress < 1.95;
    const explosionTarget =
      progress < 0.3
        ? 0
        : state.current.exploded === null
          ? ease(0.55, 1.1, progress)
          : state.current.exploded
            ? 1
            : 0;
    explosion = motion
      ? mix(explosion, explosionTarget, 1 - Math.exp(-dt * 7))
      : explosionTarget;
    const explode = explosion;
    shell.position.y = explode * 0.95;
    underside.position.y = -explode * 0.4;
    board.position.y = explode * 0.15;
    gimbal.position.set(0, -explode * 0.5, explode * 0.5);
    for (const { group, sx, sz } of arms)
      group.position.set(
        explode * sx * 0.25,
        -explode * 0.15,
        explode * sz * 0.2,
      );
    for (let i = 0; i < rotors.length; i++)
      rotors[i].rotation.y = t * (motion ? 14 : 0) * (i % 2 ? -1 : 1) + i;
    materials.shell.transparent = state.current.xray;
    materials.shell.opacity = state.current.xray ? 0.2 : 1;
    materials.white.transparent = state.current.xray;
    materials.white.opacity = state.current.xray ? 0.3 : 1;
    const spatialScale =
      ease(1.3, 2, progress) * (1 - ease(2.4, 2.95, progress));
    spatial.visible = spatialScale > 0.002;
    spatial.scale.setScalar(unit * spatialScale * 1.1);
    spatial.position.set(mobile ? 0 : shift + 0.15, mobile ? 1.1 : -0.05, 0);
    spatial.rotation.set(0.23 + py * 0.06, -0.5 + px * 0.16, 0);
    for (let i = 0; i < tracks.length; i++)
      tracks[i].position.set(
        Math.sin(t * 0.17 + i * 2.3) * 1.1,
        0,
        Math.cos(t * 0.13 + i * 1.7) * 0.75,
      );
    const learningScale =
      ease(2.4, 3, progress) * (1 - ease(3.4, 3.95, progress));
    learning.visible = learningScale > 0.002;
    learning.scale.setScalar(unit * learningScale);
    learning.position.set(mobile ? 0 : shift, mobile ? 1.1 : 0.1, 0);
    learning.rotation.set(py * 0.06, t * 0.09 + px * 0.2, -0.2);
    outer.rotation.y = -t * 0.04;
    nodes.rotation.z = t * 0.04;
    const voiceScale = ease(3.4, 4, progress);
    voice.visible = voiceScale > 0.002;
    voice.scale.setScalar(unit * voiceScale);
    voice.position.set(mobile ? 0 : shift, mobile ? 1.1 : 0.1, 0);
    voice.rotation.set(-0.08 + py * 0.12, px * 0.14, -0.15);
    orb.rotation.y = t * 0.09;
    for (let i = 0; i < 120; i++) {
      const angle = (i / 120) * Math.PI * 2;
      const amplitude =
        0.12 +
        Math.pow(Math.sin(angle * 4.5 + t * 1.4), 2) *
          (0.12 + Math.pow(Math.sin(angle * 2 - t * 0.6), 2) * 0.6);
      dummy.position.set(Math.cos(angle) * 1.42, Math.sin(angle) * 1.42, 0);
      dummy.rotation.set(0, 0, angle - Math.PI / 2);
      dummy.scale.set(1, amplitude, 1);
      dummy.updateMatrix();
      wave.setMatrixAt(i, dummy.matrix);
    }
    wave.instanceMatrix.needsUpdate = true;
    pointer.set(state.current.pointer.x, state.current.pointer.y);
    raycaster.setFromCamera(pointer, camera);
    const hovered =
      motion &&
      drone.visible &&
      raycaster.intersectObjects(hoverables, false).length > 0;
    materials.shell.emissive.setHex(hovered ? 0x6b133f : 0x000000);
    materials.shell.emissiveIntensity = 0.35;
    renderer.render(scene, camera);
  }
  try {
    renderer.compile(scene, camera);
    renderer.setAnimationLoop(animate);
    onReady();
  } catch {
    onFailure();
  }
  return () => {
    disposed = true;
    renderer.setAnimationLoop(null);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    canvas.removeEventListener("webglcontextlost", contextLost);
    const geometries = new Set(),
      allMaterials = new Set();
    scene.traverse((object) => {
      if (object.geometry) geometries.add(object.geometry);
      if (object.material)
        (Array.isArray(object.material)
          ? object.material
          : [object.material]
        ).forEach((m) => allMaterials.add(m));
    });
    geometries.forEach((g) => g.dispose());
    allMaterials.forEach((m) => m.dispose());
    environment.dispose();
    renderer.dispose();
  };
}
