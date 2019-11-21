class Board extends SceneObject {
    constructor(x,y,z,side_size) {
        super()

        let texture = new THREE.TextureLoader().load("images/checker.jpg");
        let bump = new THREE.TextureLoader().load("images/wood.jpg")
        let sideMat = new THREE.MeshPhongMaterial({color: "black", bumpMap: bump, bumpScale: 0.1})

        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        let materials = [
            sideMat, sideMat,
            new THREE.MeshPhongMaterial({map: texture, bumpMap: bump, bumpScale: 0.1, shininess: 10}), 
            sideMat, sideMat, sideMat,
        ]
        
        let board = new THREE.Object3D()
        board.add(super.createSceneObjBox(0,0,0, side_size, 2, side_size, materials))


        this.add(board)
        this.name = 'board'

        


        this.position.set(0,0,0)
    }
}