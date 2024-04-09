
/*Comenarios sobre la funcionalidad del código */

/*
Es una función que se llama "findOne" la cual va a recibir 3 parametros que son:
    -list que es la lista donde va a hacer la búsqueda
    -{key, value} es un objeto que va a teer una clave y un valor, que será el valor que se quiere buscar en la lista
    -{onSuccess, onError} es un objeto que tiene dos funciones, las cuales se llamará a la función de OnSucess si se 
        encuentra el elemento buscado y en el caso de no encontrarlo se llamará a la de onError
    
    El setTimeOut es una función que sirve para establecer un retraso en este caso de 2000 milisegundos (2 segundos) en la ejecucción del código que tiene dentro,
        esto es una forma de realizar una operación asíncrona.

    La línea de const element está utilizando el método find para buscar el elemento que le hemos pasado por parámetro en la lista list

    La línea de element ? ... sigifica que en el caso de encontrar el elemento en la lista se va a ejecutar la función onSucess, en caso contrario se 
        llama a la función onError
*/
const findOne = (list, { key, value }, { onSuccess, onError }) => {
    setTimeout(() => {
      const element = list.find(element => element[key] === value);
      element ? onSuccess(element) : onError({ msg: 'ERROR: Element Not Found' });
    }, 2000);
  };
  

  /*Estas son las dos funciones de callback que se han declarado, las cuales se utilizzan para manejar el
    éxito o error de la búsqueda de usuario que estamos realizando.
  */

    /*Función que recibe un objeto con el parametro name, extrae el valor de esa propiedad
        que será el nombre del usuario y va a mostrar por consola el mensaaje de user: NombredelUsuario */
  const onSuccess = ({ name }) => console.log(`user: ${name}`);
  /*Funcion que recibe un objeto con el parametro msg, el cual va a extraer el valor de esa propiedad y lo va a utilizar
  para mostrar por consola el mensaje error que ha recibido*/
  const onError = ({ msg }) => console.log(msg);
  

  /*Está declarando el array users, el cual va a estar formado por una lista de objetos, donde cada uno de estos
    va a ser un usuario que tendrán dos propiedades que son 'name' y 'rol'*/
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
  
  /*Muestra el mensaje de "findOne success" por consola*/
  console.log('findOne success');
  /*Llama a la función findOne con los siguientes parametros:
    users -> Va a ser el array de usuarios (Declarado anteriormente) donde va a 
        realizar la búsqueda.
    { key: 'name, value: 'Carlos } -> Es el objeto con los criterios de la búsqueda que se va a realizar
    { onSucess, onError } -> Es un objeto que tiene dos funciones de callback, que se ejecutará una de ellas dependiendo
        del resultado de la búsqueda. En este caso como en nuestro array si que tenemos ese nombre, se mostrará por pantalla user: Carlos,
        ya que se ha ejecutado la llamada de callback onSuccess

    Por lo que la búsqueda se va a completar de forma correcta
  */
  findOne(users, { key: 'name', value: 'Carlos' }, { onSuccess, onError });
  
  /*Muestra el mensaje "findOne error" por consola*/
  console.log('findOne error');

   /*Llama a la función findOne con los siguientes parametros:
    users -> Va a ser el array de usuarios (Declarado anteriormente) donde va a 
        realizar la búsqueda.
    { key: 'name, value: 'Fermin } -> Es el objeto con los criterios de la búsqueda que se va a realizar
    { onSucess, onError } -> Es un objeto que tiene dos funciones de callback, que se ejecutará una de ellas dependiendo
        del resultado de la búsqueda. En este caso como en nuestro array no tenemos ese nombre de Fermin, 
        se mostrará por pantalla ERROR: Element Not Found, ya que se ha ejecutado la llamada de callback onError

    Por lo que la búsqueda va a ser fallida al no encontrar a ese usuario
  */

  findOne(users, { key: 'name', value: 'Fermin' }, { onSuccess, onError });
  
  /*
  findOne success
  findOne error
   //wait 2 seconds
  user: Carlos
  ERROR: Element Not Found
  */