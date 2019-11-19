class Ball extends SceneObject {
    constructor(x,y,z, c1,c2,c3) {
        super() 
        this.initRot = new THREE.Vector3(this.rotation.x, this.rotation.y, this.rotation.z)
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
        this.speed = 5

        this.name = 'ball'
    }


    update(time_compensation) {
        //Rotate center -> Move ball around it
        if (stopnow) {
            this.speed -= 0.1
            if (this.speed < 0)
                this.speed = 0
        } else {
            this.speed += 0.1
            if (this.speed > 5)
                this.speed = 5
        }
        this.rotateY(Math.PI * 2 / 360 * time_compensation * this.speed * 2 / 5)
        this.children[0].rotateY(Math.PI * 2 / 360 * time_compensation * this.speed * 2 / 5)
    }

    restart() {
        this.rotation.set(this.initRot.x, this.initRot.y, this.initRot.z)
        this.speed = 5
    }
}