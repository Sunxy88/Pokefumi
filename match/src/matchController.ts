import MatchRepository from './matchRepository'
import { Match, MatchStatus, Pokemon } from "./model"
import * as MatchService from "./matchService"

import request = require('request');

const matchRepository = new MatchRepository()

const listMatchs = () => {
    return matchRepository.getAllMatchs()
}

const getMatchById = (id: number) => {
    return matchRepository.getMatchById(id)
}

const createMatch = (match: Match) => {
    if (!validateDataForCreateMatch(match)) {
        return undefined
    }
    return matchRepository.createMatch(match)
}

const updateMatch = (match:Match) => {
    if (! validateDataForUpdateMatch(match)) {
        return undefined
    }
    return matchRepository.updateMatch(match)
}

function validateDataForCreateMatch(match: Match): boolean {
    return userExist(match.idPlayer1)
}

function validateDataForUpdateMatch(match: Match): boolean {
    if (match.status == MatchStatus.CREATED) {
        if (!match.idPlayer1) {
            return false
        }
        let flag = userExist(match.idPlayer1)
        return flag
    }
    if (match.status == MatchStatus.INPROGRESS) {
        if (!match.idPlayer1 || !match.idPlayer2) {
            return false
        }
        let flag = userExist(match.idPlayer1) && userExist(match.idPlayer2)
        return flag
    }
    if (match.status == MatchStatus.FINISHED) {
        if (!match.idPlayer1 || !match.idPlayer2 || !match.winner) {
            return false;
        }
        if (match.winner != match.idPlayer1 && match.winner != match.idPlayer2) {
            return false
        }
        let flag = userExist(match.idPlayer1) && userExist(match.idPlayer2)
        return flag
    }
    return false
}

function userExist(id: number): boolean {
    let flag = true
    request("http://user:5000/user/" + id, function(error, resposne, body) {
        console.log('body:', body)
        if (!body || !body.user_id) {
            flag = false
        }
    })
    return flag
}

function computeRound(match: Match, pokemon1: Pokemon, pokemon2: Pokemon): Promise<any> {
    var pokemons1:string[] = match.pokemonsPlayer1
    var pokemons2:string[] = match.pokemonsPlayer2
    // remove selected pokemon from deck
    match.pokemonsPlayer1.splice(pokemons1.indexOf(pokemon1.name), 1)
    match.pokemonsPlayer2.splice(pokemons2.indexOf(pokemon2.name), 1)
    updateMatch(match)
    return MatchService.computePokemonWinner(match, pokemon1, pokemon2)
}

export {listMatchs, getMatchById, createMatch, updateMatch, computeRound}

