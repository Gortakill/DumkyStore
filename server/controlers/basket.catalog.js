import basketService from "../services/basket.service.js";

class BasketCatalog{
    async addToBasket(req, res){
        try{
            const add = await basketService.addToBasket(req.query.id, req.user.email)
            res.json(add)
        }catch(err){
            res.json({
                message: 'не удалось добавить товар в корзину'
            })
        }
    }
    async getBasket(req, res){
        try{
            const get = await basketService.getBasket(req.user.email)
            res.json(get)
        }catch(err){
            res.json({
                message: 'Не удалось получить корзину'
            })
        }
    }
    async deleteFromBasket(req, res){
        try{
            const del = await basketService.deleteFromBasket(req.query.id, req.user.email)
            res.json({
                message: del
            })
        }catch(err){
            res.json({
                message: 'Не удалось удалить товар из корзины'
            })
        }
    }
}

export default new BasketCatalog()