import Model from '../models/models.js'

class CatalogService{
    async createCatalog(title){
        const catalog = await Model.Catalog.create({title})
        return catalog
    }
    async getCatalog(){
        const catalogs = await Model.Catalog.findAll()
        return catalogs
    }
}

export default new CatalogService()