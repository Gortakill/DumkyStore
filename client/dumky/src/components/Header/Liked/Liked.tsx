import {
    useAddBasketMutation,
    useDeleteFromLikedMutation,
    useGetLikedQuery,
} from '../../../store/api/goodsApi'
import styles from './liked.module.scss'
import { X, Trash2, ShoppingCart } from 'lucide-react'
import { Goods, ILiked } from '../../../types/types'
import { useAppSelector, useAppDispatch } from '../../../hooks/redux'
import { useEffect } from 'react'
import { setCountLiked } from '../../../store/slice/basketSlice'
import { setLiked } from '../../../store/slice/basketSlice'

interface Props {
    isOpenLiked: boolean
    setIsOpenLiked: React.Dispatch<React.SetStateAction<boolean>>
}

export function Liked({ isOpenLiked, setIsOpenLiked }: Props) {
    const goods = useAppSelector((state) => state.goodsSlice.Goods)
    const liked = useAppSelector((state) => state.basketSlice.liked)
    const token = localStorage.getItem('token')
    const { data, isLoading } = useGetLikedQuery(token)
    const [deleteLiked, {}] = useDeleteFromLikedMutation()
    const [addBasket, {}] = useAddBasketMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoading && data) {
            dispatch(
                setLiked(
                    goods.filter((el) =>
                        data.some((item: ILiked) => el.id === item.GoodId)
                    )
                )
            )
            dispatch(setCountLiked(data.length))
        }
    }, [data])

    const handleDelete = async (id: number) => {
        await deleteLiked({ id, token })
    }
    const handleBasket = async (id: number) => {
        await addBasket({ id, token })
        await deleteLiked({ id, token })
    }

    return (
        <div className={`${styles.liked} ${isOpenLiked ? styles.active : ''}`}>
            <div className={styles.like}>
                <h2>Уподобання</h2>
                <button
                    className={styles.close}
                    onClick={() => setIsOpenLiked((prev) => !prev)}
                >
                    <X />
                </button>
            </div>
            {liked.map((el: Goods) => (
                <div key={el.id} className={styles.goodsLiked}>
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
                    <button onClick={() => handleBasket(el.id)}>
                        <ShoppingCart />
                    </button>
                </div>
            ))}
        </div>
    )
}
