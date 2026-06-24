import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Atom {
  element: string;
  position: [number, number, number];
  color: number;
  radius: number;
}

interface Bond {
  start: number;
  end: number;
}

const CPK_COLORS: Record<string, { color: number; radius: number }> = {
  H: { color: 0xffffff, radius: 0.35 },
  C: { color: 0x444444, radius: 0.65 },
  O: { color: 0xff1111, radius: 0.55 },
  N: { color: 0x1f51ff, radius: 0.6 },
  S: { color: 0xffcc00, radius: 0.7 },
  P: { color: 0xff7700, radius: 0.75 },
  Cl: { color: 0x22ff22, radius: 0.8 },
  F: { color: 0x00ffcc, radius: 0.5 },
  Br: { color: 0x8b0000, radius: 0.85 },
  I: { color: 0x9400d3, radius: 0.95 },
  Na: { color: 0x9932cc, radius: 0.85 },
  K: { color: 0x8a2be2, radius: 0.95 },
  Fe: { color: 0xe06633, radius: 0.85 },
  Al: { color: 0xbfa6a6, radius: 0.85 },
  Zn: { color: 0x7d80b0, radius: 0.85 },
};

function generateProceduralStructure(formula: string): { atoms: Atom[]; bonds: Bond[] } {
  // Deterministic RNG based on formula
  let seed = 0;
  for (let i = 0; i < formula.length; i++) {
    seed = formula.charCodeAt(i) + ((seed << 5) - seed);
  }
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  // Extract elements and counts
  const regex = /([A-Z][a-z]*)([0-9]*)/g;
  let match;
  const atomList: string[] = [];
  
  while ((match = regex.exec(formula)) !== null) {
      const element = match[1];
      const countStr = match[2];
      let count = countStr ? parseInt(countStr) : 1;
      // Cap at 25 per element type to prevent unrenderable blobs
      if (count > 25) count = 25; 
      
      for(let i=0; i<count; i++) {
          atomList.push(element);
      }
  }
  
  if (atomList.length === 0) {
      atomList.push("C", "O", "H", "H", "H", "C"); // Generic fallback
  }

  // Cap total atoms
  const atomsToUse = atomList.slice(0, 50);
  
  // Sort atoms: larger/central atoms (metals, C, S) first, then O/N, H last
  atomsToUse.sort((a, b) => {
      const weight = (e: string) => e === 'H' ? 2 : (e === 'O' || e === 'N' || e === 'F' || e === 'Cl') ? 1 : 0;
      return weight(a) - weight(b);
  });
  
  const atoms: Atom[] = [];
  const bonds: Bond[] = [];
  const placedPositions: THREE.Vector3[] = [];
  
  // Initial sparse placement
  for (let i = 0; i < atomsToUse.length; i++) {
      const el = atomsToUse[i];
      const cpk = CPK_COLORS[el] || { color: 0x888888, radius: 0.6 };
      
      let pos = new THREE.Vector3(0, 0, 0);
      let bondTo = -1;
      
      if (i > 0) {
          // Connect to an existing atom
          bondTo = Math.floor(random() * Math.min(i, 6)); // bias connecting to core atoms
          
          const parentPos = placedPositions[bondTo];
          const bondLength = 2.5; // Wider initial spacing
          
          const phi = Math.acos(2 * random() - 1);
          const theta = 2 * Math.PI * random();
          
          pos.copy(parentPos).add(new THREE.Vector3(
              bondLength * Math.sin(phi) * Math.cos(theta),
              bondLength * Math.sin(phi) * Math.sin(theta),
              bondLength * Math.cos(phi)
          ));
      }
      
      placedPositions.push(pos);
      atoms.push({
          element: el,
          position: [0, 0, 0],
          color: cpk.color,
          radius: cpk.radius
      });
      
      if (bondTo !== -1) {
          bonds.push({ start: bondTo, end: i });
      }
      
      // Potential cross bonds for complex structures
      if (i > 4 && random() > 0.85) {
         const extraBondTo = Math.floor(random() * (i - 1));
         if (extraBondTo !== bondTo) {
             bonds.push({ start: extraBondTo, end: i });
         }
      }
  }

  // VSEPR Physics Relaxation Step (Organic Spacing)
  for (let step = 0; step < 120; step++) {
      for(let i=0; i<atoms.length; i++) {
           for(let j=i+1; j<atoms.length; j++) {
               const p1 = placedPositions[i];
               const p2 = placedPositions[j];
               
               // add tiny jitter to prevent exact 0 distance locking
               if (p1.distanceToSquared(p2) < 0.001) {
                   p2.add(new THREE.Vector3((random()-0.5)*0.1, (random()-0.5)*0.1, (random()-0.5)*0.1));
               }

               const dist = p1.distanceTo(p2);
               const isBonded = bonds.some(b => (b.start === i && b.end === j) || (b.start === j && b.end === i));
               
               // Calculate ideal target distance
               const rI = atoms[i].radius;
               const rJ = atoms[j].radius;
               const minRadiusSum = rI + rJ;
               // Spread atoms significantly wider
               const targetDist = isBonded ? minRadiusSum * 1.5 : minRadiusSum * 2.8;

               // Spring forces
               if (dist < targetDist) {
                   const force = (targetDist - dist) * 0.4; // push apart harder
                   const dir = new THREE.Vector3().subVectors(p1, p2).normalize().multiplyScalar(force);
                   p1.add(dir);
                   p2.sub(dir);
               } else if (isBonded && dist > targetDist) {
                   const force = (dist - targetDist) * 0.2; // pull together
                   const dir = new THREE.Vector3().subVectors(p2, p1).normalize().multiplyScalar(force);
                   p1.add(dir);
                   p2.sub(dir);
               }
           }
      }
  }
  
  // Center structure and copy positions back
  if (placedPositions.length > 0) {
    let centerX = 0, centerY = 0, centerZ = 0;
    for (const pos of placedPositions) {
        centerX += pos.x; centerY += pos.y; centerZ += pos.z;
    }
    centerX /= placedPositions.length;
    centerY /= placedPositions.length;
    centerZ /= placedPositions.length;
    
    atoms.forEach((a, i) => {
        const p = placedPositions[i];
        a.position = [p.x - centerX, p.y - centerY, p.z - centerZ];
    });
  }

  return { atoms, bonds };
}

interface Molecule3DProps {
  chemicalFormula: string;
  className?: string;
}

export const Molecule3D: React.FC<Molecule3DProps> = ({
  chemicalFormula,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000); // Tighter FOV for premium macro look
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Crisp rendering
    renderer.setClearColor(0xffffff, 0); // Transparent background
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // Cinematic color tones
    renderer.toneMappingExposure = 1.1;

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(10, 15, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe4eafc, 0.8);
    fillLight.position.set(-10, 5, -10);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 1.2, 0);
    rimLight.position.set(0, 10, -15);
    scene.add(rimLight);

    // Normalize formula correctly
    let normalized = chemicalFormula;
    if (!normalized || normalized === "—") {
      normalized = "CompoundC4";
    }
    normalized = normalized
      .replace(/₀/g, "0").replace(/₁/g, "1").replace(/₂/g, "2")
      .replace(/₃/g, "3").replace(/₄/g, "4").replace(/₅/g, "5")
      .replace(/₆/g, "6").replace(/₇/g, "7").replace(/₈/g, "8")
      .replace(/₉/g, "9");

    // Produce procedural structure
    const structure = generateProceduralStructure(normalized);

    // Molecule group container
    const moleculeGroup = new THREE.Group();

    // Render atoms with premium PhysicalMaterial but visually scale down spheres
    structure.atoms.forEach((atom) => {
      const geometry = new THREE.SphereGeometry(atom.radius * 0.65, 64, 64);
      
      const material = new THREE.MeshPhysicalMaterial({
        color: atom.color,
        roughness: 0.15,
        metalness: 0.1,
        clearcoat: 1.0,           // Shiny glass/plastic wrapper
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...atom.position);
      moleculeGroup.add(mesh);
    });

    // Render bonds with shiny metallic physical material, scaled down
    structure.bonds.forEach((bond) => {
      const start = new THREE.Vector3(...structure.atoms[bond.start].position);
      const end = new THREE.Vector3(...structure.atoms[bond.end].position);

      const direction = new THREE.Vector3().subVectors(end, start);
      const length = direction.length();

      const geometry = new THREE.CylinderGeometry(0.12, 0.12, length, 32);
      const material = new THREE.MeshPhysicalMaterial({ 
          color: 0xdddddd, 
          roughness: 0.2, 
          metalness: 0.5,
          clearcoat: 0.8 
      });
      const cylinder = new THREE.Mesh(geometry, material);

      const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

      cylinder.position.copy(midpoint);
      cylinder.lookAt(end);
      cylinder.rotateX(Math.PI / 2);

      moleculeGroup.add(cylinder);
    });

    // Compute bounding sphere to frame the camera accurately
    const box = new THREE.Box3().setFromObject(moleculeGroup);
    const center = box.getCenter(new THREE.Vector3());
    moleculeGroup.position.sub(center); // Ensure absolute perfect visual center
    
    scene.add(moleculeGroup);

    // Dynamic Camera Distance
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    // Distance from camera so that the sphere fits inside the FOV
    const fov = camera.fov * (Math.PI / 180);
    let distance = Math.abs(sphere.radius / Math.sin(fov / 2));
    distance *= 1.3; // add padding
    camera.position.z = Math.max(6, distance);

    // Optional tilt so it doesn't look flat
    moleculeGroup.rotation.x = Math.PI * 0.15;
    moleculeGroup.rotation.y = Math.PI * 0.1;

    // Smooth animation loop
    let animationId: number;
    let time = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.005;

      // Rotate with a slight organic bob
      moleculeGroup.rotation.x += 0.0015;
      moleculeGroup.rotation.y += 0.0025;
      moleculeGroup.position.y = Math.sin(time) * 0.15; // smooth hovering effect

      renderer.render(scene, camera);
    };

    animate();
    sceneRef.current = scene;

    // Responsive design handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      
      // Memory cleanup
      moleculeGroup.children.forEach(child => {
        if ((child as THREE.Mesh).geometry) {
           (child as THREE.Mesh).geometry.dispose();
        }
        if ((child as THREE.Mesh).material) {
           const m = (child as THREE.Mesh).material;
           if (Array.isArray(m)) m.forEach(mat => mat.dispose());
           else m.dispose();
        }
      });
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [chemicalFormula]);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
};
