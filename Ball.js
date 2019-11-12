class Ball extends SceneObject {
    constructor(x,y,z, c1,c2,c3) {
        super()

        //c1,c2,c3 center position
        //x,y,z ball position relative to the center
        let texture = new THREE.TextureLoader().load("images/monalisa.jpg");
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        let material = new THREE.MeshPhongMaterial({map: texture, shininess: 70})

        let ball = super.createSceneObjSphere(0,3,0,3, 20, 20, 0, Math.PI * 2, material)
        this.add(ball)
        ball.add(new THREE.AxisHelper(5))
        
        ball.position.set(x,y,z)
        this.position.set(c1,c2,c3)    
    }


    update(time_compensation) {
        //Rotate center -> Move ball around it
        this.rotateY(Math.PI * 2 / 360 * time_compensation)
        this.children[0].rotateY(Math.PI * 2 / 360 * time_compensation)
    }
}