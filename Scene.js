var persp_camera, ortog_camera //cameras
var scene, active_camera
var pedestal, icosahedron, painting
var spotlights = []

var directional_light

function render() {
    renderer.render(scene, active_camera);
}

function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(5))
    scene.background = new THREE.Color(0xe4edf5)

    let board = new Board(0,0,0,5)

    scene.add(board)
}

function traverseElements(obj) {
    if (obj instanceof THREE.Mesh)
        obj.material.wireframe = wireframe
    if (obj !== undefined)
        for (i in obj.children)
            traverseElements(obj.children[i])
  }


function update() {

}

function createCameras() {
    active_camera = new THREE.PerspectiveCamera(60, window.outerWidth / window.outerHeight, 1, 1000);
    active_camera.position.set(35,30,20)
    active_camera.lookAt(0,10,0)
}