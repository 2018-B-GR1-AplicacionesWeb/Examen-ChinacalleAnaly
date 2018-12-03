declare var require;

const fs = require('fs');
const rxjs = require('rxjs');
const distinct = require('rxjs/operators').distinct;
const map = require('rxjs/operators').map;
const inquirer = require('inquirer');
const nombreArchivo = "people.js";
function leerArchivo(){
    fs.readFile(
        nombreArchivo,
        'utf8',
            (error,contenido)=>{
                if(error){
                    console.error(error)
                }else {
                    const arreglo = JSON.parse(contenido);
                    console.log(calcularNumeroPeliculasPorPersonaje(arreglo))
                }
            }
    )
}
leerArchivo();
function buscarTipos(propiedad: string, arreglo: Personaje[]){
    const arregloRepetido =
    arreglo.map(
        (caracter) =>{
            return caracter[propiedad]
        }
    );
    return rxjs.of(JSON.parse(JSON.stringify(arregloRepetido)))
        .pipe(
            distinct()
        )
        .subscribe(
            (arreglo)=>{
                return arreglo
            }
        )
}

function clasificar(propiedad: string, arregloPropiedades: string[], arreglo: Personaje[]){
    const respuesta = [];
    arregloPropiedades
        .forEach(
            (prop) =>{
                const arregloFiltrado = arreglo.filter(
                    (personaje)=>{
                        return personaje[propiedad] === prop//Expresion
                    }
                );
                respuesta.push(arregloFiltrado)
            }
        );
    return respuesta
}
const arreglo: Personaje[] = [];

/*buscarTipos('gender',arreglo)
    .pipe(
        map(
            (arregloRepetido)={
                return clasificar('gender',arregloRepetido,arreglo)
            }
        )
    );
*/
const arregloABC = [
    'a',
    'b',
    'c',
    'd',
    'e'
];

//SOME --> si hay uno verdadero --> true
function buscarPorAbecedario(arregloAbecedario: string[], arreglo){
    arregloAbecedario
        .map(
            (letra)=>{
                const objeto = {};
                objeto[letra] = arreglo.some(
                    (caracter)=>{
                        return caracter.name.slice(0,1).toUpperCase() === letra.toUpperCase();
                    }
                )
            }
        )
}

function massHeight(arreglo: Personaje[]){
    return arreglo
        .reduce(
            (valorAcumulado: number, caracter: Personaje)=>{
                const masa = Number(caracter.mass);
                const height = Number(caracter.height);
                return valorAcumulado +masa + height;
            },
            0
        )
}

function buscarSiAUsado(buscarPor: string, arreglo: Personaje[]){
    return arreglo
        .every(
            (caracter)=>{
                return caracter[buscarPor].lenght >1;
            }
        )
}

function calcularNumeroPeliculasPorPersonaje(arreglo: Personaje[]){
    return arreglo.map(
        (caracter)=>{
            return {
                nombre: caracter.name,
                numeroPeliculas: caracter.films.length
            }
        }

    )
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
    "films": string[],
    "species": string[],
    "vehicles": string[],
    "starships": string[],
    "created": string,
    "edited": string,
    "url": string
}