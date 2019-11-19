class Dice extends SceneObject {
    constructor(x,y,z, side_size) {
        super()
 
        let t1 = new THREE.TextureLoader().load("images/face1.jpg")
        t1.minFilter = THREE.LinearMipmapLinearFilter
        let b1 = new THREE.TextureLoader().load("images/face1.jpg")
        b1.minFilter = THREE.LinearMipmapLinearFilter
        let side1 = new THREE.MeshPhongMaterial({map: t1, color: 0xe6b5bb,bumpMap: b1, bumpScale: 0.1, shininess: 15})

        let t2 = new THREE.TextureLoader().load("images/face2.jpg")
        t2.minFilter = THREE.LinearMipmapLinearFilter
        let b2 = new THREE.TextureLoader().load("images/face2.jpg")
        b2.minFilter = THREE.LinearMipmapLinearFilter
        let side2 = new THREE.MeshPhongMaterial({map: t2, color: 0xe6b5bb,bumpMap: b2, bumpScale: 0.1, shininess: 15})

        let t3 = new THREE.TextureLoader().load("images/face3.jpg")
        t3.minFilter = THREE.LinearMipmapLinearFilter
        let b3 = new THREE.TextureLoader().load("images/face3.jpg")
        b3.minFilter = THREE.LinearMipmapLinearFilter
        let side3 = new THREE.MeshPhongMaterial({map: t3, color: 0xe6b5bb,bumpMap: b3, bumpScale: 0.1, shininess: 15})

        let t4 = new THREE.TextureLoader().load("images/face4.jpg")
        t4.minFilter = THREE.LinearMipmapLinearFilter
        let b4 = new THREE.TextureLoader().load("images/face4.jpg")
        b4.minFilter = THREE.LinearMipmapLinearFilter
        let side4 = new THREE.MeshPhongMaterial({map: t4, color: 0xe6b5bb,bumpMap: b4, bumpScale: 0.1, shininess: 15})

        let t5 = new THREE.TextureLoader().load("images/face5.jpg")
        t5.minFilter = THREE.LinearMipmapLinearFilter
        let b5 = new THREE.TextureLoader().load("images/face5.jpg")
        b5.minFilter = THREE.LinearMipmapLinearFilter
        let side5 = new THREE.MeshPhongMaterial({map: t5, color: 0xe6b5bb,bumpMap: b5, bumpScale: 0.1, shininess: 15})

        let t6 = new THREE.TextureLoader().load("images/face6.jpg")
        t6.minFilter = THREE.LinearMipmapLinearFilter
        let b6 = new THREE.TextureLoader().load("images/face6.jpg")
        b6.minFilter = THREE.LinearMipmapLinearFilter
        let side6 = new THREE.MeshPhongMaterial({map: t6, color: 0xe6b5bb,bumpMap: b6, bumpScale: 0.1, shininess: 15})

        let materials = [side1, side6, side4, side3, side5, side2]

        let dice = super.createSceneObjBox(0,0,0, side_size, side_size, side_size, materials)
        dice.rotateX(35.264*Math.PI/180) // 35.264º
        dice.rotateZ(Math.PI / 4) // 45º
        
        this.add(dice)
        this.position.set(x,y,z)
        this.name = 'dice'
        this.initRot = new THREE.Vector3(this.rotation.x, this.rotation.y, this.rotation.z)
    }

    update(time_diff) {
        this.rotateY(Math.PI * 2 / 360 * time_diff)
    }

    restart() {
        this.rotation.set(this.initRot.x, this.initRot.y, this.initRot.z)
    }
}