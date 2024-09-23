import { Link } from 'react-router-dom';
import styles from './menu.module.scss'
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { LogOut } from 'lucide-react';
import { useEffect } from 'react';
import { setUserData } from '../../../store/slice/userSlice';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface Props {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Menu({isOpen, setIsOpen}:Props){
    const state = useAppSelector(state => state.userSlice)
    const token = localStorage.getItem('token')
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(token){
            dispatch(setUserData(jwtDecode<JwtPayload>(token)))
        }
    }, [])

    const handleToken = () => {
        localStorage.removeItem('token')
        dispatch(setUserData({name: '', surname: '', email: '', role: ''}))
        location.reload()
    }

    return(
        <div className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
            <button className={styles.close} onClick={() => setIsOpen(prev => !prev)}><X/></button>
            <div className={styles.user}>
                {token ? 
                <div className={styles.info}>
                    <span>{state.UserData.email}</span>
                    <span>{state.UserData.name}</span>
                </div> 
                : 
                <nav className={styles.auth}>
                    <Link to={'/auth'} className={styles.button}>Login</Link>
                    <Link to={'/auth/registration'} className={styles.button}>Registration</Link>
                </nav>}
            </div>
            <nav className={styles.navButton}>
                <ul>
                    <Link to={'/profile'} className={styles.button}><li>Profile</li></Link>
                    <Link to={'/'} className={styles.button}><li>Main</li></Link>
                    <li>About Us</li>
                    <li>Contacts</li>
                    {token && <button onClick={handleToken}><LogOut/></button>}
                </ul>
            </nav>
        </div>
    )
}