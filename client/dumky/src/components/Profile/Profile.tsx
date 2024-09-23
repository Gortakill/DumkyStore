import styles from './profile.module.scss'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'

export function Profile() {
    const state = useAppSelector((state) => state.basketSlice)
    const userData = useAppSelector((state) => state.userSlice.UserData)

    return (
        <main
            className={`${styles.Profile} ${
                !userData.name ? styles.nonAuth : ''
            }`}
        >
            {userData.name ? (
                <section className={styles.userInfo}>
                    <div className={styles.info}>
                        <h2>{userData.name}</h2>
                        <h2>{userData.surname}</h2>
                        <h4>{userData.email}</h4>
                        <Link to={'/profile/update'} className={styles.button}>
                            Змінити данні користувача
                        </Link>
                    </div>
                    <div className={styles.basket}>
                        <h1>Кошик</h1>
                        {state.basket.map((el) => (
                            <div key={el.id} className={styles.currentGood}>
                                <img
                                    src={`https://web-production-7adcf.up.railway.app/${el.img}`}
                                    alt="error"
                                    width={50}
                                />
                                <div className={styles.info}>
                                    <h3>{el.title}</h3>
                                    <span>{el.price} грн</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.liked}>
                        <h1>Уподобання</h1>
                        {state.liked.map((el) => (
                            <div key={el.id} className={styles.currentGood}>
                                <img
                                    src={`https://web-production-7adcf.up.railway.app/${el.img}`}
                                    alt="error"
                                    width={50}
                                />
                                <div className={styles.info}>
                                    <h3>{el.title}</h3>
                                    <span>{el.price} грн</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                <div className={styles.buttonAuth}>
                    <h2>Ви не авторизовані, увійдіть або зарегеструйтесь</h2>
                    <Link to={'/auth'} className={styles.button}>
                        Login
                    </Link>
                    <Link to={'/auth/registration'} className={styles.button}>
                        Registration
                    </Link>
                </div>
            )}
        </main>
    )
}
