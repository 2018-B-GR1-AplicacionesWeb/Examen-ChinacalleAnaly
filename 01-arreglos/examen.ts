
declare var require:any;
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const find = require('rxjs/operators').find;
const nombreArchivo = 'people.json';
/*
[{"": ,"":  ,"": [] ,"":[]    },{}]

 */

function main() {
    inicializarBase()
        .pipe(
            map(
                (bd) => {
                    console.log(bd)
                }
            )

        )
}

function inicializarBase() {
    const leerBDD$ = rxjs.from(leerArchivo());

    return leerBDD$
        .pipe(
            mergeMap(
                (respuesta) => {
                    if (respuesta) {
                        return rxjs.of(respuesta)
                    } else {

                    }
                }
            )
        );
}

function leerArchivo() {
    // @ts-ignore
    return new Promise(
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
}

interface Personaje  {
    "name": string,
    "height": string,
    "mass": string,
    "hair_color": string,
    "skin_color": string,
    "eye_color": string,
    "birth_year": string,
    "gender": string,
    "homeworld": string,
    "films": [],
    "species": [],
    "vehicles": [],
    "starships": [],
    "created": string,
    "edited": string,
    "url": string
}