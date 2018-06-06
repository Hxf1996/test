const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
camera.position.set(0, 0, 4);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// var width = window.innerWidth / 2;
// var height = window.innerHeight / 2;

// camera = new THREE.PerspectiveCamera( 75, width / height, 1, 10000 );
// camera.position.z = 500;

// const texture = new THREE.TextureLoader().load('./test.jpg');
// var geometry = new THREE.BoxGeometry(1, 1, 1);

// const cube = new THREE.Mesh(
//     geometry,
//     new THREE.MeshBasicMaterial({
//         map: texture,
//     }),
// );
// cube.rotateX(Math.PI / 8);

// cube.rotateOnWorldAxis(new THREE.Vector3(1, 1, 1), 1);
// scene.add(cube);

var geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( [
	-1.0, 0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,

	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0, 0,  1.0
] );
geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
geometry.scale(-1, 1, 1);
var mesh = new THREE.Mesh( geometry, material );
scene.add(mesh);

// var material = new THREE.MeshStandardMaterial( { color : 0x00cc00  } );

// //create a triangular geometry
// var geometry = new THREE.Geometry();
// geometry.vertices.push( new THREE.Vector3( -1, -1, 0 ) );
// geometry.vertices.push( new THREE.Vector3(  1, -1, 0 ) );
// geometry.vertices.push( new THREE.Vector3(  1,  1, 0 ) );

// //create a new face using vertices 0, 1, 2
// var normal = new THREE.Vector3( 0, 1, 0 ); //optional
// var color = new THREE.Color( 0xffaa00 ); //optional
// var materialIndex = 0; //optional
// var face = new THREE.Face3( 0, 1, 2, normal, color, materialIndex );

// //add the face to the geometry's faces array
// geometry.faces.push( face );

// //the face normals and vertex normals can be calculated automatically if not supplied above
// geometry.computeFaceNormals();
// geometry.computeVertexNormals();

// scene.add( new THREE.Mesh( geometry, material ) );

// var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
// scene.add( light );

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(0, 0);

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene, camera);
document.body.appendChild( renderer.domElement );

function render() {

	// update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( scene.children );

	for ( var i = 0; i < intersects.length; i++ ) {
		intersects[ i ].object.material.color.set( Math.floor(Math.random() * 0xFFFFFF) );
    }
    const arr = [];
    // cube.raycast(new THREE.Raycaster(new THREE.Vector3(4, 0, 0), new THREE.Vector3(-1, 0, 0), 0, Infinity), arr);
    // console.log(arr);

    renderer.render( scene, camera );
    requestAnimationFrame(render);

}

window.addEventListener( 'mousemove', onMouseMove, false );

window.requestAnimationFrame(render);

// function animate() {

//     requestAnimationFrame( animate );

// 	renderer.render( scene, camera );

// }

// animate();
