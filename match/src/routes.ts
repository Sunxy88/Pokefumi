import * as express from "express"
import * as MatchController from './matchController'
import { Match } from "./model";

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
}

