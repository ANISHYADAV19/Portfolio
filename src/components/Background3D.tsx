import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Background3DProps {
  activeSection: string;
  scrollProgress: number;
}

export default function Background3D({ activeSection, scrollProgress }: Background3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetCamPosRef = useRef({ x: 0, y: 0, z: 22, rotX: 0, rotY: 0, rotZ: 0 });
  const targetColorRef = useRef(new THREE.Color(0x3b82f6)); // Default cyber blue

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.02);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 22);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050505, 1);
    container.appendChild(renderer.domElement);

    // Scene Root Group (for drag rotation)
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0x3b82f6, 3.5, 120);
    mainLight.position.set(12, 12, 18);
    scene.add(mainLight);

    const accentLight = new THREE.PointLight(0x8b5cf6, 3, 100);
    accentLight.position.set(-18, -12, -10);
    scene.add(accentLight);

    // 1. Cyber Terrain Grid Mesh
    const terrainGeo = new THREE.PlaneGeometry(80, 80, 48, 48);
    terrainGeo.rotateX(-Math.PI / 2.5); // Tilt to form landscape floor
    terrainGeo.translate(0, -14, -10);

    const terrainPosAttr = terrainGeo.attributes.position as THREE.BufferAttribute;
    const originalTerrainPos = terrainPosAttr.array.slice() as Float32Array;

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      roughness: 0.2,
      metalness: 0.8
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    worldGroup.add(terrainMesh);

    // 2. Interactive Particle Constellation System
    const particleCount = 220;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3); // Current physics velocity

    const color1 = new THREE.Color(0x3b82f6); // Cyber blue
    const color2 = new THREE.Color(0x8b5cf6); // Cyber purple

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 65;
      const y = (Math.random() - 0.5) * 65;
      const z = (Math.random() - 0.5) * 55;

      const i3 = i * 3;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      const mixRatio = Math.random();
      const pColor = color1.clone().lerp(color2, mixRatio);
      colors[i3] = pColor.r;
      colors[i3 + 1] = pColor.g;
      colors[i3 + 2] = pColor.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom glowing particle canvas texture
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.4, "rgba(255, 255, 255, 0.5)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.95,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    worldGroup.add(particleSystem);

    // 3. Dynamic Connecting Line Network
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    worldGroup.add(lineMesh);

    // 4. Floating 3D Wireframe Objects
    const shapesGroup = new THREE.Group();
    worldGroup.add(shapesGroup);

    // Shape A: Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(3.6, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.38
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(13, 4, -5);
    shapesGroup.add(icoMesh);

    // Inner glowing core
    const coreGeo = new THREE.SphereGeometry(1.6, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    icoMesh.add(coreMesh);

    // Orbital Wireframe Ring
    const ringGeo = new THREE.TorusGeometry(8, 0.06, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.28
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    icoMesh.add(ringMesh);

    // Shape B: Wireframe Torus Knot
    const torusGeo = new THREE.TorusKnotGeometry(2.3, 0.6, 64, 16);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      roughness: 0.1,
      transparent: true,
      opacity: 0.32
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(-15, -6, -8);
    shapesGroup.add(torusMesh);

    // Shape C: Wireframe Dodecahedron
    const dodecGeo = new THREE.DodecahedronGeometry(2.8, 0);
    const dodecMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.38
    });
    const dodecMesh = new THREE.Mesh(dodecGeo, dodecMat);
    dodecMesh.position.set(-11, 9, -12);
    shapesGroup.add(dodecMesh);

    // Interactive Raycaster & Mouse tracking
    const raycaster = new THREE.Raycaster();
    const mouse2D = new THREE.Vector2(-999, -999);
    const mouse3D = new THREE.Vector3(0, 0, 0);

    // Drag Orbit Control parameters
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragRotationVel = { x: 0, y: 0 };
    let currentWorldRotation = { x: 0, y: 0 };

    // Click Shockwaves list
    const shockwaves: { x: number; y: number; z: number; radius: number; maxRadius: number; force: number }[] = [];

    const getMouseWorldPos = (clientX: number, clientY: number) => {
      mouse2D.x = (clientX / window.innerWidth) * 2 - 1;
      mouse2D.y = -(clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse2D, camera);
      // Project ray onto a plane at z=0
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const targetPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeZ, targetPoint);
      return targetPoint;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const worldPos = getMouseWorldPos(e.clientX, e.clientY);
      mouse3D.copy(worldPos);

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        dragRotationVel.y += deltaX * 0.0008;
        dragRotationVel.x += deltaY * 0.0008;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Ignore clicks on buttons / interactive HTML controls if target is not canvas or body
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button, a, input, [role='button']")) {
        return;
      }

      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button, a, input, [role='button']")) {
        return;
      }

      const worldPos = getMouseWorldPos(e.clientX, e.clientY);
      // Trigger a 3D Shockwave impulse
      shockwaves.push({
        x: worldPos.x,
        y: worldPos.y,
        z: worldPos.z,
        radius: 0.5,
        maxRadius: 18,
        force: 0.8
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("click", handleClick);

    // Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Camera lerp based on section target
      const targetCam = targetCamPosRef.current;
      const targetX = targetCam.x + mouse2D.x * 2;
      const targetY = targetCam.y + mouse2D.y * 2;
      const targetZ = targetCam.z;

      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.position.z += (targetZ - camera.position.z) * 0.04;

      camera.rotation.x += (targetCam.rotX - camera.rotation.x) * 0.04;
      camera.rotation.y += (targetCam.rotY - camera.rotation.y) * 0.04;
      camera.rotation.z += (targetCam.rotZ - camera.rotation.z) * 0.04;

      // Apply drag inertia rotation to worldGroup
      currentWorldRotation.x += dragRotationVel.x;
      currentWorldRotation.y += dragRotationVel.y;
      dragRotationVel.x *= 0.92; // Friction damping
      dragRotationVel.y *= 0.92;

      worldGroup.rotation.x = currentWorldRotation.x;
      worldGroup.rotation.y = currentWorldRotation.y + elapsedTime * 0.02; // Slow default ambient spin

      // Lerp Light Colors & Material Theme Colors
      mainLight.color.lerp(targetColorRef.current, 0.03);
      terrainMat.color.lerp(targetColorRef.current, 0.03);
      lineMaterial.color.lerp(targetColorRef.current, 0.03);
      icoMat.color.lerp(targetColorRef.current, 0.03);
      coreMat.color.lerp(targetColorRef.current, 0.03);

      // Rotate 3D Polyhedra
      icoMesh.rotation.x = elapsedTime * 0.25;
      icoMesh.rotation.y = elapsedTime * 0.35;

      torusMesh.rotation.x = elapsedTime * 0.3;
      torusMesh.rotation.z = elapsedTime * 0.2;

      dodecMesh.rotation.y = elapsedTime * 0.4;
      dodecMesh.rotation.x = elapsedTime * 0.15;

      ringMesh.rotation.z = elapsedTime * 0.5;

      // Update Shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 0.45;
        sw.force *= 0.94;
        if (sw.radius > sw.maxRadius || sw.force < 0.01) {
          shockwaves.splice(s, 1);
        }
      }

      // 1. Update Terrain Cyber Wave Heights
      const tPosArr = terrainPosAttr.array as Float32Array;
      for (let i = 0; i < tPosArr.length; i += 3) {
        const ox = originalTerrainPos[i];
        const oz = originalTerrainPos[i + 2];
        // Sine wave terrain mesh calculation
        const wave = Math.sin(ox * 0.2 + elapsedTime * 1.5) * Math.cos(oz * 0.2 + elapsedTime * 1.2) * 1.4;
        tPosArr[i + 1] = originalTerrainPos[i + 1] + wave;
      }
      terrainPosAttr.needsUpdate = true;

      // 2. Update Particle Constellation Physics (Mouse Repulsion + Shockwaves + Spring Restoring)
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      let lineVertexIdx = 0;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        let px = posArray[i3];
        let py = posArray[i3 + 1];
        let pz = posArray[i3 + 2];

        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        // A. Cursor Proximity Force (Repulsion within distance 9)
        const dxMouse = px - mouse3D.x;
        const dyMouse = py - mouse3D.y;
        const dzMouse = pz - mouse3D.z;
        const distSqMouse = dxMouse * dxMouse + dyMouse * dyMouse + dzMouse * dzMouse;

        if (distSqMouse < 81 && distSqMouse > 0.01) {
          const distMouse = Math.sqrt(distSqMouse);
          const force = (9 - distMouse) / 9 * 0.08;
          velocities[i3] += (dxMouse / distMouse) * force;
          velocities[i3 + 1] += (dyMouse / distMouse) * force;
          velocities[i3 + 2] += (dzMouse / distMouse) * force;
        }

        // B. Shockwave Impulses
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const dxSw = px - sw.x;
          const dySw = py - sw.y;
          const dzSw = pz - sw.z;
          const distSw = Math.sqrt(dxSw * dxSw + dySw * dySw + dzSw * dzSw);

          if (Math.abs(distSw - sw.radius) < 3.5 && distSw > 0.1) {
            const push = sw.force * (1 - Math.abs(distSw - sw.radius) / 3.5) * 0.35;
            velocities[i3] += (dxSw / distSw) * push;
            velocities[i3 + 1] += (dySw / distSw) * push;
            velocities[i3 + 2] += (dzSw / distSw) * push;
          }
        }

        // C. Apply Velocities with Spring Restoration to Original Position
        px += velocities[i3];
        py += velocities[i3 + 1];
        pz += velocities[i3 + 2];

        // Restoring spring acceleration back towards original home position
        velocities[i3] += (ox - px) * 0.008;
        velocities[i3 + 1] += (oy - py) * 0.008;
        velocities[i3 + 2] += (oz - pz) * 0.008;

        // Velocity damping (friction)
        velocities[i3] *= 0.94;
        velocities[i3 + 1] *= 0.94;
        velocities[i3 + 2] *= 0.94;

        posArray[i3] = px;
        posArray[i3 + 1] = py;
        posArray[i3 + 2] = pz;

        // D. Connect nearby particles into constellation lines
        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const dx = px - posArray[j3];
          const dy = py - posArray[j3 + 1];
          const dz = pz - posArray[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 52) { // Connected within distance ~7.2
            linePositions[lineVertexIdx++] = px;
            linePositions[lineVertexIdx++] = py;
            linePositions[lineVertexIdx++] = pz;

            linePositions[lineVertexIdx++] = posArray[j3];
            linePositions[lineVertexIdx++] = posArray[j3 + 1];
            linePositions[lineVertexIdx++] = posArray[j3 + 2];
          }
        }
      }

      posAttr.needsUpdate = true;

      // Update Constellation Lines Geometry
      lineGeometry.setDrawRange(0, lineVertexIdx / 3);
      (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      dodecGeo.dispose();
      dodecMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  // Section-driven camera targets
  useEffect(() => {
    switch (activeSection) {
      case "hero":
        targetCamPosRef.current = { x: 0, y: 0, z: 22, rotX: 0, rotY: 0, rotZ: 0 };
        targetColorRef.current.setHex(0x3b82f6); // Cyber blue
        break;
      case "skills":
        targetCamPosRef.current = { x: -8, y: -4, z: 18, rotX: 0.1, rotY: -0.2, rotZ: 0 };
        targetColorRef.current.setHex(0x8b5cf6); // Cyber purple
        break;
      case "projects":
        targetCamPosRef.current = { x: 10, y: 5, z: 20, rotX: -0.15, rotY: 0.25, rotZ: 0.05 };
        targetColorRef.current.setHex(0x10b981); // Cyber emerald green
        break;
      case "certifications":
        targetCamPosRef.current = { x: -6, y: 6, z: 19, rotX: 0.2, rotY: -0.15, rotZ: -0.05 };
        targetColorRef.current.setHex(0x06b6d4); // Cyber cyan
        break;
      case "education":
        targetCamPosRef.current = { x: 8, y: -6, z: 21, rotX: -0.1, rotY: 0.18, rotZ: 0 };
        targetColorRef.current.setHex(0x3b82f6); // Cyber blue
        break;
      case "contact":
        targetCamPosRef.current = { x: 0, y: -2, z: 16, rotX: 0.25, rotY: 0, rotZ: 0 };
        targetColorRef.current.setHex(0x8b5cf6); // Cyber purple
        break;
      default:
        targetCamPosRef.current = { x: 0, y: 0, z: 22, rotX: 0, rotY: 0, rotZ: 0 };
        targetColorRef.current.setHex(0x3b82f6);
        break;
    }
  }, [activeSection, scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-75"
    />
  );
}
