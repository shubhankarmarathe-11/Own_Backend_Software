import api from './axios'

// --- Project Auth ---

export const projectRegisterUser = (data) => api.post('/project/auth/register', data)
// data: { project_id, userData: {} }

export const projectLoginUser = (data) => api.post('/project/auth/login', data)

export const projectUpdateUser = (data) => api.patch('/project/auth/update', data)
// data: { project_id, user_id, userData: {} }

export const projectDeleteUser = (data) => api.delete('/project/auth/delete', { data })
// data: { project_id, user_id }

// --- Project Data ---

export const insertData = (data) => api.post('/project/insert', data)
// data: { project_id, user_id, data: any }

export const updateData = (data) => api.post('/project/update', data)
// data: { project_id, user_id, data_id, newdata: any }

export const retrieveData = (data) => api.post('/project/retrive', data)
// data: { project_id, user_id }

export const deleteData = (data) => api.delete('/project/delete', { data })
// data: { project_id, user_id, data_id }
