var persp_camera, ortog_camera, pause_cam //cameras
var scene, active_camera
var pedestal, icosahedron, painting
var spotlights = []
var directional_light, point_light, directional_int, point_int
var board, pause_screen
var origWidth, origHeight, origAspect, smallerDim
let current_time_offset, prev_time, curr_time

var pause_view = {
    left: 0,
    bottom: 0,
    width: 1,
    height: 1,
    background: "pink"
}

var scene_view = {
    left: 0,
    bottom: 0,
    width: 1,
    height: 1,
    background: new THREE.Color(0xe4edf5)
}

function render() {
    let view

    if(freeze){
        view = pause_view
    }
    else{
        view = scene_view
    }

    let left = Math.floor( window.innerWidth * view.left );
    let bottom = Math.floor( window.innerHeight * view.bottom );
    let width = Math.floor( window.innerWidth * view.width );
    let height = Math.floor( window.innerHeight * view.height );
        
    renderer.setViewport( left, bottom, width, height );
    renderer.setScissor( left, bottom, width, height );
    renderer.setScissorTest( true );
    renderer.setClearColor( view.background );
        
    if(freeze){
        pause_cam.left = -width / 2
        pause_cam.right = width/ 2
        pause_cam.top = height / 2
        pause_cam.bottom = -height / 2
        pause_cam.updateProjectionMatrix()

        renderer.render(scene, pause_cam)
    }
    else{
        active_camera.aspect = width / height;
        active_camera.updateProjectionMatrix();
        
        renderer.render(scene, active_camera)
    }
}

var dice
function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(30))

    origWidth = window.innerWidth
    origHeight = window.innerHeight
    origAspect = origWidth/origHeight
    smallerDim = origHeight > origWidth ? origWidth : origHeight

    board = new Board(0,0,0,42)
    let ball = new Ball(-15, 0, 0, 0, 4, 0)
    dice = new Dice(0,4,0,3.5)

    let pause_texture = new THREE.TextureLoader().load("images/pause.png");
    pause_texture.wrapS = THREE.ClampToEdgeWrapping;
    pause_texture.wrapT = THREE.ClampToEdgeWrapping;

    let plane = new THREE.PlaneGeometry(smallerDim/60, smallerDim/60)
    let mat = new THREE.MeshBasicMaterial({map: pause_texture})
    pause_screen = new THREE.Mesh(plane, mat)
    pause_screen.position.set(0, 0, 50)

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
    scene.add(pause_screen)
}

function traverseElements(obj) {
    if (obj instanceof SceneObject)  {
        obj.update(current_time_offset/40)
    }

    if (obj.material !== undefined) {
        if (Array.isArray(obj.material))
            obj.material.map(e => {e.wireframe = wireframe})
        else 
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
            for (i in scene.children) {
                let child = scene.children[i]
                if (child instanceof SceneObject) {
                    child.restart()
                }
            }
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

    pause_cam = new THREE.OrthographicCamera(5, 5, 10, 10, 0, 10)
    pause_cam.zoom = 40
    pause_cam.position.set(0, 0, 51)
    pause_cam.lookAt(0, 0, 0)
    pause_cam.updateProjectionMatrix()
}