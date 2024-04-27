import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;

async function load(url) {
  return await (await fetch(url)).text();
}
const sun = new THREE.Vector3(0, 0, 1000);

(async () => {
  const sunobj = new THREE.Mesh(
    new THREE.SphereGeometry(50, 50, 50),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("./img/sun.jpg"),
    })
  );
  sunobj.position.set(sun.x, sun.y, sun.z);

  const sunatmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(50, 50, 50),
    new THREE.ShaderMaterial({
      fragmentShader: await load("./shaders/sun/sunatmosphere.frag"),
      vertexShader: await load("./shaders/sun/sunatmosphere.vert"),
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );

  sunatmosphere.scale.set(1.2, 1.2, 1.2);
  sunatmosphere.position.set(sun.x, sun.y, sun.z);

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 50, 50),
    new THREE.ShaderMaterial({
      fragmentShader: await load("./shaders/moon/moon.frag"),
      vertexShader: await load("./shaders/moon/moon.vert"),
      uniforms: {
        tex: {
          value: new THREE.TextureLoader().load("./img/moon.jpg"),
        },
        loc: {
          value: new THREE.Vector3(0, 0, 0),
        },
        sun: {
          value: sun,
        },
      },
    })
  );
  moon.position.set(10, 0, 0);

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3, 50, 50),
    new THREE.ShaderMaterial({
      fragmentShader: await load("./shaders/earth/earth.frag"),
      vertexShader: await load("./shaders/earth/earth.vert"),
      uniforms: {
        tex: {
          value: new THREE.TextureLoader().load("./img/earth.jpg"),
        },
        loc: {
          value: new THREE.Vector3(0, 0, 0),
        },
        sun: {
          value: sun,
        },
      },
    })
  );

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(3, 50, 50),
    new THREE.ShaderMaterial({
      fragmentShader: await load("./shaders/earth/atmosphere.frag"),
      vertexShader: await load("./shaders/earth/atmosphere.vert"),
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  atmosphere.scale.set(1.2, 1.2, 1.2);

  const group = new THREE.Group();
  group.add(earth);
  group.add(moon);
  group.add(atmosphere);
  scene.add(group);
  scene.add(sunobj);
  scene.add(sunatmosphere);
  camera.position.set(0, 0, 30);

  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.0;

  function loop() {
    let time = Date.now();

    moon.getWorldPosition(moon.material.uniforms.loc.value);
    group.rotation.y = time / 1000;

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }

  loop();
})();
