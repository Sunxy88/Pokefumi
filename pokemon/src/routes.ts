import * as express from "express"
import * as PokemonController from "./pokemonController"

export const register = ( app: express.Application ) => {

  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/pokemons', (req, res) => {
    PokemonController.getPokemonList().then(result => res.status(200).json(result))
  })

  app.get('/pokemons/:page', (req, res) => {
    const page: number = parseInt(req.params .page)
    var offset: number = page > 1 ? (page - 1) * 20 : 0
    const limit: number = 20
    const next: string = PokemonController.POKEMON_URL + "/pokemon/" + "?offset=" + offset + "&limit=" + limit + "/"
    PokemonController.getPokemonList(next).then(result => res.status(200).json(result))
  })

  app.get('/pokemon/:name', (req, res) => {
    const name: string = req.params.name
    PokemonController.getPokemonByName(name).then(result => res.status(200).json(PokemonController.parsePokemon(result)))
  })

  app.get('/pokemon/type/:type', (req, res) => {
    const typeName: string = req.params.type
    PokemonController.getTypeDetail(typeName).then(result => res.status(200).json(PokemonController.parseType(result)))
  })
}
