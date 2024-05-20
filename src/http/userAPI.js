import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, password, name, surname, phoneNumber) => {
    const {data} = await $host.post('api/user/registration', {
        email,
        password,
        name,
        surname,
        phoneNumber,
        role: 'USER'
    });
    localStorage.setItem('token', data.token);       
    return jwtDecode(data.token);
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
export const getUserInfo = async () => {
    const {data} = await $authHost.get('api/user/account');
    return data;
}

export const updateUserInfo = async (userInfo) => {
  try {
    const { data } = await $authHost.put('api/user/account', userInfo);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const updatePassword = async (password, confirmPassword) => {
  const { data } = await $authHost.put('api/user/account/password', { password, confirmPassword });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
}

export const updateEmail = async (email) => {
  const { data } = await $authHost.put('api/user/account/email', { email });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
}

