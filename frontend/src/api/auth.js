import api from './axios'

export const checkToken = () => api.get('/istokenvalid')

export const destroyCookie = () => api.post('/destroycookie')

export const registerMaster = (data) => api.post('/master/register', data)
// data: { username, email, number, password }

export const loginMaster = (data) => api.post('/master/login', data)
// data: { email, password }

export const logoutMaster = () => api.post('/master/logout')

export const changeDetails = (data) => api.post('/master/changedetails', data)
// data: { username, email, number, password }

export const sendForgotPasswordEmail = (data) => api.post('/master/forgetpassword', data)
// data: { email }

export const resetPassword = (data) => api.post('/master/forgetpassword', data)
// data: { otp, newpassword }
