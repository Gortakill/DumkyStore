import Model from '../models/models.js'

class BasketService {
    async addToBasket(goodId, email){
        const product = await Model.Goods.findOne({where:{id: goodId}})
        if(product){
            const user = await Model.User.findOne({where: {email}})
            const basket = await Model.Basket.findOne({where:{UserId: user.id}})
            const checkDuplicateGood = await Model.BasketGoods.findOne({where:{BasketId: basket.id, GoodId: product.id}})
            if(checkDuplicateGood){
                return 'данный товар уже в корзине'
            }
            const basketGoods = await Model.BasketGoods.create({BasketId: basket.id, GoodId: goodId})
            return basketGoods
        }else {
            return 'не удалось добавить товар в корзину'
        }
    }
    async getBasket(userEmail){
        const user = await Model.User.findOne({where:{email: userEmail}})
        const basket = await Model.Basket.findOne({where:{UserId: user.id}})
        const basketGoods = await Model.BasketGoods.findAll({where:{BasketId: basket.id}})
        return basketGoods
    }
    async deleteFromBasket(goodId, userEmail){
        const user = await Model.User.findOne({where:{email: userEmail}})
        const basket = await Model.Basket.findOne({where:{UserId: user.id}})
        const basketGoods = await Model.BasketGoods.destroy({where:{BasketId: basket.id, GoodId: goodId}})
        return 'Успешно удалено'
    }
}

export default new BasketService()