import likedService from "../services/liked.service.js"

class LikedCatalog{
    async addToLiked(req, res){
        try{
            const add = await likedService.addToLiked(req.query.id, req.user.email)
            res.json(add)
        }catch(err){
            res.json({
                message: 'не удалось добавить товар в корзину'
            })
        }
    }
    async getLiked(req, res){
        try{
            const get = await likedService.getLiked(req.user.email)
            res.json(get)
        }catch(err){
            res.json({
                message: 'Не удалось получить понравившиеся'
            })
        }
    }
    async deleteFromLiked(req, res){
        try{
            const del = await likedService.deleteFromLiked(req.query.id, req.user.email)
            res.json(del)
        }catch(err){
            res.json({
                message: 'Не удалось удалить товар из liked'
            })
        }
    }
}

export default new LikedCatalog()