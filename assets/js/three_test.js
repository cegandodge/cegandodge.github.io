import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js"

/*
Add a three.js animation to each div with class render-area.
*/

const app = new THREE.Scene();
const cameras = []
const renderers = []
const render_areas = document.getElementsByClassName("render-area")

//instantiate renderers, etc., add to each .render-area component
for(let i=0;i<render_areas.length;i++){
    const area_item = render_areas.item(i)
    const area_width = area_item.clientWidth
    const area_height = area_item.clientHeight
    
    const camera = new THREE.PerspectiveCamera( 75, area_width / area_height, 0.1, 1000)
    camera.position.z = 20;
    cameras.push(camera)

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(area_width, area_height)
    renderers.push(renderer)
    area_item.appendChild(renderer.domElement)
    area_item.children[0].classList.add("canvas-area")
}

//create animation
var geometry = new THREE.BoxGeometry( 4, 4, 4);
var material = new THREE.MeshBasicMaterial( { color: "rgb(7,105,196)" } );
var cube = new THREE.Mesh( geometry, material );
app.add( cube );

//update animations frames
var animate = function () {
    requestAnimationFrame( animate );
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    for(let i=0;i<render_areas.length;i++){
        renderers[i].render( app, cameras[i] );
    }
};

animate();