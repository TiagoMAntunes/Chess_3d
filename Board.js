class Board extends SceneObject {
    constructor(x,y,z,side_size) {
        super()
        
        let board = new THREE.Object3D()
        let black = false
        for (let i = -17.5; i < 20; i += 5) {
            black = !black
            for (let j = -17.5; j < 20; j += 5) {
                board.add(super.createSceneObjBox(i,0,j, side_size, 2, side_size, new THREE.MeshBasicMaterial({color: black ? "black" : "white"})))
                black = !black
            }
        }
        
        this.add(board)

        


        this.position.set(0,0,0)
    }
}