import "./model"

import MatchRepository from './matchRepository'
import { Match, MatchStatus } from "./model"

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

export {listMatchs, getMatchById, createMatch, updateMatch}
