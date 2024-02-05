const LivingCreature = require("./LivingCreature.js");
const functions = require("./Setup.js")
module.exports = class Gras extends LivingCreature{
    state = 0
    constructor(z,s) {
        super(z, s)
        this.energie = 0
        matrix[z][s] = 1
        this.count = 0;
        this.platziereselbstinmatrix()
    };
    platziereselbstinmatrix(){
        if(this.state == 0){
            matrix[this.zeile][this.spalte] = 1
        } else {
            matrix[this.zeile][this.spalte] = 5
        }
    }
    stateChange(){
        this.state = 1
        this.platziereselbstinmatrix()
    }
    zug(){
        if(this.state == 0){
            let testumgebung = this.umgebungFiltern(0)
            if (testumgebung != 0){
                this.energie++
            }
            if(this.energie >= 5){
                let umgebungGefiltert = this.umgebungFiltern(0)
                if(umgebungGefiltert.length > 0 && !blockNewGras){
                    let pos = functions.randPos(umgebungGefiltert)
                    GrasArr.push(new Gras(pos[0], pos[1]))  
                }
                this.energie = 0
            }
        } else {
            this.count+=1
            if (this.count >= 10) {
                let decision = Math.floor(Math.random() * 100)
                if (decision == 0 && !blockNewGras) {
                    this.state = 0
                    functions.löschObjekt(this.zeile, this.spalte, GrasArr, 0);
                    GrasArr.push(new Gras(this.zeile, this.spalte))
                    //this.platziereselbstinmatrix()
                } else {
                    functions.löschObjekt(this.zeile, this.spalte, GrasArr, 0);
                }
            }
        }
    }
};