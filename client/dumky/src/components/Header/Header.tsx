import { AlignJustify } from 'lucide-react';
import { Heart } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { Search } from 'lucide-react';
import styles from './header.module.scss'
import { Menu } from './Menu/Menu';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Basket } from './Basket/Basket';
import { Liked } from './Liked/Liked';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setValue } from '../../store/slice/goodsSlice';

export function Header(){
    const [isOpen, setIsOpen] = useState(true)
    const [isOpenLiked, setIsOpenLiked] = useState(false)
    const [isOpenBasket, setIsOpenBasket] = useState(false)
    const value = useAppSelector(state => state.goodsSlice.value)
    const count = useAppSelector(state => state.basketSlice)
    const user = useAppSelector(state => state.userSlice.UserData)
    const dispatch = useAppDispatch()

    return(
        <header>
            <Menu isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className={styles.Menu}>
                <button onClick={() => setIsOpen(prev => !prev)}><span>Menu</span><AlignJustify/></button>
                {user.role === 'ADMIN' && <Link to={'/adminPanel'} className={styles.admin}>Admin Panel</Link>}
            </div>
            <h1 className={styles.Title}><Link to='/'>Dumky Store</Link></h1>
            <section className={styles.Info}>
                <form className={styles.Form}>
                    <button><Search/></button>
                    <input type="text" placeholder='Search your product' value={value}
                    onChange={e => dispatch(setValue(e.target.value))}/>
                </form>
                <button onClick={() => setIsOpenLiked(prev => !prev)}><Heart/>
                    <div className={styles.countLike}>{count.countLiked}</div>
                </button>
                <button onClick={() => setIsOpenBasket(prev => !prev)}><ShoppingCart/>
                    <div className={styles.countCart}>{count.countBasket}</div>
                </button>
            </section>
            <Liked isOpenLiked = {isOpenLiked} setIsOpenLiked = {setIsOpenLiked}/>
            <Basket isOpenBasket = {isOpenBasket} setIsOpenBasket = {setIsOpenBasket}/>
        </header>
    )
}