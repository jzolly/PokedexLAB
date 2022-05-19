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
    // remove the item from the array. number tells how many to remove.
    pokemon.splice(req.params.id, 1);
    res.redirect('/pokemon')
  });

// U
app.get("/pokemon/:id/edit", (req, res) => {
    res.render(
      "edit.ejs", 
      {
        pokemon: pokemon[req.params.id],
        index: req.params.id, 
      }
    )
  });
  
  app.put("/pokemon/:id", (req, res) => {
    pokemon[req.params.id] = req.body 
    res.redirect("/pokemon") //redirect to the index page
  })
// C
app.post('/pokemon', (req, res) => {
    pokemon.push(req.body)
    console.log(pokemon)
    res.redirect('/pokemon')
});

// E NONE
// S
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', {
        'pokemon' :pokemon[req.params.id]
    });
});


// LISTENERS
app.listen(port, () => {
    console.log(`Gotta Catch 'em all at port`, port)
});