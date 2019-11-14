var persp_camera, ortog_camera //cameras
var scene, active_camera
var pedestal, icosahedron, painting
var spotlights = []
var directional_light, point_light, directional_int, point_int
var board
let current_time_offset, prev_time, curr_time

function render() {
    renderer.render(scene, active_camera);
}

var dice
function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(30))
    scene.background = new THREE.Color(0xe4edf5)

    board = new Board(0,0,0,42)
    let ball = new Ball(-15, 0, 0, 0, 4, 0)
    dice = new Dice(0,4,0,3.5)

    let light_focus = new THREE.Object3D()
    light_focus.position.set(-1,0, 1)
    scene.add(light_focus)

    directional_light = new THREE.DirectionalLight("white", directional_int = 0.7)
    directional_light.target = light_focus
    directional_light.position.set(10, 10, 10)
    scene.add(directional_light)

    point_light = new THREE.PointLight("white", point_int = 1.2)
    point_light.position.set(20,8,10)
    scene.add(point_light)

    scene.add(board)
    scene.add(ball)
    scene.add(dice)
}

function traverseElements(obj) {
    if (obj instanceof SceneObject)  {
        obj.update(current_time_offset/40)
    }

    if (obj.material !== undefined) {
        obj.material.wireframe = wireframe
    }
    if (obj !== undefined)
        for (i in obj.children)
            traverseElements(obj.children[i])
  }


function update() {
    prev_time = curr_time
    curr_time = performance.now()
    current_time_offset = prev_time === undefined ? 1 : curr_time - prev_time
    
    if (freeze) {
        if (restart) {
            createScene()
            wireframe = false, stopnow = false, freeze = false
            switches = [false, false, false, false, false, false]
            restart = false
        }
        return
    }
        

    if (switches[4]) {
        switches[4] = false
        if (directional_light.intensity === 0)
            directional_light.intensity = directional_int
        else
            directional_light.intensity = 0
    } 

    if (switches[5]) {
        switches[5] = false
        if (point_light.intensity === 0)
            point_light.intensity = point_int
        else
            point_light.intensity = 0
        console.log(point_light.intensity)
    }

    traverseElements(scene)
}

function createCameras() {
    active_camera = new THREE.PerspectiveCamera(60, window.outerWidth / window.outerHeight, 1, 1000);
    active_camera.position.set(15,20,40)
    active_camera.lookAt(0,0,0)
}