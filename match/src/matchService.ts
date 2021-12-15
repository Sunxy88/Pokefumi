import {Pokemon, Match, MatchStatus} from './model'
import got from 'got'
import { updateMatch } from './matchController'

const POKEMON_API_HOST:string = "http://pokemon:5002/pokemon/"

function computePokemonWinner(match:Match, pokemon1: Pokemon, pokemon2: Pokemon): Promise<any> {
    let type1 = pokemon1.type[0]
    let type2 = pokemon2.type[0]
    return computePokemonWinnerByType(type1, type2).then(result => {
        if (!match.roundWinnerId) {
            match.roundWinnerId = []
        }
        if (!result) {
            match.roundWinnerId.push(-1)
            updateMatch(match)
            if (!match.pokemonsPlayer1 || match.pokemonsPlayer1.length == 0) {
                computeFinalWinner(match)
            }
            return {
                "winner" : "",
                "match" : match
            }
        } else if (result === type1) {
            match.roundWinnerId.push(match.idPlayer1)
            updateMatch(match)
            if (!match.pokemonsPlayer1 || match.pokemonsPlayer1.length == 0) {
                computeFinalWinner(match)
            }
            return {
                "winner" : pokemon1,
                "match" : match
            }
        } else if (result === type2) {
            match.roundWinnerId.push(match.idPlayer2)
            updateMatch(match)
            if (!match.pokemonsPlayer1 || match.pokemonsPlayer1.length == 0) {
                computeFinalWinner(match)
            }
            return {
                "winner" : pokemon2,
                "match" : match
            }
        }
    })
}

function computeFinalWinner(match: Match): any {
    if (!match) {
        return
    }
    if (match.pokemonsPlayer1.length > 0 || match.pokemonsPlayer2.length > 0) {
        return
    }
    var scorePlayer1: number = 0
    var scorePlayer2: number = 0
    match.roundWinnerId.forEach(winnerId => {
        if (winnerId == match.idPlayer1) {
            scorePlayer1 = scorePlayer1 + 1
        }
        if (winnerId == match.idPlayer2) {
            scorePlayer2 = scorePlayer2 + 1
        }
    })
    if (scorePlayer1 > scorePlayer2) {
        match.winner = match.idPlayer1
    } else if (scorePlayer1 < scorePlayer2) {
        match.winner = match.idPlayer2
    } else {
        match.winner = -1
    }
    match.status = MatchStatus.FINISHED
    updateMatch(match)
}

function computePokemonWinnerByType(type1: string, type2:string): Promise<any> {
    const TYPE_API = POKEMON_API_HOST + "type/"
    console.log(TYPE_API + type1)
    const type1Detail:any = got(TYPE_API + type1).json()
    const type2Detail:any = got(TYPE_API + type2).json()
    return Promise.all([type1Detail, type2Detail])
        .then(([t1, t2]) => {
            const t1Weak = t1.doubleDamageFrom.find((t:any) => t.name == type2)
            const t2Weak = t2.doubleDamageFrom.find((t:any) => t.name == type1)

            if (t1Weak && !t1Weak)
                return type1
            else if (!t1Weak && t2Weak)
                return type2
            else
                return null
        })
}

export {computePokemonWinner, computePokemonWinnerByType}