import * as express from "express"
import * as UserController from "./userController"
import { User } from './model'
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

export const register = ( app: express.Application ) => {

  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/user', (req, res) => {
    if (!isLogin(req)) {
      res.status(200).send("login at first")
      return 
    }
	  res.status(200).json(UserController.listUsers())
  })

  app.put('/user', (req, res) => {
    const newUser: User = req.body    
    res.status(200).json(UserController.addUser(newUser))
  })  
 
  app.get('/user/:id', (req, res) => {
    // if (!isLogin(req)) {
    //   res.status(200).send("login at first")
    //   return 
    // }
    const userId: number = parseFloat(req.params.id)
    res.status(200).json(UserController.findUser(userId))
  })

  app.post('/user/connect', (req, res) => {
    let user: User = req.body
    user = UserController.login(user.loginId, user.passwd)
    res.cookie('logined', 1, {maxAge: 60 * 1000})
    res.status(200).json(user)
  })
}

function isLogin(req: any): boolean {
  console.log(req.cookies.logined)
  if (req.cookies.logined) {
    return true
  } else {
    return false
  }
}
