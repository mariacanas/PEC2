

const findOne = (list, { key, value }) => {

    /*
    Se ha eliminado los parametros de "onSucess" "onError", recibiendo así la función dos parámetros el de la lista y el objeto a con el valor a buscar
    Esta función devolverá ahora una nueva promesa, la cual se resuelve si el elemento se ha encontrado o se rechaza con el mensaje de error si el elemento no se ha encontrado

    */
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const element = list.find(element => element[key] === value);
            element ? resolve(element) : reject('ERROR: Element Not Found' );
        },2000);
    });
        
};




  
  const onSuccess = ({ name }) => console.log(`user: ${name}`);
  const onError = ({ msg }) => console.log(msg);
  
  const users = [
    {
      name: 'Carlos',
      rol: 'Teacher'
    },
    {
      name: 'Ana',
      rol: 'Boss'
    }
  ];
  
/*
Este es el código que se ha añadido para este apartado c
Para ello se utiliza async/await, para esperar a que la promesa que nos
    devuelve la función findOne. 
Se ha optado por la opción de no crear una función extra que manejara esta lógica.
Se van a realizar dos llamadas a la función findOne con dos valores diferentes en los parametros.
Dentro de try se va a esperar a que llegue la promesa devuelta por la función findOne y esta se resuelva, y dependiendo de si 
  la promesa es resuelta o rechazada nos va mostrar un mensaje de éxito o de error
*/
  (async () =>{
    try{
        const usuario1 = await findOne(users,{key:'name',value:'Carlos'});
        console.log('findOne success');
        onSuccess(usuario1);
    } catch(error){
        console.log('findOne error');
        onError({msg:error});
    }
    
    try{
        const usuario2 = await findOne(users,{key:'name',value:'Fermin'});
        console.log('findOne success');
        onSuccess(usuario2);
    }catch(error){
        console.log('findOne error');
        onError({msg:error});
    }
})();
  /*
  findOne success
  findOne error
   //wait 2 seconds
  user: Carlos
  ERROR: Element Not Found
  */
  