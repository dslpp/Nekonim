import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type);
    return data;
};

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type');
    return data;
};

export const deleteType = async (typeId) => { 
    const { data } = await $authHost.delete(`api/type/${typeId}`);
    return data;
};

export const changeType = async (typeId, newName) => { 
    const { data } = await $authHost.patch(`api/type/${typeId}`, { name: newName });
    return data;
};

export const createProducts = async (products) => {
    const {data} = await $authHost.post('api/products', products);     
    return data;
};

export const fetchProducts = async (typeId, page, limit = 8, sortByPrice = null) => {
    const params = { typeId, page, limit };
    if (sortByPrice) {
        params.sortByPrice = sortByPrice;
    }
    const { data } = await $host.get('api/products', { params });
    return data;
};

export const fetchOneProducts = async (id) => {
    const {data} = await $host.get(`api/products/${id}`);
    return data;
};

export const updateProducts = async (id, products) => {
    const {data} = await $authHost.patch(`api/products/${id}`, products);
    return data;
};

export const deleteProducts = async (id) => {
    const { data } = await $authHost.delete(`api/products/${id}`);
    return data;
};

export const addToBasket = async (productId) => {
    const {response} = await $authHost.post('api/basket', productId);
    return response;
};

export const getBasket = async () => {
    const {data} = await $authHost.get('api/basket');
    return data;
};

export const deleteFromBasket = async (basketId) => {
    const { data } = await $authHost.delete(`api/basket/${basketId}`);
    return data;
};

export const incrementQuantity = async (basketId) => {
    const { data } = await $authHost.put(`api/basket/increment/${basketId}`);
    return data;
};

export const decrementQuantity = async (basketId) => {
    const { data } = await $authHost.put(`api/basket/decrement/${basketId}`);
    return data;
};

export const searchProducts = async (searchQuery) => {
    const { data } = await $authHost.post("api/products/search", { searchQuery });
    return data;
};

export const addReview = async (review) => {
    const { data } = await $authHost.post('api/review', review);
    return data;
};

export const fetchReviews = async (productId) => {
    const { data } = await $host.get(`api/review/${productId}`);
    return data;
};
export const deleteReview = async (reviewId) => {
    try {
      const { data } = await $authHost.delete(`api/review/${reviewId}`);
      return data;
    } catch (error) {
      console.error('Failed to delete review:', error);
      throw error; // Либо обработка ошибки, как вам угодно
    }
  };

export const fetchInfo = async (productId) => {
    const { data } = await $host.get(`api/products/${productId}/info`);
    return data;
};

export const createInfo = async (infoData) => {
    const { data } = await $authHost.post('api/products/info', infoData);
    return data;
  };
  
export const deleteInfo = async (id) => {
    const { data } = await $authHost.delete(`api/products/info/${id}`);
    return data;
  };

export const updateInfo = async (infoId, updatedInfo) => {
    const { data } = await $authHost.patch(`api/products/info/${infoId}`, updatedInfo);
    return data;
};


