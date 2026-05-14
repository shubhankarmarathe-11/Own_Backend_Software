import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sendForgotPasswordEmail, resetPassword } from '@/api/auth'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { KeyRound, Zap, Mail, Loader2, CheckCircle2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1) // 1: email, 2: otp+pass
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSendEmail = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await sendForgotPasswordEmail({ email })
      setStep(2)
    } catch (err) {
      setError(err?.response?.data || 'Failed to send email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await resetPassword({ otp, newpassword })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2500)
    } catch (err) {
      setError(err?.response?.data || 'Invalid OTP or failed to reset password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-slide-up">
        <div className="glass-strong rounded-2xl p-8 border border-border/70">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 mb-4">
              <KeyRound size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
            <p className="text-muted-foreground text-sm mt-1 text-center">
              {step === 1 ? "We'll send an OTP to your email" : 'Enter the OTP from your email'}
            </p>
          </div>

          {/* Step indicators */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step >= s ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>

          {success ? (
            <div className="text-center py-4">
              <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-4" />
              <p className="text-foreground font-semibold">Password reset successfully!</p>
              <p className="text-muted-foreground text-sm mt-1">Redirecting to login...</p>
            </div>
          ) : step === 1 ? (
            <form onSubmit={handleSendEmail} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Registered Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  required
                />
              </div>

              {error && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <Button variant="gradient" className="w-full gap-2" disabled={loading}>
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP from email"
                  value={otp}
                  onChange={(e) => { setOtp(e.target.value); setError('') }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newpassword">New Password</Label>
                <Input
                  id="newpassword"
                  type="password"
                  placeholder="Min 8 characters"
                  value={newpassword}
                  onChange={(e) => { setNewPassword(e.target.value); setError('') }}
                  required
                  minLength={8}
                />
              </div>

              {error && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <Button variant="gradient" className="w-full gap-2" disabled={loading}>
                {loading ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>

              <button
                type="button"
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => { setStep(1); setError('') }}
              >
                ← Back to email
              </button>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            Remember your password?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
