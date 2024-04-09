const zooData = require('./data');

//Función que calcula el precio total para un grupo de visitantes
function entryCalculator(entrants) {
  if (!entrants) {
    return 0; 
  }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants
  return ((zooData.prices.Adult * Adult) + (zooData.prices.Senior*Senior) + (zooData.prices.Child*Child));

}

//Función que devuelve el horario de un dia de la semana
function schedule(dayName) {
  if (!dayName) {
    const humanReadableSchedule = {};
    for (const [day, hours] of Object.entries(zooData.hours)) {
      if (hours.open === 0 && hours.close === 0) {
        humanReadableSchedule[day] = 'CLOSED';
      } else {
        humanReadableSchedule[day] = `Open from ${hours.open}am until ${hours.close < 12 ? hours.close + 'am' : hours.close - 12 + 'pm'}`;
      }
    }
    return humanReadableSchedule;
  } else {
    const hours = zooData.hours[dayName];
    if (hours.open === 0 && hours.close === 0) {
      return { [dayName]: 'CLOSED' };
    } else {
      return { [dayName]:  `Open from ${hours.open}am until ${hours.close < 12 ? hours.close + 'am' : hours.close - 12 + 'pm'}`};
    }
  }
}

//Función que devuelve la cantidad de animales de una especie
function animalCount(species) {
  if (!species) {
    const counts = {};
    zooData.animals.forEach(animal => {
      counts[animal.name] = animal.residents.length;
    });
    return counts;
  } else {
    const count = zooData.animals.find(animal => animal.name === species);
    if(count) return count.residents.length;
    return 0;
  }
}

//Función que devuelve un objeto formado por la localización del zoo junto con una lista de animales
function animalMap(options) {
   const { includeNames, sex } = options || {};
  const animalLocations = {};

  zooData.animals.forEach(animal => {
    const { name, location, residents } = animal;
    const residentsFilteredBySex = residents.filter(resident => !sex || resident.sex === sex);
    const animalNames = residentsFilteredBySex.map(r => r.name);

    if (!animalLocations[location]) {
      animalLocations[location] = [];
    }

    if (includeNames) {
      if (!animalLocations[location].find(item => Object.keys(item)[0] === name)) {
        animalLocations[location].push({ [name]: animalNames });
      }
    } else {
      if (!animalLocations[location].includes(name)) {
        animalLocations[location].push(name);
      }
    }
  });

  return animalLocations;
}


//Función que devuelve los animales que su popularidad es mayor que el dato pasado por parámetro
function animalPopularity(rating) {
  if(!rating){
    const ratingAnimal = {};
    zooData.animals.forEach(a => {
      const {popularity,name} = a;
      if(!ratingAnimal[popularity]){
        ratingAnimal[popularity]=[];
      }
      ratingAnimal[popularity].push(name);
    });
    return ratingAnimal;
  }
  else{
    return zooData.animals.filter(a => a.popularity === rating).map(a=>a.name);
  }
}

//Función que devuelve animal con ese id
function animalsByIds(ids) {
  if(!ids) return [];
  return zooData.animals.filter(e=>ids.includes(e.id));
}

//Función que devuelve el animal con ese nombre
function animalByName(animalName) {
  let foundAnimal = {};
  zooData.animals.forEach(animal => {
    const resident = animal.residents.find(resident => resident.name === animalName);
    if (resident) {
      foundAnimal = {
        species: animal.name,
        ...resident
      };
    }
  });
  return foundAnimal;
}

//Función que devuelve el empleado con ese id
function employeesByIds(ids) {
  if(!ids) return [];
  return zooData.employees.filter(e=>ids.includes(e.id));
}

//Función que devuelve un empleado
function employeeByName(employeeName) {
  if (!employeeName) return {};

  const [firstName, lastName] = employeeName.split(' ');

  const employee = zooData.employees.find(e => {
    if (lastName) {
      return e.lastName === lastName;
    } else {
      return e.firstName === firstName || e.lastName === firstName;
    }
  });

  if (employee) {
    return {
      firstName: employee.firstName,
      lastName: employee.lastName,
      id: employee.id,
      managers: employee.managers,
      responsibleFor: employee.responsibleFor
    };
  } else {
    return {};
  }
}

//Función que devuelve supervisores de un empleado
function managersForEmployee(idOrName) {
  if(!idOrName){
    return {};
  }
  else{
    let employee;
    if(typeof idOrName === 'string') employee = employeeByName(idOrName);
    else employee = zooData.employees.find(emp => emp.id === idOrName);

    if (!employee) return [];

    const managersNames = employee.managers.map(managerId => {
      const manager = zooData.employees.find(emp => emp.id === managerId);
      return manager ? `${manager.firstName} ${manager.lastName}` : 'undefined undefined';
    });

    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      managers: managersNames,
      responsibleFor: employee.responsibleFor
    };
  }
}

function employeeCoverage(idOrName) {
  if(!idOrName){
    const employeeAnimalsMap = {};
    zooData.employees.forEach(employee => {
      const employeeName = `${employee.firstName} ${employee.lastName}`;
      const employeeAnimals = employee.responsibleFor.map(animalId => {
        return zooData.animals.find(animal => animal.id === animalId).name;
      });
      
      employeeAnimalsMap[employeeName] = employeeAnimals;
  });
    return employeeAnimalsMap;
  }
  else{
    let employee;
    if(typeof idOrName === 'string') employee = employeeByName(idOrName);
    else employee = zooData.employees.find(emp => emp.id === idOrName || emp.firstName === idOrName || emp.lastName === idOrName);

    if (!employee || !employee.managers) return employee;

    const employeeName = `${employee.firstName} ${employee.lastName}`;
    const employeeAnimals = employee.responsibleFor.map(animalId => {
      return zooData.animals.find(animal => animal.id === animalId).name;
    });
    return { [employeeName]: employeeAnimals };
  }
  
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalPopularity,
  animalsByIds,
  animalByName,
  employeesByIds,
  employeeByName,
  managersForEmployee,
  employeeCoverage
};
