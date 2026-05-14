import { useState, useEffect } from 'react'
import { getProfile, getProjects, createProject } from '@/api/dashboard'
import ProjectCard from '@/components/ProjectCard'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import {
  Loader2, Plus, X, User, Mail, Phone, FolderOpen, Folder
} from 'lucide-react'

export default function DashboardPage() {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [createLoading, setCreateLoading] = useState(false)
  const [createError, setCreateError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.all([getProfile(), getProjects()])
        setProfile(profileRes.data?.Data?.[0] || profileRes.data?.Data || profileRes.data)
        setProjects(Array.isArray(projectsRes.data?.Data) ? projectsRes.data.Data : [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleCreateProject = async (e) => {
    e.preventDefault()
    if (!newProjectName.trim()) return
    setCreateLoading(true)
    setCreateError('')
    try {
      await createProject({ projectName: newProjectName.trim() })
      const res = await getProjects()
      setProjects(Array.isArray(res.data?.Data) ? res.data.Data : [])
      setNewProjectName('')
      setShowCreate(false)
    } catch (err) {
      setCreateError(err?.response?.data || 'Failed to create project.')
    } finally {
      setCreateLoading(false)
    }
  }

  const handleDeleteProject = (deletedId) => {
    setProjects((prev) => prev.filter((p) => p._id !== deletedId))
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back{profile?.username ? `, ${profile.username}` : ''}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">Manage your projects and settings</p>
        </div>
        <Button variant="gradient" className="gap-2" onClick={() => setShowCreate(true)}>
          <Plus size={16} />
          New Project
        </Button>
      </div>

      {/* Profile Card */}
      {profile && (
        <Card className="glass mb-10">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-violet-500/20">
                  {profile.username?.[0]?.toUpperCase() || 'U'}
                </div>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm">
                  <User size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Username:</span>
                  <span className="font-medium">{profile.username}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{profile.number || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Folder size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Projects:</span>
                  <span className="font-medium">{projects.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Project Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="glass-strong rounded-2xl p-6 w-full max-w-sm border border-border/70">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-lg">Create New Project</h2>
              <button onClick={() => { setShowCreate(false); setCreateError('') }} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  placeholder="my-awesome-project"
                  value={newProjectName}
                  onChange={(e) => { setNewProjectName(e.target.value); setCreateError('') }}
                  required
                  autoFocus
                />
              </div>
              {createError && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {createError}
                </p>
              )}
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowCreate(false)}>
                  Cancel
                </Button>
                <Button variant="gradient" className="flex-1 gap-2" disabled={createLoading}>
                  {createLoading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
          <FolderOpen size={20} className="text-primary" />
          Your Projects
          <span className="text-sm font-normal text-muted-foreground">({projects.length})</span>
        </h2>

        {projects.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <Folder size={40} className="mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">No projects yet.</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Create your first project to get started.</p>
            <Button variant="gradient" className="gap-2 mt-6" onClick={() => setShowCreate(true)}>
              <Plus size={16} />
              Create Project
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} onDelete={handleDeleteProject} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
