import { $authHost, $host } from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, password, name, surname, phoneNumber) => {
  try {
      const { data } = await $host.post('api/user/registration', {
          email,
          password,
          name,
          surname,
          phoneNumber,
          role: 'USER',
          isActivated: false
      });
      if (data && data.token) {
          localStorage.setItem('token', data.token);
          return jwtDecode(data.token);
      } else {
          throw new Error("Token not received");
      }
  } catch (error) {
      throw error;
  }
};

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const getUserInfo = async () => {
    const { data } = await $authHost.get('api/user/account');
    return data;
};

export const updateUserInfo = async (userInfo) => {
    try {
        const { data } = await $authHost.put('api/user/account', userInfo);
        return data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const updatePassword = async (oldPassword, newPassword, confirmPassword) => {
    try {
      const { data } = await $authHost.put('api/user/account/password', { oldPassword, newPassword, confirmPassword });
      localStorage.setItem('token', data.token);
      return jwtDecode(data.token);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

export const updateEmail = async (email) => {
    const { data } = await $authHost.put('api/user/account/email', { email });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const activateAccount = async (userId) => {
    const { data } = await $host.get(`api/user/activate/${userId}`);
    return data;
};

export const resetPasswordRequest = async (email) => {
    const { data } = await $host.post('api/user/reset-password-request', { email });
    return data;
};

export const resetPassword = async (resetToken, password) => {
    const { data } = await $host.put('api/user/reset-password', { resetToken, password });
    return data;
};
export const getOrders = async () => {
    try {
      const response = await $authHost.get('/api/orders');
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении заказов:', error);
      throw error;
    }
  };
  
