import styles from './update.module.scss'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useUpdateMutation } from '../../../store/api/goodsApi'

type FormValues = {
    name:string,
    surname:string
}

export function UpdateProfile(){
    const {register, reset, formState:{errors, isValid}, handleSubmit} = useForm<FormValues>()
    const token = localStorage.getItem('token')
    const [update, {}] = useUpdateMutation()
    const navigate = useNavigate()

    const onSubmit = async(data : FormValues) => {
        const responce = await update({token, ...data})
        localStorage.setItem('token', responce.data)
        reset()
        navigate('/profile', {replace: true})
    }

    return(
        <form className={styles.updateProfile} onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='Enter your updated name'
            {...register('name', {required: 'Поле обязательно к заполнению'})}/>
            {errors.name?.message && <p>{errors.name.message}</p>}
            <input type="text" placeholder='Enter your updated surname'
            {...register('surname', {required: 'Поле обязательно к заполнению'})}/>
            {errors.surname?.message && <p>{errors.surname.message}</p>}
            <button type='submit' disabled = {!isValid}>Змінити данні</button>
        </form>
    )
}