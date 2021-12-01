import Database from 'better-sqlite3'
import fs from 'fs'
import {User} from './model'

export default class UserRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/users.db', { verbose: console.log });
    this.applyMigrations()    
  }

  applyMigrations(){
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }
    
    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'users'").get()

    if (!testRow){
      console.log('Applying migrations on DB users...')
      const migrations = ['db/migrations/init.sql'] 	 
      migrations.forEach(applyMigration)
    }
  }

  getAllUsers(): User[] {
    const statement = this.db.prepare("SELECT * FROM users")
    const rows: User[] =statement.all()
    return rows
  }

  getUserById(userId: number) {
    const statement = this.db
          .prepare("SELECT * FROM users WHERE user_id = ?")
    const rows: User[] = statement.get(userId)
    return rows    
  }

  createUser(user: User) {
    const query = this.db.prepare("SELECT * FROM users WHERE login_id = ?")
    const res: User = query.get(user.loginId)
    if (res != null) {
      return null
    }
    const statement = 
      this.db.prepare("INSERT INTO users (name, login_id, passwd) VALUES (?, ?, ?)")
    return statement.run(user.name, user.loginId, user.passwd).lastInsertRowid
  }

  login(loginId: string, passwd: string) {
    const statement = this.db.prepare("SELECT * FROM users WHERE login_id = ? AND passwd = ?")
    const rows: User[] = statement.get(loginId, passwd)
    if (rows == null || rows.length == 0) {
      return null
    }
    return rows[0]
  }
}
