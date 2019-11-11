var persp_camera, ortog_camera //cameras
var scene, active_camera
var pedestal, icosahedron, painting
var spotlights = []
var directional_light

let current_time_offset, prev_time, curr_time

function render() {
    renderer.render(scene, active_camera);
}

var dice
function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(5))
    scene.background = new THREE.Color(0xe4edf5)

    let board = new Board(0,0,0,5)
    let ball = new Ball(-15, 0, 0, 0, 4, 0)
    dice = new Dice(0,3.7,0, 3)

    let light_focus = new THREE.Object3D()
    light_focus.position.set(-1,0,0)
    scene.add(light_focus)

    directional_light = new THREE.DirectionalLight("white", 1)
    directional_light.target = light_focus
    scene.add(directional_light)
    scene.add(board)
    scene.add(ball)
    scene.add(dice)
}

function traverseElements(obj) {
    if (obj instanceof SceneObject)
        obj.update(current_time_offset/40)
    if (obj !== undefined)
        for (i in obj.children)
            traverseElements(obj.children[i])
  }


function update() {
    prev_time = curr_time
    curr_time = performance.now()
    current_time_offset = prev_time === undefined ? 1 : curr_time - prev_time

    traverseElements(scene)
}

function createCameras() {
    active_camera = new THREE.PerspectiveCamera(60, window.outerWidth / window.outerHeight, 1, 1000);
    active_camera.position.set(15,20,40)
    active_camera.lookAt(0,0,0)
}