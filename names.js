//En la siguiente funcion separaremos los nombres de
//los apellidos.
function separateNamesAndSurnames() {
  //Este será el arreglo final que despliega el resultado.
  let namesArray;
  //Aquí instanciamos una variable para poder usar la lectura de
  //datos y leer el input.
  const readline = require("node:readline");
  //Instanciamos tanto el input como el output dentro de JS.
  const { stdin: input, stdout: output } = require("node:process");
  //Aquí iniciamos con el proceso de lectura.
  const rl = readline.createInterface({ input, output });
  //Desplegamos al usuario para obtener su respuesta.
  rl.question("Inserta tu nombre completo: ", (answer) => {
    let namesUnified = [];
    //Partimos su respuesta en elementos individuales.
    namesArray = answer.split(" ");
    //En el inicio de este algoritmo primero vamos a hacer
    //que el programa identifique los nombres del usuario
    //me centrare primero en unificar los nombres y apellidos
    //que pueden ser compuestos.
    let result = uniteElements(namesArray);
    //Una vez habiendo unificado sus valores compuestos
    //determinamos los nombres de los apellidos.
    //Esto lo hago entendiendo que la estructura de un nombre
    //completo usualmente sus ultimos dos elementos son los
    //apellidos de la persona, por ende todo lo demas fuera
    //debe de ser parte del nombre.
    let unifiedOthers = result.slice(0, -2).join(" ");
    //Unimos el nombre con los ultimos dos valores.
    namesUnified = [unifiedOthers, ...result.slice(-2)];
    //Lo imprimimos.
    console.log(namesUnified);
    rl.close();
  });
}
//Esta función es un filtro necesario en caso de que existan
//nombres y apellidos compuestos dentro del nombre que el
//usuario usa como input.
//
//Principal parámetro: arreglo separado por palabras.
function uniteElements(namesArray) {
  let result = [];
  //Aqui guardare todas las preposiciones.
  let prepositions = [];
  //Usare el pivot como punto de apoyo para
  // modificar la información.
  let pivot;
  //Recorreremos todo el arreglo de elementos para
  //distinguir los nombres de las preposiciones.
  for (let i = 0; i < namesArray.length; i++) {
    //Guardamos el nombre
    pivot = namesArray[i];
    //Obtenemos la primera letra del nombre.
    firstLetter = pivot.charAt(0);
    //Si nuestro elemento actual se encuentra completamente
    //en minusculas debe de ser algo que no es un nombre o apellido.
    if (pivot.length > 1 && pivot === pivot.toLowerCase()) {
      //Lo guardamos dentro de las preposiciones.
      prepositions.push(pivot);
    } else if (
      //Si tenemos preposiciones anteriormente guardadas y
      //el elemento actual tiene como mayúscula su primera letra
      //entonces debemos de unificar lo que puede ser un nombre o
      //apellido compuesto.
      prepositions.length > 0 &&
      firstLetter === firstLetter.toUpperCase()
    ) {
      //Unificamos todo, lo guardamos en el resultado y limpiamos
      //nuestro arreglo de preposiciones.
      let unitedPrepositions = prepositions.join(" ") + " " + pivot;
      result.push(unitedPrepositions);
      //Es necesario limpiarlo para que después no se hagan valores como
      //"de la de los Santos" o "de de Renta".
      prepositions = [];
    } else {
      //En caso de no ser todas las anteriores significa que es un nombre
      //o un apellido simple, cosa que solamente agregamos.
      result.push(pivot);
    }
  }
  //Retornamos el resultado
  return result;
}
//Ejecución de la función, para poder correrlo en consola se
//tiene que encontrar en el directorio del archivo y ejecutar el
//siguiente comand: node names.js
separateNamesAndSurnames();
