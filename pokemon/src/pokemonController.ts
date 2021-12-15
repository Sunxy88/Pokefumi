import { application } from 'express'
import got from 'got'
import {Pokemon} from './model'

const POKEMON_URL = "https://pokeapi.co/api/v2/"
const cache = new Map()

function getPokemonList(pokemonsUrl = POKEMON_URL + "pokemon/"):Promise<any> {
    return got(pokemonsUrl).json()
}

function getPokemonByName(name: string):Promise<any> {
    var result = cache.get(name)
    if (result != undefined) {
        return result
    }

    let url = POKEMON_URL + "pokemon/" + name + "/"
    console.log(url)
    let promise = got(url).json()
    cache.set(name, promise)
    return promise
}

function parsePokemon(r:any) {
    let id = r.id
    let name = (r.forms)[0].name
    let url = POKEMON_URL + id + "/"
    let type_ary: string[] = Array()
    for (var i = 0; i < r.types.length; i += 1) {
        type_ary.push(r.types[i].type.name)
    }
    let pokemon = new Pokemon(id, name, type_ary, url)
    return pokemon
} 

function getTypeDetail(type: string): Promise<any> {
    let url = POKEMON_URL + "/type/" + type
    console.log(url)
    return got(url).json()
}

function parseType(originalType: any) {
    return {
        name: originalType.name,
        doubleDamageFrom: originalType.damage_relations.double_damage_from,
        doubleDamageTo: originalType.damage_relations.double_damage_to
    }
}

export {getPokemonList, getPokemonByName, parsePokemon, getTypeDetail, parseType, POKEMON_URL}
