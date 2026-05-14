import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import {
  Shield, Database, Folder, Mail, ArrowRight, Zap,
  Code2, Lock, Users, Server, ChevronRight, Github
} from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Master Authentication',
    description: 'Secure JWT-based auth with cookie sessions, password hashing via bcrypt, and forget-password email flows.',
    color: 'from-violet-500/20 to-violet-600/10',
    border: 'border-violet-500/30',
    iconColor: 'text-violet-400',
  },
  {
    icon: Folder,
    title: 'Project Management',
    description: 'Create isolated projects, each with their own user base and data storage. Full CRUD operations.',
    color: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
  },
  {
    icon: Users,
    title: 'In-Project Auth',
    description: 'Plug-and-play user auth for your projects. Register, login, update and delete users per project.',
    color: 'from-indigo-500/20 to-indigo-600/10',
    border: 'border-indigo-500/30',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Database,
    title: 'Flexible Data Storage',
    description: 'Store any JSON data per user per project. Insert, retrieve, update, delete — no schema required.',
    color: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Mail,
    title: 'Email Service',
    description: 'Integrated Nodemailer email delivery for OTP-based password reset and notifications.',
    color: 'from-pink-500/20 to-pink-600/10',
    border: 'border-pink-500/30',
    iconColor: 'text-pink-400',
  },
  {
    icon: Code2,
    title: 'REST API',
    description: 'Clean, well-documented REST endpoints. Easy to integrate with any frontend or mobile app.',
    color: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-400',
  },
]

const stack = ['Node.js', 'Express', 'MongoDB', 'JWT', 'bcrypt', 'Nodemailer']

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        {/* Bg decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-violet-600/12 via-indigo-600/6 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-violet-600/8 rounded-full blur-3xl" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-sm">
            <Zap size={14} className="text-violet-400" />
            <span className="text-muted-foreground">Backend-as-a-Service for your projects</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6">
            <span className="text-foreground">Auth &amp; Data,</span>
            <br />
            <span className="text-gradient">Done Right.</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            NexAuth is your personal backend platform — manage authentication, projects, users,
            and data storage all through one elegant API.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register">
              <Button variant="gradient" size="lg" className="gap-2 text-base">
                Get Started Free
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="outline" size="lg" className="gap-2 text-base">
                <Code2 size={18} />
                View API Docs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {stack.map((tech) => (
              <span key={tech} className="glass px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need,{' '}
              <span className="text-gradient">nothing you don't</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete backend toolkit built for developers who want power without the boilerplate.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, description, color, border, iconColor }) => (
              <div
                key={title}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${color} border ${border} hover:scale-[1.02] transition-all duration-300 group`}
              >
                <div className={`w-10 h-10 rounded-xl bg-card border ${border} flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow duration-300`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 pointer-events-none" />
            <div className="relative">
              <Server size={40} className="mx-auto mb-4 text-violet-400" />
              <h2 className="text-3xl font-bold mb-4">Ready to build?</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Create your account, start a project, and plug in our API in minutes.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/register">
                  <Button variant="gradient" size="lg" className="gap-2">
                    Create Account
                    <ChevronRight size={16} />
                  </Button>
                </Link>
                <Link to="/docs">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Lock size={16} />
                    Browse Docs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-violet-400" />
            <span className="font-semibold text-foreground">NexAuth</span>
            <span>— by Shubhankar Marathe</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/docs" className="hover:text-foreground transition-colors">Docs</Link>
            <Link to="/login" className="hover:text-foreground transition-colors">Login</Link>
            <Link to="/register" className="hover:text-foreground transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
