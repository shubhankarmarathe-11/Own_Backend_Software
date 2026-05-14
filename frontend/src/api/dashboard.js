import api from './axios'

export const getProfile = () => api.get('/dash/profile')

export const getProjects = () => api.get('/dash/projects')

export const getProject = (id) => api.get(`/dash/project/${id}`)

export const createProject = (data) => api.post('/dash/createproject', data)
// data: { projectName }

export const deleteProject = (data) => api.delete('/dash/deleteproject', { data })
// data: { project_id }
