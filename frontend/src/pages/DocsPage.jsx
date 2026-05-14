import ApiBlock from '@/components/ApiBlock'
import { BookOpen, Globe, Shield, LayoutDashboard, Users, Database, ChevronRight, ChevronUp } from 'lucide-react'
import { useState } from 'react'

const sections = [
  {
    id: 'global',
    icon: Globe,
    title: 'Global Routes',
    color: 'text-violet-400',
    endpoints: [
      {
        method: 'GET',
        route: '/api/istokenvalid',
        description: 'Check if the current JWT cookie is valid and active.',
        params: [],
        responses: [
          { status: 201, description: 'Token is valid or active → returns True' },
          { status: 401, description: 'Token is invalid or expired → returns False' },
          { status: 400, description: 'Error in try block → "please try again"' },
        ],
      },
      {
        method: 'POST',
        route: '/api/destroycookie',
        description: 'Clear the auth cookie from the client.',
        params: [],
        responses: [
          { status: 201, description: 'Cookie cleared → returns True' },
          { status: 400, description: 'Error in try block → "please try again"' },
        ],
      },
    ],
  },
  {
    id: 'master',
    icon: Shield,
    title: 'Master Auth',
    color: 'text-blue-400',
    endpoints: [
      {
        method: 'POST',
        route: '/api/master/register',
        description: 'Register a new master user account. Creates a session cookie on success.',
        params: [
          { name: 'username', type: 'string', required: true, description: 'Display name' },
          { name: 'email', type: 'string', required: true, description: 'Valid email address' },
          { name: 'number', type: 'string', required: true, description: '10-digit phone number (no country code)' },
          { name: 'password', type: 'string', required: true, description: 'Min 8 characters' },
        ],
        responses: [
          { status: 201, description: 'User created → cookie set' },
          { status: 406, description: 'Validation error (bad email / number format / password too short)' },
          { status: 409, description: 'Email already registered' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'POST',
        route: '/api/master/login',
        description: 'Login to your master account. Creates a session cookie on success.',
        params: [
          { name: 'email', type: 'string', required: true, description: 'Valid email address' },
          { name: 'password', type: 'string', required: true, description: 'Min 8 characters' },
        ],
        responses: [
          { status: 201, description: 'Logged in → cookie set' },
          { status: 406, description: 'Invalid email format or password too short' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'POST',
        route: '/api/master/logout',
        description: 'Logout and clear the session cookie.',
        params: [],
        responses: [
          { status: 201, description: 'User logged out → cookie cleared' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'POST',
        route: '/api/master/changedetails',
        description: 'Update master account details. Clears cookie and requires re-login.',
        params: [
          { name: 'username', type: 'string', required: false, description: 'New display name' },
          { name: 'email', type: 'string', required: false, description: 'New email address' },
          { name: 'number', type: 'string', required: false, description: 'New 10-digit phone number' },
          { name: 'password', type: 'string', required: false, description: 'New password (min 8 chars)' },
        ],
        responses: [
          { status: 201, description: 'Details changed → cookie cleared, redirects to login' },
          { status: 406, description: 'New password too short' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'POST',
        route: '/api/master/forgetpassword',
        description: 'Step 1: Send OTP to registered email for password reset.',
        params: [
          { name: 'email', type: 'string', required: true, description: 'Registered email address' },
        ],
        responses: [
          { status: 201, description: 'OTP sent to registered email' },
          { status: 406, description: 'Email not found / user not registered' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'POST',
        route: '/api/master/forgetpassword',
        description: 'Step 2: Submit OTP and new password to complete password reset.',
        params: [
          { name: 'otp', type: 'string', required: true, description: 'OTP received via email' },
          { name: 'newpassword', type: 'string', required: true, description: 'New password (min 8 chars)' },
        ],
        responses: [
          { status: 201, description: 'Password changed successfully' },
          { status: 401, description: 'Wrong OTP' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
    ],
  },
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    title: 'User Dashboard',
    color: 'text-emerald-400',
    endpoints: [
      {
        method: 'GET',
        route: '/api/dash/profile',
        description: 'Get the master user profile. Requires valid session cookie.',
        params: [
          { name: 'cookie', type: 'httpOnly cookie', required: true, description: 'Sent automatically by browser' },
        ],
        responses: [
          { status: 201, description: 'Returns Data array with user profile' },
          { status: 401, description: 'Token not found / expired' },
          { status: 406, description: 'User not found' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'GET',
        route: '/api/dash/projects',
        description: 'Get all projects linked to the authenticated master user.',
        params: [
          { name: 'cookie', type: 'httpOnly cookie', required: true, description: 'Sent automatically by browser' },
        ],
        responses: [
          { status: 201, description: 'Returns Data array of all projects' },
          { status: 401, description: 'Token not found / expired' },
          { status: 406, description: 'User not found' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'GET',
        route: '/api/dash/project/:_id',
        description: 'Get details for a specific project by its ID.',
        params: [
          { name: '_id', type: 'URL param', required: true, description: 'MongoDB ObjectId of the project' },
          { name: 'cookie', type: 'httpOnly cookie', required: true, description: 'Sent automatically by browser' },
        ],
        responses: [
          { status: 201, description: 'Returns Data array with project details' },
          { status: 401, description: 'Token not found / expired' },
          { status: 406, description: 'User/project not found' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'POST',
        route: '/api/dash/createproject',
        description: 'Create a new project under the authenticated master user.',
        params: [
          { name: 'projectName', type: 'string', required: true, description: 'Unique project name for this user' },
          { name: 'cookie', type: 'httpOnly cookie', required: true, description: 'Sent automatically by browser' },
        ],
        responses: [
          { status: 201, description: 'New project created → document added to DB' },
          { status: 406, description: 'Same user already has a project with this name' },
          { status: 401, description: 'Token not found / expired' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'DELETE',
        route: '/api/dash/deleteproject',
        description: 'Delete a project and all its associated data.',
        params: [
          { name: 'project_id', type: 'string', required: true, description: 'MongoDB ObjectId of the project to delete' },
          { name: 'cookie', type: 'httpOnly cookie', required: true, description: 'Sent automatically by browser' },
        ],
        responses: [
          { status: 201, description: 'Project deleted successfully' },
          { status: 406, description: 'Project name conflict (internal check)' },
          { status: 401, description: 'Token not found / expired' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
    ],
  },
  {
    id: 'project-auth',
    icon: Users,
    title: 'In-Project Auth',
    color: 'text-pink-400',
    endpoints: [
      {
        method: 'POST',
        route: '/api/project/auth/register',
        description: 'Register a new user inside a specific project. userData can contain any fields.',
        params: [
          { name: 'project_id', type: 'string', required: true, description: 'Target project MongoDB ID' },
          { name: 'userData', type: 'object', required: true, description: 'JSON object with any user fields (e.g. email, password, name...)' },
        ],
        responses: [
          { status: 201, description: '{ message: "new user added", userid: "..." }' },
          { status: 406, description: 'Data not found / validation error' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'POST',
        route: '/api/project/auth/login',
        description: 'Login a project user. Match fields from userData defined at registration.',
        params: [
          { name: '(project-defined fields)', type: 'any', required: true, description: 'Fields matching the user record (e.g. email, password)' },
        ],
        responses: [
          { status: 201, description: 'Returns the userid of the matched user' },
          { status: 406, description: 'User not found' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'PATCH',
        route: '/api/project/auth/update',
        description: 'Update a project user\'s data fields.',
        params: [
          { name: 'project_id', type: 'string', required: true, description: 'Target project MongoDB ID' },
          { name: 'user_id', type: 'string', required: true, description: 'Target user MongoDB ID' },
          { name: 'userData', type: 'object', required: true, description: 'JSON object with fields to update' },
        ],
        responses: [
          { status: 201, description: 'User data updated' },
          { status: 406, description: 'User not found' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'DELETE',
        route: '/api/project/auth/delete',
        description: 'Remove a user from a project.',
        params: [
          { name: 'project_id', type: 'string', required: true, description: 'Target project MongoDB ID' },
          { name: 'user_id', type: 'string', required: true, description: 'Target user MongoDB ID' },
        ],
        responses: [
          { status: 201, description: 'User removed' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
    ],
  },
  {
    id: 'project-data',
    icon: Database,
    title: 'In-Project Data',
    color: 'text-amber-400',
    endpoints: [
      {
        method: 'POST',
        route: '/api/project/insert',
        description: 'Insert data for a user in a project. Data can be any type: object, array, string, boolean, number, etc.',
        params: [
          { name: 'project_id', type: 'string', required: true, description: 'Target project MongoDB ID' },
          { name: 'user_id', type: 'string', required: true, description: 'Target user MongoDB ID' },
          { name: 'data', type: 'any', required: true, description: 'Data to store (any JSON-serializable value)' },
        ],
        responses: [
          { status: 201, description: '"data inserted"' },
          { status: 406, description: 'Data insert failed' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'POST',
        route: '/api/project/update',
        description: 'Update an existing data record by data_id.',
        params: [
          { name: 'project_id', type: 'string', required: true, description: 'Target project MongoDB ID' },
          { name: 'user_id', type: 'string', required: true, description: 'Target user MongoDB ID' },
          { name: 'data_id', type: 'string', required: true, description: 'ID of the data record to update' },
          { name: 'newdata', type: 'any', required: true, description: 'Replacement data (any JSON-serializable value)' },
        ],
        responses: [
          { status: 201, description: '"data Updated"' },
          { status: 406, description: 'Data update failed' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'POST',
        route: '/api/project/retrive',
        description: 'Retrieve all data records for a user in a project.',
        params: [
          { name: 'project_id', type: 'string', required: true, description: 'Target project MongoDB ID' },
          { name: 'user_id', type: 'string', required: true, description: 'Target user MongoDB ID' },
        ],
        responses: [
          { status: 201, description: '{ data: [] } — array of data records' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
      {
        method: 'DELETE',
        route: '/api/project/delete',
        description: 'Delete a specific data record by data_id.',
        params: [
          { name: 'project_id', type: 'string', required: true, description: 'Target project MongoDB ID' },
          { name: 'user_id', type: 'string', required: true, description: 'Target user MongoDB ID' },
          { name: 'data_id', type: 'string', required: true, description: 'ID of the data record to delete' },
        ],
        responses: [
          { status: 201, description: '"data removed"' },
          { status: 400, description: 'Server error → "please try again"' },
        ],
      },
    ],
  },
]

function SectionNav({ sections, activeSection, setActiveSection }) {
  return (
    <nav className="hidden lg:block w-56 flex-shrink-0">
      <div className="sticky top-24 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-3">Sections</p>
        {sections.map(({ id, icon: Icon, title, color }) => (
          <button
            key={id}
            onClick={() => {
              setActiveSection(id)
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left ${
              activeSection === id
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            <Icon size={14} className={activeSection === id ? 'text-primary' : color} />
            {title}
          </button>
        ))}
      </div>
    </nav>
  )
}

function DocSection({ section, defaultOpen = false }) {
  const { id, icon: Icon, title, color, endpoints } = section
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section id={id} className="scroll-mt-6">
      <button
        className="w-full flex items-center justify-between gap-3 py-4 border-b border-border/50 mb-6 group"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <Icon size={20} className={color} />
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <span className="text-xs text-muted-foreground">({endpoints.length} endpoints)</span>
        </div>
        {open ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronRight size={16} className="text-muted-foreground" />}
      </button>

      {open && (
        <div className="animate-fade-in">
          {endpoints.map((ep, i) => (
            <ApiBlock key={i} {...ep} />
          ))}
        </div>
      )}
    </section>
  )
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('global')

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen size={24} className="text-primary" />
          <h1 className="text-3xl font-bold">API Reference</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Complete documentation for the NexAuth REST API. All endpoints are prefixed with{' '}
          <code className="text-violet-400 bg-muted px-1.5 py-0.5 rounded text-sm">/api</code>. 
          Auth routes use <strong>httpOnly cookies</strong> — pass <code className="text-violet-400 bg-muted px-1.5 py-0.5 rounded text-sm">withCredentials: true</code> in Axios.
        </p>

        {/* Quick note */}
        <div className="mt-6 glass rounded-xl p-4 border-l-4 border-primary/50">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Base URL:</strong>{' '}
            <code className="text-violet-400">http://localhost:3001</code> (local) |{' '}
            <strong className="text-foreground">Auth:</strong> Cookie-based (httpOnly JWT) |{' '}
            <strong className="text-foreground">Content-Type:</strong>{' '}
            <code className="text-violet-400">application/json</code>
          </p>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Sidebar */}
        <SectionNav sections={sections} activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Content */}
        <div className="flex-1 space-y-10 min-w-0">
          {sections.map((section, i) => (
            <DocSection key={section.id} section={section} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </div>
  )
}
