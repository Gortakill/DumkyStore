import styles from './login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '../../../store/api/goodsApi'

type FormValues = {
    email:string,
    password:string
}

export function Login(){
    const {register, reset, formState:{errors, isValid}, handleSubmit} = useForm<FormValues>()
    const navigate = useNavigate()
    const [login] = useLoginMutation()

    const onSubmit = async(data : FormValues) => {
        const responce = await login(data)
        if(responce.data === null){
            reset()
            return
        }else{
            localStorage.setItem('token', responce.data)
            reset()
            navigate('/', {replace: true})
        }
    }

    return(
        <form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='Enter your email' 
            {...register('email', {required: 'Поле обязательно к заполнению',
                pattern: {
                    value: /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*/,
                    message: 'Неверно введена почта'
                }
            }
            )}/>
            {errors.email?.message && <p>{errors.email.message}</p>}
            <input type="password" placeholder='Enter your password'
            {...register('password', {required: 'Поле обязательно к заполнению'})}/>
            {errors.email?.message && <p>{errors.email.message}</p>}
            <div className={styles.buttons}>
                <Link to = '/auth/registration' className={styles.reg}>Registration</Link>
                <button type='submit' disabled = {!isValid}>Login</button>
            </div>
        </form>
    )
}