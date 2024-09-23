import { useCreateCatalogMutation } from '../../store/api/goodsApi'
import styles from './admin.module.scss'
import { useForm } from 'react-hook-form'

type FormCatalog = {
    titleCatalog:string
}

export function Catalog(){
    const {register, reset, formState:{errors}, handleSubmit} = useForm<FormCatalog>()
    const [createCatalog, {isSuccess}] = useCreateCatalogMutation()
    const token = localStorage.getItem('token')
    const onSubmitCatalog = (data: FormCatalog) => {
        createCatalog({body: data.titleCatalog, token})
        reset()
    }
    return(
        <form className={styles.addCatalog} onSubmit={handleSubmit(onSubmitCatalog)}>
            <h1>Create new catalog</h1>
            <input type="text" placeholder='Enter title for catalog'
            {...register('titleCatalog', {required: 'Поле обязательно к заполнению'})}/>
            {errors.titleCatalog?.message && <p>{errors.titleCatalog.message}</p>}
            <button type='submit'>Create new Catalog</button>
            {isSuccess && <span>Новий каталог успішно додано</span>}
        </form>
    )
}