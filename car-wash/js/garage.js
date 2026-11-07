/* Diya Auto Spa · 3D "garage" view of the chosen vehicle (turntable, studio lights, RS DEMO plates).
   Bodies are built from the same side profiles as the flat drawings, extruded and bevelled. */
import * as THREE from './three.module.min.js';
import { SVGLoader } from './SVGLoader.js';
import { RoomEnvironment } from './RoomEnvironment.js';

const S = 0.01;                       // drawing px -> metres-ish
const svgShapes = d => new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`).paths.flatMap(p => SVGLoader.createShapes(p));

// ---------- vehicles (side profiles in the 640 × 250 drawing space) ----------
const V = {
  car: { color: 0xB3221D, ground: 238, w: 190, cabinW: 150,
    lower: 'M58 186 C50 172 48 156 54 146 C58 134 66 124 80 118 L150 108 L474 104 L566 116 C590 120 606 128 612 142 C618 156 618 172 612 186 L556 192 A56 56 0 0 0 440 192 L210 192 A56 56 0 0 0 94 192 Z',
    cabin: 'M150 110 C170 96 196 76 222 66 C258 54 300 50 344 50 C372 50 394 54 412 62 C432 72 452 88 474 106 Z',
    pillars: [[322, 54, 108]], roof: [[236, 60], [270, 53], [344, 50], [400, 57]],
    wheels: [[152, 192, 46], [498, 192, 46]], head: [596, 128], tail: [62, 130], plateF: [612, 166], plateR: [56, 166] },
  suv: { color: 0xD5DCE2, ground: 246, w: 200, cabinW: 172,
    lower: 'M62 198 C54 182 50 150 52 126 L54 106 L470 104 L580 110 C600 113 610 122 614 136 C618 152 618 176 614 194 L556 200 A60 60 0 0 0 436 200 L214 200 A60 60 0 0 0 94 200 Z',
    cabin: 'M56 108 C58 84 64 68 76 60 C86 52 100 48 120 46 L400 44 C418 44 430 50 444 62 L478 106 Z',
    pillars: [[156, 48, 106], [298, 46, 106]], roof: [[90, 52], [120, 46], [400, 44], [430, 52]], rails: [118, 388, 38],
    wheels: [[152, 196, 50], [496, 196, 50]], head: [600, 124], tail: [56, 126], plateF: [614, 170], plateR: [54, 170] },
  cab: { color: 0x22282E, ground: 244, w: 200, cabinW: 176,
    lower: 'M50 196 L48 116 L228 114 L232 106 L474 104 L584 114 C602 116 612 124 615 138 C618 154 618 176 614 192 L560 198 A60 60 0 0 0 440 198 L210 198 A60 60 0 0 0 90 198 Z',
    cabin: 'M232 108 C234 86 240 70 250 62 C258 55 268 52 282 52 L392 50 C410 50 420 56 432 66 L474 106 Z',
    pillars: [[344, 52, 106]], roof: [[256, 58], [282, 52], [392, 50], [420, 58]], bed: [56, 222, 116],
    wheels: [[150, 194, 50], [500, 194, 50]], head: [600, 126], tail: [52, 134], plateF: [614, 170], plateR: [50, 170] },
  tuk: { color: 0x8C1F2A, ground: 246, w: 132, tuk: true,
    lower: 'M176 210 L176 144 C176 132 184 126 196 126 L334 120 L404 112 C442 108 470 116 484 134 C494 148 496 172 494 210 Z',
    canopy: 'M184 132 C178 82 190 44 226 36 L436 30 C458 30 468 40 468 58 L468 64 L240 68 C216 70 208 92 210 132 Z',
    wheels: [[229, 215, 31, 'rear'], [454, 215, 31, 'front']], head: [490, 150], tail: [178, 152], plateR: [174, 186] },
  bike: { color: 0x1F6FB8, ground: 242, bike: true,
    parts: [
      ['M298 132 C304 106 338 96 378 96 C410 98 430 108 436 122 L420 140 L308 146 C298 146 296 140 298 132 Z', 34, 'paint'],
      ['M204 124 C232 116 270 116 304 122 L306 140 L216 142 C202 142 196 132 204 124 Z', 30, 'seat'],
      ['M150 132 C170 118 196 116 214 120 L218 142 C192 148 166 148 150 142 Z', 24, 'paint'],
      ['M438 84 L476 96 L470 128 L444 120 Z', 28, 'paint'],
      ['M290 142 L380 136 C390 136 396 144 394 156 L374 196 L302 196 C292 196 286 188 286 178 Z', 30, 'engine']],
    tubes: [[190, 196, 304, 176, 7, 'dark', 0], [444, 96, 384, 146, 6, 'dark', 0], [444, 92, 472, 196, 5, 'chrome', 9], [444, 92, 472, 196, 5, 'chrome', -9], [336, 192, 172, 166, 6, 'chrome', 16], [424, 80, 424, 80, 4, 'dark', 0]],
    wheels: [[190, 196, 46], [472, 196, 46]], head: [468, 108], tail: [146, 136], plateR: [150, 158] }
};

export function createGarage(host, onReady) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(28, 2, 0.1, 100);

  // lights for crisp highlights on top of the studio reflections
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(4, 7, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x6fe3ff, 1.6); rim.position.set(-6, 3, -5); scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xcfeffb, 0x0a1a26, 0.6));

  // turntable
  const table = new THREE.Group(); scene.add(table);
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(3.3, 3.4, 0.12, 96), new THREE.MeshStandardMaterial({ color: 0x0b1822, metalness: 0.45, roughness: 0.42, envMapIntensity: 0.6 }));
  disc.position.y = -0.06; table.add(disc);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(3.32, 0.025, 8, 160), new THREE.MeshBasicMaterial({ color: 0x19c3e6 }));
  ring.rotation.x = Math.PI / 2; ring.position.y = 0.005; table.add(ring);
  for (let i = 0; i < 24; i++) {        // little floor lights around the edge
    const d = new THREE.Mesh(new THREE.CircleGeometry(0.035, 12), new THREE.MeshBasicMaterial({ color: i % 2 ? 0xffd23f : 0xbdeffa }));
    const a = i / 24 * Math.PI * 2; d.position.set(Math.cos(a) * 3.08, 0.002, Math.sin(a) * 3.08); d.rotation.x = -Math.PI / 2; table.add(d);
  }
  // soft contact shadow
  const sc = document.createElement('canvas'); sc.width = sc.height = 128; const sg = sc.getContext('2d');
  const gr = sg.createRadialGradient(64, 64, 4, 64, 64, 64); gr.addColorStop(0, 'rgba(0,0,0,.75)'); gr.addColorStop(.6, 'rgba(0,0,0,.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  sg.fillStyle = gr; sg.fillRect(0, 0, 128, 128);
  const shadowMat = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false });
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), shadowMat); shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.006; table.add(shadow);

  // materials
  const M = {
    glass: new THREE.MeshPhysicalMaterial({ color: 0x04080b, metalness: 0, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 0.9, side: THREE.DoubleSide }),
    tyre: new THREE.MeshStandardMaterial({ color: 0x15181b, roughness: 0.85 }),
    chrome: new THREE.MeshStandardMaterial({ color: 0xdfe6ea, metalness: 1, roughness: 0.12 }),
    rim: new THREE.MeshStandardMaterial({ color: 0xc7d0d6, metalness: 0.9, roughness: 0.22 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x1c2126, metalness: 0.3, roughness: 0.6, side: THREE.DoubleSide }),
    seat: new THREE.MeshStandardMaterial({ color: 0x14171a, roughness: 0.7, side: THREE.DoubleSide }),
    engine: new THREE.MeshStandardMaterial({ color: 0x77828a, metalness: 0.8, roughness: 0.35, side: THREE.DoubleSide }),
    canopy: new THREE.MeshPhysicalMaterial({ color: 0x15181b, roughness: 0.55, clearcoat: 0.3, side: THREE.DoubleSide }),
    head: new THREE.MeshStandardMaterial({ color: 0xfff6d8, emissive: 0xfff1c4, emissiveIntensity: 1.6 }),
    tail: new THREE.MeshStandardMaterial({ color: 0xff3b30, emissive: 0xff2a1f, emissiveIntensity: 1.4 }),
    caliper: new THREE.MeshStandardMaterial({ color: 0xc8352e, roughness: 0.4 })
  };
  const plateTex = (() => {
    const c = document.createElement('canvas'); c.width = 512; c.height = 128; const g = c.getContext('2d');
    g.fillStyle = '#F4F4EE'; g.fillRect(0, 0, 512, 128); g.lineWidth = 10; g.strokeStyle = '#111'; g.strokeRect(8, 8, 496, 112);
    g.fillStyle = '#111'; g.font = '800 86px "Barlow Condensed","Arial Narrow",Arial,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('RS DEMO', 256, 68);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
  })();
  const plateMat = new THREE.MeshStandardMaterial({ map: plateTex, roughness: 0.4, metalness: 0.1 });

  const X = (x) => (x - 320) * S, Y = (y, cfg) => (cfg.ground - y) * S;
  function extrude(d, depth, mat, cfg, bevel = 8) {
    const geo = new THREE.ExtrudeGeometry(svgShapes(d), { depth: depth - 2 * bevel, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel * 0.55, bevelSegments: 5, curveSegments: 28 });
    geo.translate(-320, -cfg.ground, -(depth - 2 * bevel) / 2); geo.scale(S, -S, S); geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, mat); return m;
  }
  function box(w, h, d, mat) { return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); }
  function tube(x1, y1, x2, y2, r, mat, cfg, z = 0) {
    const a = new THREE.Vector3(X(x1), Y(y1, cfg), z * S), b = new THREE.Vector3(X(x2), Y(y2, cfg), z * S);
    const len = Math.max(a.distanceTo(b), 0.01);
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r * S, r * S, len, 16), mat);
    m.position.copy(a).add(b).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()); return m;
  }
  function wheel(r, width) {
    const g = new THREE.Group(); const R = r * S, W = width * S;
    const tyre = new THREE.Mesh(new THREE.CylinderGeometry(R, R, W, 48, 1), M.tyre); tyre.rotation.x = Math.PI / 2; g.add(tyre);
    const side = new THREE.Mesh(new THREE.TorusGeometry(R * 0.86, R * 0.14, 12, 48), M.tyre); side.position.z = W / 2 - R * .06; g.add(side);
    const side2 = side.clone(); side2.position.z = -side.position.z; g.add(side2);
    const rimF = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.68, R * 0.68, W * 1.02, 40), M.rim); rimF.rotation.x = Math.PI / 2; g.add(rimF);
    const face = new THREE.Group(); face.position.z = W * 0.52; g.add(face);
    const well = new THREE.Mesh(new THREE.CircleGeometry(R * 0.62, 40), M.dark); well.position.z = 0.002; face.add(well);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(R * 0.44, 32), M.engine); disc.position.z = 0.004; face.add(disc);
    const cal = box(R * 0.22, R * 0.34, 0.02, M.caliper); cal.position.set(R * 0.1, R * 0.4, 0.008); cal.rotation.z = -0.3; face.add(cal);
    for (let i = 0; i < 5; i++) {
      const sp = box(R * 0.13, R * 0.62, 0.03, M.chrome); const a = i / 5 * Math.PI * 2;
      sp.position.set(Math.sin(a) * R * 0.33, Math.cos(a) * R * 0.33, 0.02); sp.rotation.z = -a; face.add(sp);
    }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.14, R * 0.14, 0.05, 20), M.chrome); hub.rotation.x = Math.PI / 2; hub.position.z = 0.03; face.add(hub);
    const lip = new THREE.Mesh(new THREE.TorusGeometry(R * 0.66, R * 0.035, 8, 48), M.chrome); lip.position.z = 0.012; face.add(lip);
    return g;
  }
  // x (drawing px) of the outer skin at height y, front or rear, including the bevel bulge
  function edge(cfg, y, front, bev) {
    const pts = svgShapes(cfg.lower)[0].getPoints(80); let best = front ? -1e9 : 1e9;
    for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length];
      if ((a.y - y) * (b.y - y) <= 0 && a.y !== b.y) { const x = a.x + (b.x - a.x) * (y - a.y) / (b.y - a.y); best = front ? Math.max(best, x) : Math.min(best, x); } }
    return best + (front ? bev : -bev);
  }
  function faceItem(w, h, mat, cfg, x, y, z, front, depth = 0.04) {
    const m = box(depth, h, w, mat); m.position.set(X(x) + (front ? depth / 2 - 0.012 : -depth / 2 + 0.012), Y(y, cfg), z); return m;
  }
  function plate(at, front, cfg, z = 0) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(0.66, 0.17), plateMat);
    p.position.set(X(at[0]) + (front ? 0.012 : -0.012), Y(at[1], cfg), z); p.rotation.y = front ? Math.PI / 2 : -Math.PI / 2; return p;
  }
  function light(at, mat, cfg, w, h, z, front) {
    const l = box(0.03, h, w, mat); l.position.set(X(at[0]) + (front ? -0.01 : 0.01), Y(at[1], cfg), z); return l;
  }

  function build(id) {
    const cfg = V[id], g = new THREE.Group();
    const paint = new THREE.MeshPhysicalMaterial({ color: cfg.color, metalness: 0.6, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.03, envMapIntensity: 1.4, side: THREE.DoubleSide });
    if (cfg.bike) {
      for (const [d, w, m] of cfg.parts) g.add(extrude(d, w, m === 'paint' ? paint : M[m], cfg, 5));
      for (const [x1, y1, x2, y2, r, m, z] of cfg.tubes) if (x1 !== x2) g.add(tube(x1, y1, x2, y2, r, M[m], cfg, z));
      const bar = tube(424, 80, 424, 80, 4, M.dark, cfg); bar.geometry = new THREE.CylinderGeometry(0.035, 0.035, 0.62, 12); bar.rotation.set(Math.PI / 2, 0, 0); bar.position.set(X(426), Y(82, cfg), 0); g.add(bar);
      for (const [x, y, r] of cfg.wheels) { const w = wheel(r, 16); w.position.set(X(x), Y(y, cfg), 0); g.add(w); }
      const hl = new THREE.Mesh(new THREE.CircleGeometry(0.075, 24), M.head); hl.position.set(X(cfg.head[0]) + 0.05, Y(cfg.head[1], cfg), 0); hl.rotation.y = Math.PI / 2; g.add(hl);
      g.add(light(cfg.tail, M.tail, cfg, 0.12, 0.05, 0, false));
      const pl = plate(cfg.plateR, false, cfg); pl.scale.setScalar(0.55); g.add(pl);
      g.scale.setScalar(1.35); g.userData = { len: 5.6, wid: 1.2 }; return g;
    }
    const W = cfg.w;
    g.add(extrude(cfg.lower, W, paint, cfg, cfg.tuk ? 10 : 22));
    if (cfg.tuk) {
      g.add(extrude(cfg.canopy, W + 6, M.canopy, cfg, 6));
      const ws = box(0.03, 0.56, (W - 10) * S, M.glass); ws.position.set(X(470), Y(92, cfg), 0); ws.rotation.z = -0.2; g.add(ws);
      const seat = box(1.0, 0.36, (W - 24) * S, M.seat); seat.position.set(X(262), Y(106, cfg), 0); g.add(seat);
      const bar = tube(222, 90, 330, 88, 2.5, M.chrome, cfg, W / 2 - 6); g.add(bar); g.add(tube(222, 90, 330, 88, 2.5, M.chrome, cfg, -(W / 2 - 6)));
      for (const [x, y, r, k] of cfg.wheels) {
        const zs = k === 'front' ? [0] : [-(W / 2 - 8) * S, (W / 2 - 8) * S];
        for (const z of zs) { const w = wheel(r, 22); w.position.set(X(x), Y(y, cfg), z); if (z < 0) w.rotation.y = Math.PI; g.add(w); }
      }
      const guard = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.05, 8, 24, Math.PI), M.dark); guard.position.set(X(454), Y(215, cfg), 0); g.add(guard);
      const hl = new THREE.Mesh(new THREE.CircleGeometry(0.1, 24), M.head); hl.position.set(X(edge(cfg, cfg.head[1], true, 5.5)) + 0.015, Y(cfg.head[1], cfg), 0); hl.rotation.y = Math.PI / 2; g.add(hl);
      for (const z of [-1, 1]) g.add(faceItem(0.1, 0.18, M.tail, cfg, edge(cfg, cfg.tail[1], false, 5.5), cfg.tail[1], z * (W / 2 - 14) * S, false));
      g.add(plate([edge(cfg, cfg.plateR[1], false, 5.5), cfg.plateR[1]], false, cfg));
      g.userData = { len: 3.4, wid: 1.6 }; return g;
    }
    // cabin (glass), roof skin, pillars
    g.add(extrude(cfg.cabin, cfg.cabinW, M.glass, cfg, 12));
    const rp = cfg.roof.map(([x, y]) => new THREE.Vector3(X(x), Y(y, cfg) + 0.045, 0));
    const curve = new THREE.CatmullRomCurve3(rp);
    for (let i = 0; i < 24; i++) {             // roof panel as thin slats following the roof line
      const a = curve.getPoint(i / 24), b = curve.getPoint((i + 1) / 24), len = a.distanceTo(b);
      const slat = box(len + 0.012, 0.08, (cfg.cabinW - 6) * S, paint); slat.position.copy(a).add(b).multiplyScalar(.5);
      slat.rotation.z = Math.atan2(b.y - a.y, b.x - a.x); g.add(slat);
    }
    for (const [x, y1, y2] of cfg.pillars) { const p = box(0.07, (y2 - y1) * S, (cfg.cabinW + 2) * S, paint); p.position.set(X(x), Y((y1 + y2) / 2, cfg), 0); g.add(p); }
    if (cfg.rails) { for (const z of [-1, 1]) { const r = tube(cfg.rails[0], cfg.rails[2], cfg.rails[1], cfg.rails[2], 3, M.dark, cfg, z * (cfg.cabinW / 2 - 14)); g.add(r); } }
    if (cfg.bed) { const b = box((cfg.bed[1] - cfg.bed[0]) * S, 0.04, (W - 30) * S, M.dark); b.position.set(X((cfg.bed[0] + cfg.bed[1]) / 2), Y(cfg.bed[2], cfg) + 0.01, 0); g.add(b); }
    // wheels
    for (const [x, y, r] of cfg.wheels) for (const z of [-1, 1]) {
      const w = wheel(r, 30); w.position.set(X(x), Y(y, cfg), z * (W / 2 - 16) * S); if (z < 0) w.rotation.y = Math.PI; g.add(w);
    }
    // front: headlights, grille, plate, intake · rear: tail lights, plate
    const bev = 22 * 0.55, yh = cfg.head[1] + 10, yt = cfg.tail[1] + 10;
    const fx = y => edge(cfg, y, true, bev), rx = y => edge(cfg, y, false, bev);
    for (const z of [-1, 1]) {
      g.add(faceItem(0.36, 0.1, M.head, cfg, fx(yh), yh, z * (W / 2 - 40) * S, true, 0.05));
      g.add(faceItem(0.34, 0.15, M.tail, cfg, rx(yt), yt, z * (W / 2 - 36) * S, false, 0.05));
      const mir = box(0.12, 0.08, 0.16, paint); mir.position.set(X(452), Y(104, cfg), z * (cfg.cabinW / 2 + 6) * S); g.add(mir);
    }
    const yg = yh + 4;
    g.add(faceItem((W - 132) * S, 0.12, M.dark, cfg, fx(yg), yg, 0, true, 0.05));
    g.add(faceItem((W - 132) * S, 0.018, M.chrome, cfg, fx(yg - 7) + 1, yg - 7, 0, true, 0.06));
    g.add(faceItem((W - 80) * S, 0.06, M.dark, cfg, fx(184), 184, 0, true, 0.04));
    const pf = plate([fx(cfg.plateF[1]), cfg.plateF[1]], true, cfg), pr = plate([rx(cfg.plateR[1]), cfg.plateR[1]], false, cfg);
    g.add(pf); g.add(pr);
    g.userData = { len: 5.8, wid: W * S + 0.3 }; return g;
  }

  const cache = {}; let cur = null, curId = null, t0 = performance.now(), swapAt = 0, spin = 0.35, drag = null, vel = 0, visible = true;
  function set(id) {
    if (id === curId) return; curId = id;
    if (!cache[id]) cache[id] = build(id);
    if (cur) table.remove(cur);
    cur = cache[id]; table.add(cur); swapAt = performance.now();
    const u = cur.userData; shadow.scale.set(u.len * 1.08, u.wid * 1.5, 1);
  }
  function size() {
    const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    const far = w < 520 ? 12.4 : 10.8;
    camera.position.set(far * 0.62, far * 0.24, far * 0.75); camera.lookAt(0, 0.6, 0); camera.updateProjectionMatrix();
  }
  addEventListener('resize', size); size();
  // drag to turn
  const el = renderer.domElement; el.style.touchAction = 'pan-y';
  el.addEventListener('pointerdown', e => { drag = { x: e.clientX, r: table.rotation.y }; vel = 0; el.setPointerCapture(e.pointerId); });
  el.addEventListener('pointermove', e => { if (!drag) return; const dx = e.clientX - drag.x; const nr = drag.r + dx * 0.012; vel = nr - table.rotation.y; table.rotation.y = nr; });
  el.addEventListener('pointerup', () => { drag = null; });
  el.addEventListener('pointercancel', () => { drag = null; });
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(host);
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let last = performance.now();
  table.rotation.y = -0.55;
  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!visible || !cur) return;
    if (!drag) { if (Math.abs(vel) > 0.0005) { table.rotation.y += vel; vel *= 0.92; } else if (!RM) table.rotation.y += spin * dt; }
    // new vehicle drops onto the turntable
    const k = Math.min(1, (now - swapAt) / 520), e = 1 - Math.pow(1 - k, 3);
    cur.position.y = (1 - e) * 0.9 * (RM ? 0 : 1); cur.scale.setScalar(0.92 + 0.08 * e);
    ring.material.color.setHSL(0.53, 0.8, 0.5 + 0.08 * Math.sin(now / 400));
    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
  onReady && onReady();
  return { set, pose(a) { table.rotation.y = a; spin = 0; vel = 0; } };
}
