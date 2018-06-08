var camera, scene, renderer, stats;
var cube;
const num = 1000;

function init() {
    scene = new THREE.Scene();

    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(aspect * num / -2, aspect * num / 2, num / 2, num / -2, 1, 2000);
    camera.position.set(0, 400, 300);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // let gridHelper = new THREE.GridHelper( num, 20 );
    // scene.add( gridHelper );

    let axesHelper = new THREE.AxesHelper( 2000 );
    scene.add( axesHelper );

    // let texture = new THREE.TextureLoader().load('./assets/test.jpg');
    // let geometry = new THREE.BoxGeometry(100, 100, 100);
    // cube = new THREE.Mesh(
    //     geometry,
    //     new THREE.MeshLambertMaterial({
    //         map: texture,
    //     }),
    // );
    // scene.add(cube);

    // var geometry = new THREE.BoxGeometry( 100, 100, 100, 2, 2, 2 );
    // var materials = [
    //     new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } ),
    //     new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: 0.5 } ),
    //     new THREE.MeshBasicMaterial( { color: 0x123456, overdraw: 0.5 } ),
    //     new THREE.MeshBasicMaterial( { color: 0x123456, overdraw: 0.5 } ),
    //     new THREE.MeshBasicMaterial( { color: 0x123456, overdraw: 0.5 } ),
    //     new THREE.MeshBasicMaterial( { color: 0x123456, overdraw: 0.5 } )
    // ];
    // var mesh = new THREE.Mesh( geometry, materials );
    // scene.add(mesh);

    var spriteMaterial = new THREE.SpriteMaterial( {
        color: 0x123123,
    });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(20, 20, 1);
    scene.add(sprite);

    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add( light );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    document.addEventListener( 'mousedown', onMouseDown, false );
    window.addEventListener('resize', onWindowResize, false);
}

function render() {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.02;
    renderer.render( scene, camera );
}

function animate() {
    requestAnimationFrame(animate);

    stats.begin();
    render();
    stats.end();
}

function onWindowResize() {
    var aspect = window.innerWidth / window.innerHeight;
    camera.left   = - num * aspect / 2;
    camera.right  =   num * aspect / 2;
    camera.top    =   num / 2;
    camera.bottom = - num / 2;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseDown(event) {
    clickX = event.clientX;
    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'mouseup', onMouseUp, false );
}

function onMouseUp(event) {
    document.removeEventListener( 'mousemove', onMouseMove, false );
    document.removeEventListener( 'mouseup', onMouseUp, false );
}

function onMouseMove( event ) {
    mouseX = (event.clientX - clickX) /  (window.innerWidth / 2);
    camera.position.applyEuler(new THREE.Euler(0, 0.1, 0, 'XYZ'));
    camera.lookAt(0, 0, 0);
}

init();
animate();
