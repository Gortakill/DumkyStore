import styles from './registration.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form' 
import { useRegistrationMutation } from '../../../store/api/goodsApi'


type FormValues = {
    name:string,
    surname:string,
    email:string,
    password:string
}

export function Registration(){
    const [registration, {}] = useRegistrationMutation()
    const {register, formState: {errors, isValid}, reset, handleSubmit} = useForm<FormValues>()
    const navigate = useNavigate()

    const onSubmit = async(data: FormValues) => {
        const responce = await registration(data)
        localStorage.setItem('token', responce.data)
        reset()
        navigate('/', {replace: true})
    }
    return(
        <form className={styles.registration} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input type="text" placeholder='Enter your name'
                {...register('name', {required: 'Поле обязательно к заполнению'})}/>
                {errors?.name && <p>{errors.name.message}</p>}
            </div>
            <div>
                <input type="text" placeholder='Enter your surname'
                {...register('surname', {required: 'Поле обязательно к заполнению'})}/>
                {errors?.surname && <p>{errors.surname.message}</p>}
            </div>
            <div>
                <input type="text" placeholder='Enter your email'
                {...register('email', {required: 'Поле обязательно к заполнению',
                    pattern: {
                        value: /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*/,
                        message: 'Неверно введена почта'
                    }
                })}/>
                {errors?.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <input type="password" placeholder='Enter your password'
                {...register('password', {required: 'Поле обязательно к заполнению',
                    minLength: {
                        value: 5,
                        message: 'Минимум должно быть 5 символов'
                    }
                })}/>
                {errors?.password && <p>{errors.password.message}</p>}
            </div>

            <div className={styles.buttons}>
                <Link to = '/auth' className={styles.login}>Login</Link>
                <button disabled={!isValid} type='submit'>Registration</button>
            </div>
        </form>
    )
}