var renderer, wireframe = true
var switches = [false, false, false, false, false, false]
var wireframe = false, stopnow = false


function onKeyDown(e) {
  switch(e.keyCode) {
      case 49: //1
      switches[0] =true
      
      break
      case 50: //2
      switches[1] = true
      break
      case 51: //3
      switches[2] = true
      break
      case 52: //4
      switches[3] = true
      break

      case 68:
      case 100:
          switches[4] = true
          break
      case 80:
      case 112:
          switches[5] = true
          break

      case 87:
      case 119:
          wireframe = !wireframe
          break

      case 66:
      case 98:
          stopnow = !stopnow
          break
      
  }
}

function onResize() {
	// update perspsective camera
	/*persp_camera.aspect = window.innerWidth / window.innerHeight
	persp_camera.updateProjectionMatrix()
	
	ortog_camera.left = -window.innerWidth / 2
	ortog_camera.right = window.innerWidth / 2
	ortog_camera.top = window.innerHeight / 2
	ortog_camera.bottom = - window.innerHeight / 2
	ortog_camera.updateProjectionMatrix()
    */
    //limitar tamanho mínimo da janela
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
    update()
    render()
    requestAnimationFrame(animate)
}

//setup of scene
function init() {
    renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement);

    createScene()
    createCameras()
 
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("resize", onResize)
    animate()
 
}