import { Types } from "../types"
import { ProductCategories } from "../../const/data"
import domainFinder from "../../api/api"
import NotificationSet from "../../utils/notification"



export const getCategory = () => {
    return {
        type: Types.GET_CATEGORY,
        payload: {
            categories:ProductCategories
        }
    }
}



export const getProduct = () => async (dispatch) => {
    await domainFinder.get('/products').then((response)=>{
        dispatch({
            type: Types.GET_PRODUCT,
            payload: {
                products:  response.data
            }
        })
    }).catch((error)=>{
        dispatch({
            type: Types.ERROR_PRODUCT,
            payload: {
               message:error.response.message
            }
        })
    })
}


export const addProduct = (product) => async (dispatch) => {
    await domainFinder.post('/products' , product).then((response)=>{
        NotificationSet('Successfully created' , 'success')
        dispatch(getProduct())
    }).catch((error)=>{
        dispatch({
            type: Types.ERROR_PRODUCT,
            payload: {
               message:error.response.message
            }
        })
    })
}



export const deleteProduct = (id) => async (dispatch) =>  {
    await domainFinder.delete(`/products/${id}`).then((response)=>{
        dispatch(getProduct())
        NotificationSet('Successfully deleted' , 'success')
    }).catch((error)=>{
        NotificationSet('problem var' , 'error' , error.response.message)
        dispatch({
            type: Types.ERROR_PRODUCT,
            payload: {
               message:error.response.message
            }
        })
    })
}


export const editProduct = (product) => async (dispatch) => {
    await domainFinder.put(`/products/${product.id}` , product).then((response)=>{
        dispatch(getProduct())
        NotificationSet(`Successfully edited ${response.data.name}` , 'success')
    }).catch((error)=>{
        dispatch({
            type: Types.ERROR_PRODUCT,
            payload: {
               message:error.response.message
            }
        })
    })
}

