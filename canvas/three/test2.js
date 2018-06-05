const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
camera.position.set(4, 3, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));


const texture = new THREE.TextureLoader().load('./test.jpg');

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture,
    }),
);
scene.add(cube);

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene, camera);
document.body.appendChild( renderer.domElement );

function animate() {

    requestAnimationFrame( animate );

	renderer.render( scene, camera );

}

animate();
