import Model from '../models/models.js'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { unlink } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class GoodsService {
    async createGood(body, img) {
        const { title, content, price, CatalogId } = body
        const image = uuidv4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', image))
        const create = await Model.Goods.create({
            title,
            content,
            price,
            img: image,
            CatalogId,
        })
        return create
    }
    async getAllGoods(catalogId, value) {
        if (catalogId === '1') {
            const get = await Model.Goods.findAll()
            if (value) {
                const getByValue = await Model.Goods.findAll({
                    where: { title: value },
                })
                return getByValue
            }
            return get
        } else {
            const goods = await Model.Goods.findAll({
                where: { CatalogId: catalogId },
            })
            if (value) {
                const getByValue = await Model.Goods.findAll({
                    where: { title: value },
                })
                return getByValue
            }
            return goods
        }
    }
    async updateGoods(body, GoodId) {
        const { title, content } = body
        const check = await Model.Goods.findOne({ where: { id: GoodId } })
        if (!check) {
            return 'товар с данным id не найден'
        } else {
            const update = await Model.Goods.update(
                { title, content },
                { where: { id: GoodId } }
            )
            return 'товар успешно обновлен'
        }
    }
    async deleteGoods(goodId) {
        const check = await Model.Goods.findOne({ where: { id: goodId } })
        if (!check) {
            return 'товар с данным id не найден'
        } else {
            const liked = await Model.LikedGoods.destroy({
                where: { GoodId: goodId },
            })
            const basket = await Model.BasketGoods.destroy({
                where: { GoodId: goodId },
            })
            const good = await Model.Goods.destroy({ where: { id: goodId } })
            unlink(
                path.resolve(__dirname, '..', 'static', check.img),
                (err) => {
                    if (err) throw err
                }
            )
            return 'товар успешно удален'
        }
    }
}

export default new GoodsService()
