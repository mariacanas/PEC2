

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
Se utiliza Promise.all para ejecutar todas las llamadas a la funcion findOne en paralelo. all  significa
  que si alguna de las promesas es rechazada/falla, todas las demás promesas se van a detener y la promesa devuelta por Promise.all se va a rechazar.
  En el caso que no se quiera que se detenga la ejecución y se esperen a que todas las promesas se resuelvan o se rechazen habria que utilizar Promise.allSettled en vez de Promise.all
Si alguna de las promesas es rechazada, se va a imprimir ese error 
*/
  (async () =>{
    try{
        const resultadosLlamadas= await Promise.all([
            findOne(users,{key:'name',value:'Carlos'}),
            findOne(users,{key:'name',value:'Fermin'})
        ]);

        resultadosLlamadas.forEach((r)=>{
            console.log('findOne success');
            onSuccess(r);
        });
    } catch(error){
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
  