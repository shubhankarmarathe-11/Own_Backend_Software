import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 font-sans">
      <header className="flex h-20 items-center justify-between px-8 lg:px-16 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center text-white font-bold text-xl">
            B
          </div>
          <span className="text-xl font-bold tracking-tight">BAAS Platform</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            Sign In
          </Link>
          <Link to="/signup">
            <Button className="bg-black hover:bg-gray-800 text-white font-medium rounded-full px-6 transition-all hover:scale-105 active:scale-95 shadow-md shadow-gray-300">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center py-32 lg:py-48 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-50 rounded-full blur-3xl -z-10 opacity-70"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gray-100 rounded-full blur-3xl -z-10 opacity-50"></div>

        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
          Backend as a Service, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
            Simplified.
          </span>
        </h1>
        <p className="text-lg lg:text-xl text-gray-500 mb-10 max-w-2xl">
          Build, deploy, and scale your applications faster with our robust, secure, and modern backend infrastructure. Everything you need, right out of the box.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link to="/signup">
            <Button className="h-14 px-8 text-lg bg-black hover:bg-gray-800 text-white rounded-full transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-300">
              Start Building Now
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="h-14 px-8 text-lg border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50 text-gray-900 rounded-full transition-all">
              Go to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
          {[
            { title: "Authentication", desc: "Secure Google OAuth and email/password login ready to use." },
            { title: "Database Ready", desc: "Pre-configured database connections for instant data access." },
            { title: "Scalable API", desc: "High-performance API endpoints that grow with your user base." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 border border-gray-100">
                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-200 py-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} BAAS Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
