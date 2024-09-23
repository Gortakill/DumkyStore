import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const goodsApi = createApi({
    reducerPath: 'goods',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_APP_BASE_PATH}),
    tagTypes: ['basket', 'liked', 'catalog', 'goods'],
    endpoints: builder => ({
        getCatalogs: builder.query({
            query: (name) => name,
            providesTags: ['catalog']
        }),
        getGoods: builder.query({
            query: ({catalogId, currentValue}) => ({
                url: '/goods',
                method: 'GET',
                params: {
                    id: catalogId,
                    value: currentValue
                }
            }),
            providesTags: ['goods']
        }),
        registration: builder.mutation({
            query: (body) => ({
                url: '/registration',
                method: 'POST',
                body
            })
        }),
        login: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            })
        }),
        addBasket: builder.mutation({
            query: ({id, token}) => ({
                url: '/basket',
                method: 'POST',
                params: {
                    id
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ['basket']
        }),
        getBasket: builder.query({
            query: (token) => ({
                url: '/basket',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            providesTags: ['basket']
        }),
        deleteFromBasket: builder.mutation({
            query: ({id, token}) => ({
                url: '/basket',
                method: 'DELETE',
                params: {
                    id
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ['basket']
        }),
        addLiked: builder.mutation({
            query: ({id, token}) => ({
                url: '/liked',
                method: 'POST',
                params: {
                    id
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ['liked']
        }),
        getLiked: builder.query({
            query: (token) => ({
                url: '/liked',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            providesTags:['liked']
        }),
        deleteFromLiked: builder.mutation({
            query: ({id, token}) => ({
                url: '/liked',
                method: 'DELETE',
                params: {
                    id
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ['liked']
        }),
        update: builder.mutation({
            query: ({token, ...body}) => ({
                url: '/update',
                method: 'PATCH',
                body,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
        createCatalog: builder.mutation({
            query: ({body, token}) => ({
                url: '/catalog',
                method: 'POST',
                body:{
                    title: body
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ['catalog']
        }),
        createGood: builder.mutation({
            query: ({bodyFormData, token}) => {
                return{
                    url:'/goods',
                    method:'POST',
                    body: bodyFormData,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    formData: true
                }},
                invalidatesTags: ['goods']
        })
    })
})

export const 
{useGetCatalogsQuery, 
useGetGoodsQuery, 
useRegistrationMutation, 
useLoginMutation, 
useAddBasketMutation,
useGetBasketQuery,
useDeleteFromBasketMutation,
useAddLikedMutation,
useGetLikedQuery,
useDeleteFromLikedMutation,
useUpdateMutation,
useCreateCatalogMutation,
useCreateGoodMutation} = goodsApi