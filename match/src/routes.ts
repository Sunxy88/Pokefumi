import * as express from "express"
import * as MatchController from './matchController'
import { computePokemonWinner, computePokemonWinnerByType } from "./matchService";
import { Match, Pokemon } from "./model";

export const register = ( app: express.Application ) => {

  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/match', (req, res) => {
      res.status(200).json(MatchController.listMatchs())
  })

  app.get('/match/:id', (req, res) => {
      const matchId: number = parseFloat(req.params.id)
      res.status(200).json(MatchController.getMatchById(matchId))
  })

  app.put('/match', (req, res) => {
      let match: Match = req.body
      res.status(200).json(MatchController.createMatch(match))
  })

  app.post('/match', (req, res) => {
      let match: Match = req.body
      res.status(200).json(MatchController.updateMatch(match))
  })

  app.post('/match/newround', (req, res) => {
      let body: any = req.body
      console.log(body)
      let match: Match = body.match
      let pokemon1: Pokemon = body.pokemon1
      let pokemon2: Pokemon = body.pokemon2
      MatchController.computeRound(match, pokemon1, pokemon2).then(result => res.status(200).json(result))
  })
}

