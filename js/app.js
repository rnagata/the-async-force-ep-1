'use strict';

function reqListenerPersons (){
  let obj = JSON.parse(this.responseText);
  if (obj.name === 'Darth Vader'){
    document.getElementById('person4Name').innerHTML = obj.name;
    const vaderHomeworld = new XMLHttpRequest();
    vaderHomeworld.addEventListener('load', reqListenerPersons);
    vaderHomeworld.open('GET', obj.homeworld);
    vaderHomeworld.send();
  }
  if (obj.name === 'Han Solo'){
    document.getElementById('person14Name').innerHTML = obj.name;
    const hanSpecies = new XMLHttpRequest();
    hanSpecies.addEventListener('load', reqListenerPersons);
    hanSpecies.open('GET', obj.species);
    hanSpecies.send();
  }
  if (obj.name === 'Tatooine'){
    document.getElementById('person4HomeWorld').innerHTML = obj.name;
  }
  if (obj.name === 'Human'){
    document.getElementById('person14Species').innerHTML = obj.name;
  }
}

let peopleArr = [];
let planetArr = [];

const vaderReq = new XMLHttpRequest();
vaderReq.addEventListener('load', reqListenerPersons);
vaderReq.open('GET', 'https://swapi.co/api/people/4');
vaderReq.send();

const hanReq = new XMLHttpRequest();
hanReq.addEventListener('load', reqListenerPersons);
hanReq.open('GET', 'https://swapi.co/api/people/14');
hanReq.send();

const planetReq = new XMLHttpRequest();
planetReq.addEventListener('load', planetFunction);
planetReq.open('GET', 'https://swapi.co/api/films/');
planetReq.send();

let films;
let filmsInPlanets;

function planetFunction(){
  films = JSON.parse(this.responseText).results;
  films.forEach( function(item){
    let listItem = document.createElement('li');
    listItem.className = 'film';
    document.getElementById('filmList').appendChild(listItem);
    
    let filmTitle = document.createElement('h2');
    filmTitle.innerHTML = item.title;
    filmTitle.className = 'filmTitle';
    listItem.appendChild(filmTitle);
    
    let planetsHeader = document.createElement('h3');
    planetsHeader.innerHTML = 'Planets';
    listItem.appendChild(planetsHeader);

    let filmPlanets = document.createElement('ul');
    filmPlanets.className = 'filmPlanets';
    listItem.appendChild(filmPlanets);

    item.planets.forEach(function(item){
      console.log(item);
      let planet = document.createElement('li');
      planet.className = 'planet';
      filmPlanets.appendChild(planet);

      let planetName = document.createElement('h4');
      planetName.className = 'planetName';
      planet.appendChild(planetName);

      const blah = new XMLHttpRequest();
      blah.addEventListener('load', blahListener);
      blah.open('GET', item);
      blah.send();

      function blahListener (){
        let planetx = JSON.parse(this.responseText);
        planetName.innerHTML = planetx.name;
      }
    });
  });
}