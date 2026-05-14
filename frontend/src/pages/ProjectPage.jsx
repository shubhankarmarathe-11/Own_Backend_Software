import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProject } from '@/api/dashboard'
import {
  projectRegisterUser, projectUpdateUser, projectDeleteUser,
  insertData, retrieveData, updateData, deleteData
} from '@/api/project'
import { Button } from '@/components/ui/Button'
import { Input, Label, Textarea } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  Loader2, ArrowLeft, Users, Database, Info, Plus, Trash2,
  RefreshCw, Copy, Check, ChevronDown, ChevronUp
} from 'lucide-react'

function TabButton({ active, onClick, children, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
      }`}
    >
      <Icon size={15} />
      {children}
    </button>
  )
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded">
      {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
    </button>
  )
}

// ---- Overview Tab ----
function OverviewTab({ project }) {
  return (
    <div className="space-y-4">
      <Card className="glass">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: 'Project Name', value: project?.projectName },
            { label: 'Project ID', value: project?._id, mono: true },
            { label: 'Owner ID', value: project?.master_id, mono: true },
            { label: 'Created', value: project?.createdAt ? new Date(project.createdAt).toLocaleString() : 'N/A' },
          ].map(({ label, value, mono }) => (
            <div key={label} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-3 border-b border-border/50 last:border-0">
              <span className="text-sm text-muted-foreground">{label}</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${mono ? 'font-mono text-violet-400' : ''}`}>{value || 'N/A'}</span>
                {mono && value && <CopyButton text={value} />}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">Use the <strong className="text-foreground">Project ID</strong> in your app's API calls to this backend to link requests to this project.</p>
          <div className="mt-3 font-mono text-xs bg-muted/50 rounded-lg p-3 text-violet-400 break-all">
            project_id: {project?._id}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ---- Users Tab ----
function UsersTab({ projectId }) {
  const [action, setAction] = useState('register') // register | update | delete
  const [userData, setUserData] = useState('{\n  "email": "user@example.com",\n  "password": "pass1234"\n}')
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const actions = [
    { key: 'register', label: 'Register User' },
    { key: 'update', label: 'Update User' },
    { key: 'delete', label: 'Delete User' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(''); setResult(null)
    try {
      let res
      if (action === 'register') {
        res = await projectRegisterUser({ project_id: projectId, userData: JSON.parse(userData) })
      } else if (action === 'update') {
        res = await projectUpdateUser({ project_id: projectId, user_id: userId, userData: JSON.parse(userData) })
      } else {
        res = await projectDeleteUser({ project_id: projectId, user_id: userId })
      }
      setResult(res.data)
    } catch (err) {
      setError(err?.response?.data || err.message || 'Action failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Action selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {actions.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setAction(key); setResult(null); setError('') }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                action === key ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {(action === 'update' || action === 'delete') && (
            <div className="space-y-2">
              <Label>User ID</Label>
              <Input
                placeholder="user_id from registration"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
          )}

          {action !== 'delete' && (
            <div className="space-y-2">
              <Label>User Data (JSON)</Label>
              <Textarea
                className="font-mono text-xs min-h-[120px]"
                value={userData}
                onChange={(e) => setUserData(e.target.value)}
                placeholder='{"email": "...", "password": "..."}'
              />
            </div>
          )}

          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {error}
            </div>
          )}
          {result && (
            <div className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3">
              <pre className="whitespace-pre-wrap font-mono text-xs">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}

          <Button variant="gradient" className="gap-2" disabled={loading}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            {action === 'register' ? 'Register' : action === 'update' ? 'Update' : 'Delete'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

// ---- Data Tab ----
function DataTab({ projectId }) {
  const [userId, setUserId] = useState('')
  const [dataInput, setDataInput] = useState('{\n  "key": "value"\n}')
  const [dataId, setDataId] = useState('')
  const [action, setAction] = useState('insert') // insert | retrieve | update | delete
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const actions = [
    { key: 'insert', label: 'Insert' },
    { key: 'retrieve', label: 'Retrieve' },
    { key: 'update', label: 'Update' },
    { key: 'delete', label: 'Delete' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(''); setResult(null)
    try {
      let res
      if (action === 'insert') {
        res = await insertData({ project_id: projectId, user_id: userId, data: JSON.parse(dataInput) })
      } else if (action === 'retrieve') {
        res = await retrieveData({ project_id: projectId, user_id: userId })
      } else if (action === 'update') {
        res = await updateData({ project_id: projectId, user_id: userId, data_id: dataId, newdata: JSON.parse(dataInput) })
      } else {
        res = await deleteData({ project_id: projectId, user_id: userId, data_id: dataId })
      }
      setResult(res.data)
    } catch (err) {
      setError(err?.response?.data || err.message || 'Action failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Data Operations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {actions.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setAction(key); setResult(null); setError('') }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                action === key ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>User ID</Label>
            <Input
              placeholder="user_id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          {(action === 'update' || action === 'delete') && (
            <div className="space-y-2">
              <Label>Data ID</Label>
              <Input
                placeholder="data_id"
                value={dataId}
                onChange={(e) => setDataId(e.target.value)}
                required
              />
            </div>
          )}

          {(action === 'insert' || action === 'update') && (
            <div className="space-y-2">
              <Label>Data (JSON / any value)</Label>
              <Textarea
                className="font-mono text-xs min-h-[100px]"
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
              />
            </div>
          )}

          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {error}
            </div>
          )}
          {result && (
            <div className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">Response:</p>
              <pre className="whitespace-pre-wrap font-mono text-xs">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}

          <Button variant="gradient" className="gap-2" disabled={loading}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Database size={14} />}
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

// ---- Main Page ----
export default function ProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    getProject(id)
      .then((res) => setProject(res.data?.Data?.[0] || res.data?.Data || res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-10 max-w-4xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{project?.projectName || 'Project'}</h1>
        <p className="text-muted-foreground font-mono text-sm mt-1">{id}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={Info}>Overview</TabButton>
        <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={Users}>Users</TabButton>
        <TabButton active={activeTab === 'data'} onClick={() => setActiveTab('data')} icon={Database}>Data</TabButton>
      </div>

      {/* Tab content */}
      {activeTab === 'overview' && <OverviewTab project={project} />}
      {activeTab === 'users' && <UsersTab projectId={id} />}
      {activeTab === 'data' && <DataTab projectId={id} />}
    </div>
  )
}
