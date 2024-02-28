import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
   
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const deleteType = async (typeId) => { 
    const { data } = await $authHost.delete(`api/type/${typeId}`);
    return data;
};
export const changeType = async (typeId, newName) => { 
    const { data } = await $authHost.patch(`api/type/${typeId}`, { name: newName });
    return data;
};


export const createProducts = async (products) => {
    const {data} = await $authHost.post('api/products', products)     
    return data
}

export const fetchProducts = async () => {
    const {data} = await $host.get('api/products')
    return data
}
export const fetchOneProducts = async (id) => {
    const {data} = await $host.get('api/products/'+id)
    return data
}
export const updateProducts = async (id, products) => {
    const {data} = await $authHost.patch(`api/products/${id}`, products);
    return data;
};
export const deleteProducts = async (id) => {
    const { data } = await $authHost.delete(`api/products/${id}`);
    return data;
};


export const addToBasket = async (productId) => {
    const {response} = await $authHost.post('api/basket', productId)
    return response
}

export const getBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}
export const deleteFromBasket = async (basketId) => {
    const { data } = await $authHost.delete(`api/basket/${basketId}`);
    return data;
};
