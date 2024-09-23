import Model from '../models/models.js'

class LikedService {
    async addToLiked(goodId, email){
        const product = await Model.Goods.findOne({where:{id: goodId}})
        if(product){
            const user = await Model.User.findOne({where: {email}})
            const liked = await Model.Liked.findOne({where:{UserId: user.id}})
            const checkDuplicateGood = await Model.LikedGoods.findOne({where:{LikedId: liked.id, GoodId: product.id}})
            if(checkDuplicateGood){
                return 'данный товар уже в liked'
            }
            const likedGoods = await Model.LikedGoods.create({LikedId: liked.id, GoodId: goodId})
            return likedGoods
        }else {
            return 'не удалось добавить товар в корзину'
        }
    }
    async getLiked(userEmail){
        const user = await Model.User.findOne({where:{email: userEmail}})
        const liked = await Model.Liked.findOne({where:{UserId: user.id}})
        const likedGoods = await Model.LikedGoods.findAll({where:{LikedId: liked.id}})
        return likedGoods
    }
    async deleteFromLiked(goodId, userEmail){
        const user = await Model.User.findOne({where:{email: userEmail}})
        const liked = await Model.Liked.findOne({where:{UserId: user.id}})
        const likedGoods = await Model.LikedGoods.destroy({where:{LikedId: liked.id, GoodId: goodId}})
        return 'Успешно удалено'
    }
}

export default new LikedService()