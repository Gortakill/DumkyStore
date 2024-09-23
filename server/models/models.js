import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const User = sequelize.define(
    'User',
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: {type: DataTypes.STRING, allowNull: false},
        surname: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, unique:true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.STRING, defaultValue: 'USER'}
    }
)
const Basket = sequelize.define(
    'Basket',
    {
        id: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true}
    }
)
const BasketGoods = sequelize.define(
    'BasketGoods',
    {
        id: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true}
    }
)
const Liked = sequelize.define(
    'Liked',
    {
        id: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true}
    }
)
const LikedGoods = sequelize.define(
    'LikedGoods',
    {
        id: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true}
    }
)
const Goods = sequelize.define(
    'Goods',
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        title: {type: DataTypes.STRING, allowNull: false},
        content: {type: DataTypes.STRING, allowNull: true},
        price: {type: DataTypes.INTEGER, allowNull: false},
        img: {type: DataTypes.STRING, allowNull: true}
    }
)
const Catalog = sequelize.define(
    'Catalog',
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        title: {type: DataTypes.STRING, allowNull: false}
    }
)

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketGoods)
BasketGoods.belongsTo(Basket)

User.hasOne(Liked)
Liked.belongsTo(User)

Liked.hasMany(LikedGoods)
LikedGoods.belongsTo(Liked)

Goods.hasMany(BasketGoods)
BasketGoods.belongsTo(Goods)

Goods.hasMany(LikedGoods)
LikedGoods.belongsTo(Goods)

Catalog.hasMany(Goods)
Goods.belongsTo(Catalog)

export default{
    User,
    Basket,
    BasketGoods,
    Liked,
    LikedGoods,
    Goods,
    Catalog
}