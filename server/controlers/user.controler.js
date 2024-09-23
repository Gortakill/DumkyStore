import userService from "../services/user.service.js"

class UserControler {
    async registration(req, res){
        try{
            const create = await userService.registration(req.body)
            res.json(create)
        }catch(err){
            res.status(400).json({
                message: 'Не коректно введенны даные'
            })
        }
    }
    async login(req, res){
        try{
            const log = await userService.login(req.body)
            res.json(log)
        }catch(err){
            res.status(401).json({
                message: 'Не удалось войти'
            })
        }
    }
    async updateUser(req, res){
        try{
            const update = await userService.updateUser(req.body, req.user.email)
            res.json(update)
        }catch(err){
            res.status(500).json({
                message: 'User was not updated'
            })
        }
    }
}

export default new UserControler()