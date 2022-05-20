// REQUIRE statements
const express = require('express');
const methodOverride = require('method-override');

const pokemon = require('./models/pokemon');

// INITIALIZE express
const app = express();

// CONFIGURE 
const port = 3000;

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false}));

// ROUTES: INDUCES
// I
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {'pokemon' : pokemon})
});

// N
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs')
});

// D
app.delete("/pokemon/:id", (req, res) => {
    // ZACH magic
    const index = pokemon.findIndex( (p) => {
        return p.id === req.params.id
    })
    pokemon.splice(index, 1);
    res.redirect('/pokemon')
  });

// U
app.get("/pokemon/:id/edit", (req, res) => {
    res.render(
      "edit.ejs", 
      {
        pokemon: pokemon.find( (p) => {
            return p.id === req.params.id
        }),
        index: req.params.id, 
      }
    )
  });
  app.put("/pokemon/:id", (req, res) => {
      //   ZACH this function used .findindex to make sure that the pokemon I 
        const index = pokemon.findIndex( (p) => {
        return p.id === req.params.id
    })
    const existingPokemon = pokemon[index]; 
    const updatedPokemon = {
        // ... ZACH spread operator: in array makes new array and copies them over, similarly it copies properties in an object.
        ... existingPokemon,
        img: req.body.img,
        name: req.body.name,
        type: req.body.type,
        misc: {
            classification: req.body.classification,
        },
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            speed: req.body.speed,
        }
    }
    console.log(updatedPokemon)
    pokemon[index] = updatedPokemon 
    res.redirect("/pokemon") //redirect to the index page
  })
// C
app.post('/pokemon', (req, res) => {
    //ZACH mainually handle nested data from edit and put
    const newPokemon = {
        id: pokemon.length + 1,
        img: req.body.img,
        name: req.body.name,
        type: req.body.type,
        misc: {
            classification: req.body.classification,
        },
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            speed: req.body.speed,
        }
    }
    // console.log(newPokemon)
    pokemon.unshift(newPokemon)
    res.redirect('/pokemon')
});

// E NONE
// S
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', {
        // find the pokemon based on ID
        'pokemon' : pokemon.find( (p) => {
            return p.id === req.params.id
        })
    });
});


// LISTENERS
app.listen(port, () => {
    console.log(`Gotta Catch 'em all at port`, port)
});