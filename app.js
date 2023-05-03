const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(response => {
      console.log(response);

      res.render('beers.hbs', {
        allBeers: response
      });
    })
    .catch(error => {
      //console.log(error);
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(response => {
      res.render('random-beer.hbs', {
        randomBeer: response
      });
    })
    .catch(error => {});
});

app.get('/beers/:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then(response => {
      res.render('beer-info.hbs', {
        beer: response[0]
      });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

// PASOS PARA CREAR RUTAS

// 1. CREAR LA RUTA SIN NADA ADENTRO
// 2. CREAMOS UNA VISTA CON UNA ESTRUCTURA BASE (SIN CONTENIDO)
// 3. RENDERIZAMOS ESA VISTA EN LA RUTA Y LA PROBAMOS
// 4. BUSCAR LA DATA Y PASARLA A LA VISTA
// 5. RENDERIZAR LA DARA EN EL HBS
