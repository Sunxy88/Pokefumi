import { User } from './model'
import UserRepository from './userRepository'

const userRepository = new UserRepository()

const listUsers = () => {
    return userRepository.getAllUsers()
}

const addUser = (newUser: User) => {
    return userRepository.createUser(newUser)
}

const findUser = (userId: number) => {
    return userRepository.getUserById(userId)
}

const login = (loginId: string, passwd: string) => {
    return userRepository.login(loginId, passwd)
}

export {listUsers, addUser, findUser, login}
