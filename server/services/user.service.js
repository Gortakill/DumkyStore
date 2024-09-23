import Model from '../models/models.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { ApiError } from '../error/ApiError.js'

const generateToken = (name, surname, email, role) => {
    const token = jwt.sign({
        name,
        surname,
        email,
        role
    },process.env.SECRET_KEY,
    {
        expiresIn: '24h'
    })
    return token
}

class UserServices {
    async registration(body){
        const {name, surname, email, password, role} = body
        const hashPassword = await bcrypt.hash(password, 5)
        const create = await Model.User.create({name, surname, email, password: hashPassword, role})
        await Model.Basket.create({UserId: create.id})
        await Model.Liked.create({UserId: create.id})
        const token = generateToken(name, surname, email, role)
        return token
    }
    async login(body){
        const {email, password} = body
        const currentUser = await Model.User.findOne({where: {email}})
        if(currentUser){
            const decodePassword = bcrypt.compareSync(password, currentUser.password)
            if(decodePassword){
                const token = generateToken(currentUser.name, currentUser.surname, currentUser.email, currentUser.role)
                return token
            }else{
                return
            }
        }else{
            return
        }
    }
    async updateUser(body, userEmail){
        const {name, surname} = body
        const currentUser = await Model.User.update({name, surname}, {where: {email: userEmail}})
        const updatedUser = await Model.User.findOne({where:{email: userEmail}})
        const token = generateToken(updatedUser.name, updatedUser.surname, updatedUser.email, updatedUser.role)
        return token
    }
}

export default new UserServices()