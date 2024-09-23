import catalogService from "../services/catalog.service.js"

class CatalogControler{
    async createCatalog(req, res){
        try{
            const catalog = await catalogService.createCatalog(req.body.title)
            res.json(catalog)
        }catch(err){
            res.json({
                message:"Не удалось создать каталог"
            })
        }
    }
    async getCatalogs(req, res){
        const catalog = await catalogService.getCatalog()
        res.json(catalog)
    }
}

export default new CatalogControler()