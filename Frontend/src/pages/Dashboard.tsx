import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { FolderOpen, Plus, Search, Trash2, ArrowRight, Users, Calendar, Activity, LogOut } from 'lucide-react';
import { useAuthStore } from '../lib/store';

interface Project {
  _id: string;
  Name: string;
  createdAt: string;
  updatedAt: string;
  ProjectUsers?: any[];
}

export function Dashboard() {
  const [data, setData] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const setLoggedIn = useAuthStore((s) => s.setLoggedIn);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/project/getprojects');
      if (res.data && res.data.data) {
        setProjects(res.data.data);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/global');
        setData(res.data);
        await fetchProjects();
      } catch (err) {
        // Interceptor already set isLoggedIn=false on 401 "Invalid token";
        // ProtectedRoute in App.tsx will redirect to /login automatically.
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/master/logout');
    } catch (err) {
      console.error(err);
    } finally {
      setLoggedIn(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    try {
      await api.delete('/master/delete');
      setLoggedIn(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete account");
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    setCreating(true);
    try {
      await api.post('/project/createproject', { projectName: newProjectName });
      setNewProjectName('');
      await fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProject = async (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/project/deleteproject/${projectId}`);
      await fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  const filteredProjects = projects.filter(p =>
    p.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUsers = projects.reduce((sum, p) => sum + (p.ProjectUsers?.length || 0), 0);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-900 font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-black animate-spin shadow-sm"></div>
          <span className="text-gray-500 font-medium">Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center text-white font-bold text-lg shadow-md">
              B
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">BAAS Platform</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
              <Activity className="h-3.5 w-3.5 text-green-500" />
              <span className="text-xs text-gray-500 font-mono">{data || 'connected'}</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium rounded-full gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your projects and backend services.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Projects</p>
              <div className="h-8 w-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                <FolderOpen className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-gray-900">{projects.length}</p>
            <p className="text-xs text-gray-400 mt-1">active projects</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Users</p>
              <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                <Users className="h-4 w-4 text-blue-500" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-gray-900">{totalUsers}</p>
            <p className="text-xs text-gray-400 mt-1">across all projects</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Activity</p>
              <div className="h-8 w-8 bg-green-50 rounded-lg flex items-center justify-center border border-green-100">
                <Calendar className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <p className="text-lg font-bold text-gray-900 truncate">
              {projects.length > 0
                ? new Date(
                    Math.max(...projects.map(p => new Date(p.updatedAt).getTime()))
                  ).toLocaleDateString()
                : '—'
              }
            </p>
            <p className="text-xs text-gray-400 mt-1">most recent update</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Projects Table — spans 2 cols */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Your Projects</h2>
                {projects.length > 0 && (
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">
                    {filteredProjects.length} of {projects.length}
                  </span>
                )}
              </div>
              {projects.length > 0 && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-9 rounded-xl border-gray-200 bg-gray-50 focus:bg-white text-sm h-9"
                  />
                </div>
              )}
            </div>

            {filteredProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6">
                <div className="h-14 w-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-dashed border-gray-200">
                  <FolderOpen className="h-6 w-6 text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-500">
                  {searchQuery ? 'No projects match your search.' : "You don't have any projects yet."}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-gray-400 hover:text-gray-600 mt-1 underline underline-offset-2"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                      <TableHead className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Created</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Users</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project) => (
                      <TableRow
                        key={project._id}
                        className="cursor-pointer group hover:bg-blue-50/40 transition-colors"
                        onClick={() => navigate(`/project/${project._id}`)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <div className="h-7 w-7 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                              <FolderOpen className="h-3.5 w-3.5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <span className="font-semibold text-gray-800 text-sm">{project.Name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-500">
                            {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full text-xs border border-blue-100">
                            <Users className="h-3 w-3" />
                            {project.ProjectUsers?.length || 0}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); navigate(`/project/${project._id}`); }}
                              className="h-7 px-2.5 text-xs text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => handleDeleteProject(project._id, e)}
                              className="h-7 px-2.5 text-xs text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Create Project */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-1">New Project</h2>
              <p className="text-xs text-gray-400 mb-4">Create a new backend project to get started.</p>
              <form onSubmit={handleCreateProject} className="flex flex-col gap-3">
                <Input
                  placeholder="Project name..."
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="rounded-xl border-gray-200 bg-gray-50 focus:bg-white text-sm"
                  required
                />
                <Button
                  type="submit"
                  disabled={creating}
                  className="w-full rounded-xl bg-black hover:bg-gray-800 text-white font-semibold gap-2 shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  {creating ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  {creating ? 'Creating...' : 'Create Project'}
                </Button>
              </form>
            </div>

            {/* API Status */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">API Status</h2>
              <div className="bg-gray-950 rounded-xl p-4 font-mono text-xs text-gray-400 border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.7)]"></div>
                  <span className="text-gray-500">GET /api/global</span>
                </div>
                <div className="text-green-400 font-semibold">{data || 'Connected'}</div>
              </div>
            </div>

            {/* Quick Reference */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-3">Quick Reference</h2>
              <div className="space-y-2.5">
                {[
                  { method: 'POST', path: '/project/createproject', color: 'bg-green-50 text-green-700 border-green-100' },
                  { method: 'GET', path: '/project/getprojects', color: 'bg-blue-50 text-blue-700 border-blue-100' },
                  { method: 'GET', path: '/project/:PuserId', color: 'bg-blue-50 text-blue-700 border-blue-100' },
                  { method: 'DELETE', path: '/project/deleteproject/:id', color: 'bg-red-50 text-red-700 border-red-100' },
                ].map((ep, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded border shrink-0 ${ep.color}`}>
                      {ep.method}
                    </span>
                    <code className="text-xs text-gray-500 font-mono truncate">{ep.path}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-6 bg-white rounded-2xl border border-red-100 shadow-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-400 rounded-l-2xl"></div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pl-3">
            <div>
              <h2 className="text-sm font-bold text-red-600 mb-0.5">Danger Zone</h2>
              <p className="text-xs text-gray-400">Permanently remove your account and all associated data. This cannot be undone.</p>
            </div>
            <Button
              onClick={handleDeleteAccount}
              variant="destructive"
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl px-5 shadow-sm shadow-red-200 hover:-translate-y-0.5 active:translate-y-0 transition-all shrink-0"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
