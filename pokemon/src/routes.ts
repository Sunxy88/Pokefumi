import * as express from "express"
import * as PokemonController from "./pokemonController"

export const register = ( app: express.Application ) => {

  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/pokemon', (req, res) => {
      PokemonController.getPokemonList().then((r) => res.status(200).json(r))
  })

  app.get('/pokemon/:id', (req, res) => {
    const pokemonId: number = parseInt(req.params.id)
    // PokemonController.getPokemonById(pokemonId).then((r) => res.status(200).json(r))
    res.status(200).json(PokemonController.getPokemonById(pokemonId))
  })
  
}
