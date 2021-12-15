
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
  roundWinnerId : Array<number>
  status : MatchStatus
  winner : number
}

export class Pokemon {
  id: number
  name: string
  type: string[]
  url: string

  constructor(id: number, name: string, type: string[], url:string) {
      this.id = id
      this.name = name
      this.type = type
      this.url = url
  }
}