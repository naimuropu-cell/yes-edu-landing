/**
 * YES EDU - 3D Campus Scene Engine (Senior UI/UX Light Mode Edition)
 * Built with Three.js (WebGL) + Canvas Fallback
 * Renders an ultra-clean architectural 3D campus in bright daylight lighting
 * with emerald glass facades, golden dome, biometric scanner beam, and interactive mouse tilt.
 */

(function () {
  const container = document.getElementById('hero3dCanvasContainer');
  const canvas = document.getElementById('hero3dCanvas');

  if (!container || !canvas) return;

  if (typeof THREE === 'undefined') {
    initCanvasFallback(canvas);
    return;
  }

  try {
    initThreeScene(container, canvas);
  } catch (err) {
    console.warn('Three.js init error, falling back to 2D canvas', err);
    initCanvasFallback(canvas);
  }

  function initThreeScene(container, canvas) {
    const scene = new THREE.Scene();
    
    // Camera Setup (Isometric Perspective)
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 1000);
    camera.position.set(24, 19, 28);
    camera.lookAt(0, 2.5, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Daylight Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0xf8fafc, 1.4);
    scene.add(ambientLight);

    // Warm Sun Directional Light
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.set(25, 35, 25);
    scene.add(sunLight);

    // Soft Emerald Fill Light
    const fillLight = new THREE.DirectionalLight(0xa7f3d0, 1.0);
    fillLight.position.set(-20, 15, -15);
    scene.add(fillLight);

    // Dome Point Light
    const goldGlow = new THREE.PointLight(0xf59e0b, 1.8, 25);
    goldGlow.position.set(0, 12, 0);
    scene.add(goldGlow);

    // Campus Root Group for Mouse Tilt
    const campusGroup = new THREE.Group();
    scene.add(campusGroup);

    // 1. Clean Architectural Base Pedestal
    const baseGeo = new THREE.CylinderGeometry(13, 14, 1.0, 8);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.5;
    campusGroup.add(baseMesh);

    // Base Emerald Accent Rim
    const rimGeo = new THREE.CylinderGeometry(13.1, 14.1, 0.2, 8);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      roughness: 0.3,
      metalness: 0.2
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.y = 0;
    campusGroup.add(rimMesh);

    // 2. Main Porcelain White Academic Complex
    const buildingMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.25,
      metalness: 0.15
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.82,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0
    });

    // Central Academic Tower
    const towerGeo = new THREE.BoxGeometry(6, 10, 6);
    const tower = new THREE.Mesh(towerGeo, buildingMat);
    tower.position.set(0, 5, 0);
    campusGroup.add(tower);

    // Glass Window Bands
    const windowGeo = new THREE.BoxGeometry(6.2, 7.8, 5.2);
    const windowMesh = new THREE.Mesh(windowGeo, glassMat);
    windowMesh.position.set(0, 5, 0);
    campusGroup.add(windowMesh);

    // Left Wing (Library & Science Block)
    const wing1Geo = new THREE.BoxGeometry(4.8, 6.2, 4.2);
    const wing1 = new THREE.Mesh(wing1Geo, buildingMat);
    wing1.position.set(-6.2, 3.1, 1);
    campusGroup.add(wing1);

    const wing1GlassGeo = new THREE.BoxGeometry(5.0, 4.5, 3.4);
    const wing1Glass = new THREE.Mesh(wing1GlassGeo, glassMat);
    wing1Glass.position.set(-6.2, 3.1, 1);
    campusGroup.add(wing1Glass);

    // Right Wing (Madrasa Hostel & Admin)
    const wing2Geo = new THREE.BoxGeometry(4.8, 7.2, 4.2);
    const wing2 = new THREE.Mesh(wing2Geo, buildingMat);
    wing2.position.set(5.8, 3.6, -1.8);
    campusGroup.add(wing2);

    const wing2GlassGeo = new THREE.BoxGeometry(5.0, 5.5, 3.4);
    const wing2Glass = new THREE.Mesh(wing2GlassGeo, glassMat);
    wing2Glass.position.set(5.8, 3.6, -1.8);
    campusGroup.add(wing2Glass);

    // Architectural Gold Dome on Roof
    const domeGeo = new THREE.ConeGeometry(2.6, 3.8, 12);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.2
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.set(0, 11.9, 0);
    campusGroup.add(dome);

    // 3. Biometric Security Gate at Entrance
    const gatePillarGeo = new THREE.BoxGeometry(0.8, 3.6, 0.8);
    const gatePillarMat = new THREE.MeshStandardMaterial({ color: 0x059669 });
    
    const gate1 = new THREE.Mesh(gatePillarGeo, gatePillarMat);
    gate1.position.set(-2, 1.8, 7);
    campusGroup.add(gate1);

    const gate2 = new THREE.Mesh(gatePillarGeo, gatePillarMat);
    gate2.position.set(2, 1.8, 7);
    campusGroup.add(gate2);

    const gateBarGeo = new THREE.BoxGeometry(4.8, 0.4, 0.8);
    const gateBar = new THREE.Mesh(gateBarGeo, gatePillarMat);
    gateBar.position.set(0, 3.6, 7);
    campusGroup.add(gateBar);

    // Biometric Laser Scanner Beam (Glowing Emerald)
    const laserGeo = new THREE.PlaneGeometry(3.8, 0.2);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95
    });
    const laserMesh = new THREE.Mesh(laserGeo, laserMat);
    laserMesh.position.set(0, 1.8, 7);
    campusGroup.add(laserMesh);

    // 4. Orbiting Rings (Subtle Clean Modern Tech)
    const ringGeo1 = new THREE.TorusGeometry(10.5, 0.06, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x059669,
      transparent: true,
      opacity: 0.5
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.3;
    campusGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(12.5, 0.05, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.4
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2.8;
    ring2.rotation.y = Math.PI / 4;
    campusGroup.add(ring2);

    // 5. Floating Data Particles
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 24;
      positions[i + 1] = Math.random() * 16 + 1;
      positions[i + 2] = (Math.random() - 0.5) * 24;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x059669,
      size: 0.5,
      transparent: true,
      opacity: 0.75
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    campusGroup.add(particleSystem);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.7;
      mouseY = y * 0.4;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });

    container.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        mouseX = ((touch.clientX - rect.left) / rect.width - 0.5) * 0.7;
        mouseY = ((touch.clientY - rect.top) / rect.height - 0.5) * 0.4;
      }
    }, { passive: true });

    // Animation Loop
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth Rotation & Tilt
      campusGroup.rotation.y += 0.0025;
      targetRotationY = mouseX * 0.7;
      targetRotationX = mouseY * 0.4;

      campusGroup.rotation.y += (targetRotationY - (campusGroup.rotation.y % (Math.PI * 2))) * 0.05;
      campusGroup.rotation.x += (targetRotationX - campusGroup.rotation.x) * 0.05;

      // Rings spin
      ring1.rotation.z = elapsed * 0.25;
      ring2.rotation.z = -elapsed * 0.18;

      // Laser scan
      laserMesh.position.y = 1.8 + Math.sin(elapsed * 3.5) * 1.2;

      // Floating particles
      const posAttr = particleGeo.attributes.position;
      for (let i = 1; i < particleCount * 3; i += 3) {
        posAttr.array[i] += Math.sin(elapsed + i) * 0.012;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  // 2D Light Mode Fallback
  function initCanvasFallback(canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = container.clientWidth;
    let height = canvas.height = container.clientHeight;

    const nodes = [];
    for (let i = 0; i < 35; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        radius: Math.random() * 3 + 2,
        color: i % 2 === 0 ? '#059669' : '#0284c7'
      });
    }

    function renderFallback() {
      ctx.clearRect(0, 0, width, height);

      // Soft Grid
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.4)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 36) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Connecting lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.strokeStyle = `rgba(5, 150, 105, ${0.25 * (1 - dist / 90)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(renderFallback);
    }

    renderFallback();

    window.addEventListener('resize', () => {
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    });
  }
})();
