import { Types } from "../types";


export const categoryReducer = (data = [] , action) =>{
    switch (action.type){
        case Types.GET_CATEGORY :
            return action.payload.categories
        case Types.ERROR_CATEGORY :
            return action.payload.message
        default :
            return data;
    }
}


export const productReducer = (data = [] , action) =>{
    switch (action.type){
        case Types.GET_PRODUCT :
            return action.payload.products
        case Types.SET_PRODUCT :
                localStorage.setItem('products' , JSON.stringify(action.payload.products))
                return action.payload.products
        case Types.ERROR_PRODUCT :
            return action.payload.message
        default :
            return data;
    }
}