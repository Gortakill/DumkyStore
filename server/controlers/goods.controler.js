import goodsService from "../services/goods.service.js"

class GoodsControler{
    async createGood(req, res){
        try{
            const {img} = req.files
            const create = await goodsService.createGood(req.body, img)
            res.json(create)
        }catch(err){
            res.json({
                message: 'Не удалось создать товар'
            })
        }
    }
    async getGoods(req, res){
        const get = await goodsService.getAllGoods(req.query.id, req.query.value)
        res.json(get)
    }
    async updateGoods(req, res){
        try{
            const update = await goodsService.updateGoods(req.body, req.query.id)
            res.json({
                message: update
            })
        }catch(err){
            res.status(500).json({
                message:'Не удалось обновить товар'
            })
        }
    }
    async deleteGoods(req, res){
        try{
            const del = await goodsService.deleteGoods(req.query.id)
            res.json({
                message: del
            })
        }catch(err){
            res.status(500).json({
                message: 'Не удалось удалить товар'
            })
        }
    }
}

export default new GoodsControler()