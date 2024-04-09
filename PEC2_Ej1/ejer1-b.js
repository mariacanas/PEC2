

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
  Se han eliminado las llamadas a la función findOne con los callback y en si lugar se utilizarán
    las promesas que devuelva la función con then y catch para saber los resultado
  */
  console.log('findOne success');
  findOne(users, { key: 'name', value: 'Carlos' }).then(onSuccess).catch(onError);
  
  console.log('findOne error');
  findOne(users, { key: 'name', value: 'Fermin' }).then(onSuccess).catch(onError);
  
  /*a
  findOne success
  findOne error
   //wait 2 seconds
  user: Carlos
  ERROR: Element Not Found
  */
  