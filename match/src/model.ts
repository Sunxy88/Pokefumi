
export enum MatchStatus {
    CREATED = "created",
    INPROGRESS = "in_progress",
    FINISHED = "finished"
}

export class Match {
  id: number
  idPlayer1: number
  idPlayer2 : number
  pokemonsPlayer1 : Array<string>
  pokemonsPlayer2 : Array<string>
  status : MatchStatus
  winner : number
}