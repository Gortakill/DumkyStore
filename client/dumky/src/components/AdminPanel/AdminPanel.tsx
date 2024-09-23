import { useCreateGoodMutation, useGetCatalogsQuery } from '../../store/api/goodsApi'
import { ICatalog } from '../../types/types'
import styles from './admin.module.scss'
import { useForm } from 'react-hook-form'
import { Catalog } from './Catalog'

type FormValues = {
    titleCatalog:string,
    title:string,
    content:string,
    price:string,
    img:string,
    catalog:string
}

export function AdminPanel(){
    const {data, isLoading} = useGetCatalogsQuery('/catalog')
    const {register, reset, formState:{errors}, handleSubmit} = useForm<FormValues>()
    const [createGood, {isSuccess}] = useCreateGoodMutation()
    const token = localStorage.getItem('token')

    const onSubmitGood = async(data: FormValues) => {
        const bodyFormData = new FormData()
        bodyFormData.append('title', data.title)
        bodyFormData.append('content', data.content)
        bodyFormData.append('price', data.price)
        bodyFormData.append('img', data.img[0])
        bodyFormData.append('CatalogId', data.catalog)
        await createGood({bodyFormData, token})
        reset()
    }

    return(
        <main>
            <form className={styles.addGood} onSubmit={handleSubmit(onSubmitGood)}>
                <h1>Create new good</h1>
                <input type="text" placeholder='Enter title for good'
                {...register('title', {required: 'Поле обязательно к заполнению'})}/>
                {errors.title?.message && <p>{errors.title.message}</p>}
                <input type="text" placeholder='Enter content for good'
                {...register('content', {required: 'Поле обязательно к заполнению'})}/>
                {errors.content?.message && <p>{errors.content.message}</p>}
                <input type="text" placeholder='Enter price for good'
                {...register('price', {required: 'Поле обязательно к заполнению'})}/>
                {errors.price?.message && <p>{errors.price.message}</p>}
                <input type="file" id='file-input' placeholder='Enter image for good' width={300} height={100} className={styles.img}
                {...register('img', {required: 'Поле обязательно к заполнению'})}/>
                {errors.img?.message && <p>{errors.img.message}</p>}
                <select {...register('catalog')}>
                    {!isLoading && data.map((el:ICatalog) => 
                    <option value={el.id} key={el.id}>
                        {el.title}
                    </option>)}
                </select>
                {errors.catalog?.message && <p>{errors.catalog.message}</p>}
                <button type='submit'>Create new Good</button>
                {isSuccess && <span>Новий товар успішно додано</span>}
            </form>
            <Catalog/>
        </main>
    )
}