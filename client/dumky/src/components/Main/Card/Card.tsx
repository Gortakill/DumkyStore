import styles from './card.module.scss'
import { Goods } from '../../../types/types'
import { Heart, ShoppingCart } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import {
    useAddLikedMutation,
    useGetGoodsQuery,
} from '../../../store/api/goodsApi'
import { useAddBasketMutation } from '../../../store/api/goodsApi'
import { useEffect } from 'react'
import { setGoods } from '../../../store/slice/goodsSlice'

export function Card() {
    const catalogId = useAppSelector((state) => state.goodsSlice.catalogId)
    const currentValue = useAppSelector((state) => state.goodsSlice.value)
    const { data, isLoading } = useGetGoodsQuery({ catalogId, currentValue })
    const [addBasket, {}] = useAddBasketMutation()
    const [addLiked, {}] = useAddLikedMutation()
    const token = localStorage.getItem('token')
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoading) {
            dispatch(setGoods(data))
        }
    }, [data])

    const handleBasket = (id: number) => {
        addBasket({ id, token })
    }
    const handleLiked = (id: number) => {
        addLiked({ id, token })
    }

    return (
        <section className={styles.card}>
            {!isLoading &&
                data.map((el: Goods) => (
                    <div key={el.id} className={styles.currentCard}>
                        <img
                            src={`https://web-production-7adcf.up.railway.app/${el.img}`}
                            alt="error"
                            width={150}
                        />
                        <h3>{el.title}</h3>
                        <div className={styles.info}>
                            <span>{el.price} грн</span>
                            <button onClick={() => handleBasket(el.id)}>
                                <ShoppingCart />
                            </button>
                            <button onClick={() => handleLiked(el.id)}>
                                <Heart />
                            </button>
                        </div>
                    </div>
                ))}
        </section>
    )
}
