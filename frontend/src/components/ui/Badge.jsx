import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary/15 text-primary border border-primary/30',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive/15 text-destructive border border-destructive/30',
        success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
        warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
        outline: 'border border-border text-foreground',
        GET: 'method-get',
        POST: 'method-post',
        PATCH: 'method-patch',
        DELETE: 'method-delete',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export function Badge({ className, variant, children, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {children}
    </span>
  )
}
