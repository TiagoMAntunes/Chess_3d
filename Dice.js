class Dice extends SceneObject {
    constructor(x,y,z, side_size) {
        super()

        let dice = super.createSceneObjBox(0,0,0, side_size, side_size, side_size, new THREE.MeshBasicMaterial({color : 'blue'}))
        dice.rotateX(Math.PI / 4) // 45º
        //dice.rotateY(Math.PI / 4)
        dice.rotateZ(Math.PI / 4) // 45º
        this.add(dice)
        this.position.set(x,y,z)
    }

    update(time_diff) {
        this.rotateY(Math.PI * 2 / 360 * time_diff)
    }
}