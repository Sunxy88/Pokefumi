import Database from "better-sqlite3"
import fs, { stat } from 'fs'
import "./model"
import { Match, MatchStatus } from "./model"

export default class MatchRepository {
    db: Database.Database

    constructor() {
        this.db = new Database('db/matchs.db', {verbose: console.log})
        this.applyMigrations()
    }

    applyMigrations(){
        const applyMigration = (path: string) => {
          const migration = fs.readFileSync(path, 'utf8')
          this.db.exec(migration)
        }
        
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'matchs'").get()
    
        if (!testRow){
          console.log('Applying migrations on DB matchs...')
          const migrations = ['db/migrations/init.sql'] 	 
          migrations.forEach(applyMigration)
        }
    }

    getAllMatchs(): Match[] {
        const statement = this.db.prepare("SELECT * FROM matchs")
        const rows = statement.all()
        rows.forEach(match => {
            match.pokemonsPlayer1 = JSON.parse(match.pokemons_player1)    
            match.pokemonsPlayer2 = JSON.parse(match.pokemons_player2)
            match.roundWinnerId = JSON.parse(match.round_winner_id)
        })
        return rows
    }

    getMatchById(id: number) : Match {
        const statement = this.db.prepare("SELECT * FROM matchs WHERE id = ?")
        const row: Match = statement.get(id)
        return row
    }

    createMatch(match: Match) {
        console.log(match)
        const statement = this.db.prepare("INSERT INTO matchs (player1, status) VALUES (?, ?)")
        return statement.run(match.idPlayer1, MatchStatus.CREATED).lastInsertRowid
    }

    updateMatch(match: Match) {
        const statement = this.db.prepare("UPDATE matchs SET player1 = ?, player2 = ?, pokemons_player1 = ?, pokemons_player2 = ?, status = ?, winner = ?, round_winner_id = ? WHERE id = ?")
        var pokemons1 = JSON.stringify(match.pokemonsPlayer1)
        var pokemons2 = JSON.stringify(match.pokemonsPlayer2)
        var roundWinnerId = JSON.stringify(match.roundWinnerId)
        statement.run(match.idPlayer1, match.idPlayer2, pokemons1, pokemons2, match.status, match.winner, roundWinnerId, match.id)
    }
}