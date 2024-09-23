import { useGetCatalogsQuery } from '../../store/api/goodsApi'
import styles from './main.module.scss'
import { ICatalog } from '../../types/types'
import { Card } from './Card/Card'
import { useAppDispatch } from '../../hooks/redux'
import { setCatalogId } from '../../store/slice/goodsSlice'

export function Main() {
    const { data, isLoading } = useGetCatalogsQuery('/catalog')
    const dispatch = useAppDispatch()

    return (
        <main>
            <section className={styles.catalog}>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    data.map((el: ICatalog) => (
                        <ul key={el.id}>
                            <li>
                                <button
                                    onClick={() =>
                                        dispatch(setCatalogId(el.id))
                                    }
                                >
                                    {el.title}
                                </button>
                            </li>
                        </ul>
                    ))
                )}
            </section>
            <Card />
        </main>
    )
}
