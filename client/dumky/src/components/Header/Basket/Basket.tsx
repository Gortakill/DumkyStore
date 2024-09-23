import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../hooks/redux'
import {
    useDeleteFromBasketMutation,
    useGetBasketQuery,
} from '../../../store/api/goodsApi'
import { IBasket, Goods } from '../../../types/types'
import styles from './basket.module.scss'
import { Trash2, X } from 'lucide-react'
import { setCountBasket } from '../../../store/slice/basketSlice'
import { setBasket } from '../../../store/slice/basketSlice'

interface Props {
    isOpenBasket: boolean
    setIsOpenBasket: React.Dispatch<React.SetStateAction<boolean>>
}

export function Basket({ isOpenBasket, setIsOpenBasket }: Props) {
    const goods = useAppSelector((state) => state.goodsSlice.Goods)
    const basket = useAppSelector((state) => state.basketSlice.basket)
    const token = localStorage.getItem('token')
    const { data, isLoading } = useGetBasketQuery(token)
    const [deleteGoods, {}] = useDeleteFromBasketMutation()
    const [price, setPrice] = useState(0)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoading && data) {
            dispatch(
                setBasket(
                    goods.filter((el) =>
                        data.some((item: IBasket) => item.GoodId === el.id)
                    )
                )
            )
            dispatch(setCountBasket(data.length))
        }
    }, [data])
    const initialValue = 0
    useEffect(() => {
        setPrice(
            basket.reduce((accum, curr) => accum + curr.price, initialValue)
        )
    }, [basket])

    const handleDelete = async (id: number) => {
        await deleteGoods({ id, token })
    }

    return (
        <div
            className={`${styles.basket} ${isOpenBasket ? styles.active : ''}`}
        >
            <div className={styles.bask}>
                <h2>Кошик</h2>
                <button
                    className={styles.close}
                    onClick={() => setIsOpenBasket((prev) => !prev)}
                >
                    <X />
                </button>
            </div>
            {basket.map((el: Goods) => (
                <div key={el.id} className={styles.goodsBasket}>
                    <img
                        src={`https://web-production-7adcf.up.railway.app/${el.img}`}
                        alt="error"
                        width={50}
                    />
                    <div className={styles.info}>
                        <h3>{el.title}</h3>
                        <span>{el.price} грн</span>
                    </div>
                    <button onClick={() => handleDelete(el.id)}>
                        <Trash2 />
                    </button>
                </div>
            ))}
            <span>Загальна сума: {price} грн</span>
        </div>
    )
}
