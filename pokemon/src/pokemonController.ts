import got from 'got'
import {Pokemon} from './model'

const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/"
const cache = new Map()

function getPokemonList(pokemonsUrl = POKEMON_URL):Promise<any> {
    return got(pokemonsUrl).json();
}

function getPokemonById(pokemonId: number) {

    var result = cache.get(pokemonId)
    if (result != undefined) {
        return result
    }
    
    let url = POKEMON_URL + pokemonId + "/"
    got(url).json().then(newPokemonInCache)

    return cache.get(pokemonId)
}

async function newPokemonInCache(r:any) {
    let id = r.id
    let name = (r.forms)[0].name
    let url = POKEMON_URL + id + "/"
    let type = (r.types)[0].type.name

    console.log(id)
    console.log(name)
    console.log(url)
    console.log(type)

    let pokemon = new Pokemon(id, name, type, url)
    console.log(pokemon)
    cache.set(r.id, pokemon)

    return pokemon
} 

export {getPokemonList, getPokemonById}
