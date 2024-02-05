function löschObjekt(zeile,spalte,array,wechsel) {
    for(let i =0;i<array.length;i++){
      	let gras = array[i]
        if(gras.zeile === zeile && gras.spalte === spalte){
          array.splice(i,1)
          matrix[zeile][spalte] = wechsel
          return;
        }
    }
}
function randPos(umgebung){
  let randomIndex = Math.floor(Math.random() * umgebung.length);
  return umgebung[randomIndex];
}
function isPosVal(koordinate){
  let zeile = koordinate[0]
  let spalte = koordinate[1]
  let isZeileValid = (zeile >=0) && (zeile < matrix.length)
  let isSpalteValid = (spalte >=0) && (spalte < matrix.length)
  return isZeileValid && isSpalteValid
}
function initUmgebung(size, y, x, array){
  let umgebung = array;
  for(let zeile=y-size; zeile <= y + size; zeile++){
    for(let spalte=x-size; spalte <= x + size; spalte++){
      umgebung.push([zeile,spalte])
    }
  }
  return umgebung;
}

module.exports = {
  löschObjekt,
  randPos,
  isPosVal,
  initUmgebung
}