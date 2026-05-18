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
import { ProjectApiDocs } from '../components/ProjectApiDocs';
import { X, Search, Code, Shield } from 'lucide-react';

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

interface UserFullData {
  AuthData: any;
  Data: string;
}

const UserDataModal = ({
  user,
  projectId,
  onClose,
}: {
  user: ProjectUser;
  projectId: string;
  onClose: () => void;
}) => {
  const [fullData, setFullData] = useState<UserFullData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setFetching(true);
        const res = await api.get(`/projectdata/retrive/${projectId}/${user.UserId}`);
        setFullData(res.data.data);
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setFetching(false);
      }
    };
    fetchUserData();
  }, [user.UserId, projectId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-900">User Data Inspection</h3>
            <p className="text-sm text-gray-500 font-mono mt-1">PuserId: {user.UserId}</p>
          </div>
          <Button variant="outline" size="sm" onClick={onClose} className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-gray-50">
          {fetching ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 rounded-full border-4 border-gray-200 border-t-indigo-500 animate-spin" />
            </div>
          ) : error ? (
            <p className="text-sm text-red-500 text-center py-8">{error}</p>
          ) : (
            <>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-indigo-500" /> Authentication Data
                </h4>
                <pre className="bg-gray-950 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono border border-gray-800 shadow-inner">
                  <code>{JSON.stringify(fullData?.AuthData || {}, null, 2)}</code>
                </pre>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Code className="h-4 w-4 text-emerald-500" /> Custom User Data
                </h4>
                <pre className="bg-gray-950 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono border border-gray-800 shadow-inner">
                  <code>
                    {(() => {
                      try {
                        return JSON.stringify(JSON.parse(fullData?.Data || ''), null, 2);
                      } catch {
                        return fullData?.Data || '{}';
                      }
                    })()}
                  </code>
                </pre>
              </div>
            </>
          )}
        </div>
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-900 font-sans">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-black animate-spin mb-4 shadow-sm"></div>
          <span className="text-gray-500 font-medium">Loading project details...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-900 font-sans">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 p-8 font-sans relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent -z-10"></div>
      
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-6 bg-white/50 backdrop-blur-md rounded-2xl px-6 pt-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')} className="rounded-xl mr-2">
              &larr; Back
            </Button>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{project.Name}</h1>
              <p className="text-sm text-gray-500">Project ID: {project._id}</p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-500 flex gap-6">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Created</p>
              <p className="font-medium text-gray-700">{new Date(project.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Updated</p>
              <p className="font-medium text-gray-700">{new Date(project.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Project Users</h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
              {project.ProjectUsers?.length || 0} Total
            </span>
          </div>
          
          {project.ProjectUsers && project.ProjectUsers.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <Table>
                <TableHeader className="bg-gray-50/80">
                  <TableRow>
                    <TableHead>User ID (PuserId)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.ProjectUsers.map((user) => {
                    return (
                      <TableRow key={user._id} className="hover:bg-gray-50/50">
                        <TableCell className="font-mono text-sm text-gray-700">
                          {user.UserId}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                            className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                          >
                            <Search className="h-3 w-3 mr-1" /> View Data
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">No users yet</h3>
              <p className="text-sm text-gray-500 mt-1">When users authenticate, they will appear here.</p>
            </div>
          )}
        </div>

        <ProjectApiDocs projectId={project._id} />
      </div>

      {selectedUser && (
        <UserDataModal user={selectedUser} projectId={project._id} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
