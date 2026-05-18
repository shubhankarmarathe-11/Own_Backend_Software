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
  const navigate = useNavigate();

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
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post('/master/logout');
      navigate('/login');
    } catch (err) {
      console.error(err);
      navigate('/login');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    
    try {
      await api.delete('/master/delete');
      navigate('/login');
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

  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      await api.delete(`/project/deleteproject/${projectId}`);
      await fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-900 font-sans">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-black animate-spin mb-4 shadow-sm"></div>
          <span className="text-gray-500 font-medium">Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 p-8 font-sans relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent -z-10"></div>
      
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-6 bg-white/50 backdrop-blur-md rounded-2xl px-6 pt-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-black flex items-center justify-center text-white font-bold text-xl shadow-md">
              B
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold transition-colors rounded-xl px-6">
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
            </div>
            
            {projects.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500 mb-4">You don't have any projects yet.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project._id} className="cursor-pointer group" onClick={() => navigate(`/project/${project._id}`)}>
                      <TableCell className="font-medium">{project.Name}</TableCell>
                      <TableCell>{new Date(project.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center justify-center bg-blue-100 text-blue-700 font-bold px-2.5 py-0.5 rounded-full text-xs">
                          {project.ProjectUsers ? project.ProjectUsers.length : 0}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={(e) => { e.stopPropagation(); handleDeleteProject(project._id); }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Create Project</h2>
              <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
                <Input 
                  placeholder="Enter project name..." 
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="rounded-xl"
                  required
                />
                <Button type="submit" disabled={creating} className="w-full rounded-xl shadow-md">
                  {creating ? "Creating..." : "Create New Project"}
                </Button>
              </form>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md transition-shadow hover:shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-900">API Connectivity</h2>
              <div className="bg-gray-50 rounded-xl p-6 font-mono text-sm text-gray-800 border border-gray-200 overflow-auto shadow-inner flex items-start gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-green-500 animate-pulse shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <div>
                  <p className="text-gray-500 mb-2">// Response from GET /api/global</p>
                  <div className="font-semibold text-black">{data || 'No data received'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-red-100 shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
          <h2 className="text-xl font-bold mb-2 text-red-600">Danger Zone</h2>
          <p className="text-sm text-gray-500 mb-6">Permanently remove your account and all associated data. This action cannot be undone.</p>
          <Button onClick={handleDeleteAccount} variant="destructive" className="bg-red-600 hover:bg-red-700 text-white font-bold transition-all rounded-xl px-8 shadow-md shadow-red-200 hover:-translate-y-0.5">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
