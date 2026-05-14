import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

function ParamRow({ name, type, required, description }) {
  return (
    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
      <td className="py-3 px-4">
        <code className="text-xs font-mono text-violet-400">{name}</code>
        {required && (
          <span className="ml-1.5 text-xs text-red-400">*</span>
        )}
      </td>
      <td className="py-3 px-4">
        <span className="text-xs font-mono text-amber-400">{type}</span>
      </td>
      <td className="py-3 px-4 text-xs text-muted-foreground">{description}</td>
    </tr>
  )
}

function ResponseRow({ status, description }) {
  const isSuccess = status >= 200 && status < 300
  return (
    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
      <td className="py-3 px-4">
        <span className={cn(
          'text-xs font-mono font-semibold px-2 py-0.5 rounded',
          isSuccess ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'
        )}>
          {status}
        </span>
      </td>
      <td className="py-3 px-4 text-xs text-muted-foreground">{description}</td>
    </tr>
  )
}

export default function ApiBlock({ method, route, description, params = [], responses = [] }) {
  return (
    <div className="rounded-xl border border-border/70 overflow-hidden mb-6 hover:border-primary/30 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-muted/40 border-b border-border/50">
        <Badge variant={method}>{method}</Badge>
        <code className="text-sm font-mono text-foreground">{route}</code>
      </div>

      {/* Description */}
      {description && (
        <div className="px-4 py-3 text-sm text-muted-foreground border-b border-border/30">
          {description}
        </div>
      )}

      {/* Params */}
      {params.length > 0 && (
        <div className="border-b border-border/50">
          <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/20">
            Request Body / Params
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-4 text-xs text-muted-foreground font-medium">Field</th>
                  <th className="text-left py-2 px-4 text-xs text-muted-foreground font-medium">Type</th>
                  <th className="text-left py-2 px-4 text-xs text-muted-foreground font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {params.map((p, i) => <ParamRow key={i} {...p} />)}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Responses */}
      {responses.length > 0 && (
        <div>
          <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/20">
            Responses
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-4 text-xs text-muted-foreground font-medium">Status</th>
                  <th className="text-left py-2 px-4 text-xs text-muted-foreground font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((r, i) => <ResponseRow key={i} {...r} />)}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
