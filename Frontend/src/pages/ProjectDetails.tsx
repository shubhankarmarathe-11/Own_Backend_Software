import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { Button } from '../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { X, Search, Code, Shield, Key, Users, ArrowLeft, BookOpen } from 'lucide-react';

// ProjectUsers embedded in project doc only has UserId (= PuserId = ProjectUserModel._id) and publicKey
interface ProjectUser {
  _id: string;       // subdoc _id
  UserId: string;   // this is the ProjectUserModel._id (PuserId)
  publicKey: string;
}

interface ProjectDetail {
  _id: string;
  Name: string;
  createdAt: string;
  updatedAt: string;
  ProjectUsers: ProjectUser[];
}

// Full ProjectUserModel doc returned by GET /project/:PuserId
interface FullProjectUser {
  _id: string;
  Project_id: string;
  Project_Creator: string;
  AuthData: Record<string, any>;
  Data: string;
  publicKey: string;
  createdAt: string;
  updatedAt: string;
}

const UserDataModal = ({
  user,
  onClose,
}: {
  user: ProjectUser;
  onClose: () => void;
}) => {
  const [fullData, setFullData] = useState<FullProjectUser | null>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'auth' | 'data' | 'keys'>('auth');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setFetching(true);
        // Use the new GET /project/:PuserId endpoint
        const res = await api.get(`/project/${user.UserId}`);
        // console.log(res.data.data);
        
        // The controller returns the Mongoose document directly via `return FetchUser`
        setFullData(res.data.data);
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setFetching(false);
      }
    };
    fetchUserData();
  }, [user.UserId]);

  const parsedData = (() => {
    try {
      return JSON.stringify(JSON.parse(fullData?.Data || '{}'), null, 2);
    } catch {
      return fullData?.Data || '{}';
    }
  })();

  const tabs: { id: 'auth' | 'data' | 'keys'; label: string; icon: React.ReactNode }[] = [
    { id: 'auth', label: 'Auth Data', icon: <Shield className="h-3.5 w-3.5" /> },
    { id: 'data', label: 'User Data', icon: <Code className="h-3.5 w-3.5" /> },
    { id: 'keys', label: 'Public Key', icon: <Key className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/60">
          <div>
            <h3 className="text-base font-bold text-gray-900">User Inspection</h3>
            <p className="text-xs text-gray-400 font-mono mt-0.5 truncate max-w-[340px]">
              PuserId: {user.UserId}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {fetching ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 rounded-full border-4 border-gray-200 border-t-black animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 gap-2">
            <div className="h-10 w-10 bg-red-50 rounded-full flex items-center justify-center">
              <X className="h-5 w-5 text-red-400" />
            </div>
            <p className="text-sm text-red-500 font-medium">{error}</p>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-white px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-3.5 text-xs font-semibold border-b-2 transition-colors -mb-px ${
                    activeTab === tab.id
                      ? 'border-black text-gray-900'
                      : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
              {activeTab === 'auth' && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 text-indigo-500" />
                    <h4 className="text-sm font-semibold text-gray-700">Authentication Data</h4>
                  </div>
                  <pre className="bg-gray-950 text-gray-100 p-4 rounded-xl overflow-x-auto text-xs font-mono border border-gray-800 leading-relaxed">
                    <code>{JSON.stringify(fullData?.AuthData || {}, null, 2)}</code>
                  </pre>
                  {fullData?.createdAt && (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-xl border border-gray-100 p-3">
                        <p className="text-xs text-gray-400 mb-0.5 font-semibold uppercase tracking-wider">Registered</p>
                        <p className="text-sm font-medium text-gray-700">
                          {new Date(fullData.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-100 p-3">
                        <p className="text-xs text-gray-400 mb-0.5 font-semibold uppercase tracking-wider">Last Updated</p>
                        <p className="text-sm font-medium text-gray-700">
                          {new Date(fullData.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'data' && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="h-4 w-4 text-emerald-500" />
                    <h4 className="text-sm font-semibold text-gray-700">Custom User Data</h4>
                  </div>
                  <pre className="bg-gray-950 text-gray-100 p-4 rounded-xl overflow-x-auto text-xs font-mono border border-gray-800 leading-relaxed">
                    <code>{parsedData || '{}'}</code>
                  </pre>
                </div>
              )}

              {activeTab === 'keys' && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Key className="h-4 w-4 text-amber-500" />
                    <h4 className="text-sm font-semibold text-gray-700">RSA Public Key</h4>
                  </div>
                  <pre className="bg-gray-950 text-gray-100 p-4 rounded-xl overflow-x-auto text-xs font-mono border border-gray-800 leading-relaxed whitespace-pre-wrap break-all">
                    <code>{fullData?.publicKey || user.publicKey || 'No key available'}</code>
                  </pre>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<ProjectUser | null>(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const res = await api.get(`/project/getprojectdetail/${id}`);
        if (res.data && res.data.data) {
          setProject(res.data.data);
        } else {
          setProject(null);
        }
      } catch (err) {
        console.error("Failed to fetch project details", err);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-black animate-spin shadow-sm"></div>
          <span className="text-gray-500 font-medium text-sm">Loading project details...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Project not found</h2>
          <p className="text-gray-500 text-sm mb-6">This project may have been deleted or doesn't exist.</p>
          <Button onClick={() => navigate('/dashboard')} className="rounded-xl bg-black hover:bg-gray-800 text-white">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="h-8 px-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 gap-1.5 font-medium shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-gray-900 truncate">{project.Name}</h1>
            <p className="text-xs text-gray-400 font-mono truncate">{project._id}</p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-right shrink-0">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Created</p>
              <p className="text-xs font-medium text-gray-600 mt-0.5">
                {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Updated</p>
              <p className="text-xs font-medium text-gray-600 mt-0.5">
                {new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">

        {/* Page heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{project.Name}</h2>
          <p className="text-gray-500 text-sm mt-1">View and inspect all project users and API integration details.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Project Users</p>
            <p className="text-2xl font-extrabold text-gray-900">{project.ProjectUsers?.length || 0}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Created</p>
            <p className="text-sm font-bold text-gray-900">
              {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Project ID</p>
            <p className="text-xs font-mono text-gray-600 truncate">{project._id}</p>
          </div>
        </div>

        {/* Project Users Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                <Users className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">Project Users</h2>
                <p className="text-xs text-gray-400">Users registered in this project</p>
              </div>
            </div>
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100">
              {project.ProjectUsers?.length || 0} Total
            </span>
          </div>

          {project.ProjectUsers && project.ProjectUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                    <TableHead className="text-xs font-semibold text-gray-400 uppercase tracking-wider">User ID (PuserId)</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Public Key Preview</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.ProjectUsers.map((user) => (
                    <TableRow key={user._id} className="hover:bg-gray-50/70 transition-colors group">
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0 border border-indigo-100">
                            <Shield className="h-3.5 w-3.5 text-indigo-400" />
                          </div>
                          <code className="text-xs font-mono text-gray-600 truncate max-w-[200px]">
                            {user.UserId}
                          </code>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <code className="text-xs font-mono text-gray-400 truncate max-w-[180px] inline-block">
                          {user.publicKey ? user.publicKey.substring(0, 40) + '...' : '—'}
                        </code>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                          className="h-7 px-3 text-xs text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 rounded-lg gap-1.5 font-semibold"
                        >
                          <Search className="h-3 w-3" />
                          Inspect
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="h-14 w-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-dashed border-gray-200">
                <Shield className="h-6 w-6 text-gray-300" />
              </div>
              <h3 className="text-sm font-semibold text-gray-600 mb-1">No users yet</h3>
              <p className="text-xs text-gray-400 text-center max-w-xs">
                When users authenticate via your project's API, they'll appear here.
              </p>
            </div>
          )}
        </div>

        {/* API Docs Link */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-0.5">API Integration Docs</h3>
            <p className="text-xs text-gray-400">Full reference for Auth, UserData, File Upload & OAuth endpoints.</p>
          </div>
          <Button
            onClick={() => navigate(`/docs/${project._id}`)}
            className="rounded-xl bg-black hover:bg-gray-800 text-white font-semibold gap-2 shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all shrink-0"
          >
            <BookOpen className="h-4 w-4" />
            View API Docs
          </Button>
        </div>
      </main>

      {selectedUser && (
        <UserDataModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
