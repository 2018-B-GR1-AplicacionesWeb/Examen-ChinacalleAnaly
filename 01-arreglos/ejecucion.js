import {first, map} from "rxjs";

var require;
const fs = require('fs');
const rxjs = require('rxjs');

const nombreArchivo = 'people.json';
/*
[{"": ,"":  ,"": [] ,"":[]    },{}]

 */
const leerArchivoPromesa = new Promise(
    (resolve, reject) => {
        fs.readFile(
            nombreArchivo,
            'utf-8',
            (error, contenidoLeido) =>{
                if(error){
                    reject({mensaje: 'Error leyendo'})
                }else{
                    resolve(JSON.parse(contenidoLeido))
                }
            }
        )
    }
);

leerArchivoPromesa
    .then(
        (bd)=> {
            //## 1) Busque los tipos de "gender" en el arreglo `people.json`
            //"gender": "n/a",
            const contenido = JSON.parse(JSON.stringify(bd));
            let generos = [];
                    contenido.forEach(

                        (actual, indiceActual, arreglo)=> {
                            generos.push( actual["gender"]);
                            if(generos.indexOf(actual["gender"])!=null ){
                                console.log(actual["gender"])
                            }

                        }
                    )
                }

    );

leerArchivoPromesa
    .then(
        (bd)=> {
            //## 2) Busque los tipos de "eye_color" en el arreglo `people.json`
            //"eye_color": "n/a",
            const contenido = JSON.parse(JSON.stringify(bd));
            contenido.forEach(
                (actual, indiceActual, arreglo)=> {
                    console.log(actual["eye_color"])
                }
            )
        }

    );

leerArchivoPromesa
    .then(
        (bd)=> {
            //Busque los tipos de "skin_color" en el arreglo `people.json`
            //"gender": "n/a",
            const contenido = JSON.parse(JSON.stringify(bd));
            contenido.forEach(
                (actual, indiceActual, arreglo)=> {
                    console.log(actual["skin_color"])
                }
            )
        }

    );
leerArchivoPromesa
    .then(
        (bd)=> {
            //## Busque los tipos de "hair_color" en el arreglo `people.json`
            //"gender": "n/a",
            const contenido = JSON.parse(JSON.stringify(bd));
            const base = rxjs.of(contenido);
            base.pipe(
                map(
                    resul => {
                        first(
                            resul => resul["hair_color"]
                        )
                    }
                )
            )
        }

    );

const arregloRespuesta =[
    {
        a:true
    },
    {
        b:false
    },
];
leerArchivoPromesa
    .then(
        (bd)=> {
            const contenido = JSON.parse(JSON.stringify(bd));
            let abecedario = {'A':0,'B':0,'C':0,'D':0,'E':0,'F':0, 'G':0, 'H':0,'I':0,'J':0,'K':0,'L':0};
            contenido.forEach(
                (actual, indiceActual, arreglo)=> {
                    const letra = actual["name"].substring(0,1);
                    if(abecedario[letra]){
                        arregloRespuesta.push({letra:true});
                        //console.log(Object.keys(abecedario))
                    }else{
                        arregloRespuesta.push({letra:false});
                    }
                }
            )
        }

    );

console.log(arregloRespuesta);

//## 7) Calcular la sumatoria de la propiedad "mass" y la propiedad "height".


const respuestaMasa = {
    massTotal: Number("0"),
    heightTotal: Number("0")
};
console.log(respuestaMasa);
leerArchivoPromesa
    .then(
        (bd)=> {
            const contenido = JSON.parse(JSON.stringify(bd));
            contenido.forEach(
                (actual, indiceActual, arreglo)=> {
                    const mass  = Number(JSON.stringify(actual["massTotal"]));
                    const height= Number(actual["heightTotal"]);
                    console.log(mass + height);
                    respuestaMasa.massTotal = respuestaMasa.massTotal + mass;
                    respuestaMasa.heightTotal = respuestaMasa.heightTotal +height;
                    console.log(respuestaMasa);
                }
            )
        }

    );

console.log(respuestaMasa);
