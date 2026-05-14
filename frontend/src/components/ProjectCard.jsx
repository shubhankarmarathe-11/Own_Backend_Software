import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Folder, Trash2, ExternalLink, Calendar } from 'lucide-react'
import { deleteProject } from '@/api/dashboard'

export default function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate()

  const handleDelete = async (e) => {
    e.stopPropagation()
    if (!window.confirm(`Delete project "${project.projectName}"?`)) return
    try {
      await deleteProject({ project_id: project._id })
      onDelete(project._id)
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  const createdAt = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'N/A'

  return (
    <Card className="glass hover:border-primary/40 transition-all duration-300 hover:glow-sm group">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-600/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0 group-hover:from-violet-500/30 group-hover:to-indigo-600/30 transition-all duration-300">
            <Folder size={18} className="text-violet-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{project.projectName}</h3>
            <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate">{project._id}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-4 text-xs text-muted-foreground">
          <Calendar size={12} />
          <span>Created {createdAt}</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-1.5"
          onClick={() => navigate(`/project/${project._id}`)}
        >
          <ExternalLink size={13} />
          View
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="gap-1.5"
          onClick={handleDelete}
        >
          <Trash2 size={13} />
        </Button>
      </CardFooter>
    </Card>
  )
}
