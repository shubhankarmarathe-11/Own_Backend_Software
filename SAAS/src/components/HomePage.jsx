import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function SaaSHomepage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">MySaaS</h1>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#features" className="hover:text-blue-600">
            Features
          </a>
          <a href="#pricing" className="hover:text-blue-600">
            Pricing
          </a>
          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>
        </nav>
        <Button>Get Started</Button>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Build, Scale & Manage Your Business Faster
          </h2>
          <p className="mt-6 text-gray-600 text-lg">
            An all-in-one SaaS platform to automate workflows, track growth, and
            increase productivity.
          </p>
          <div className="mt-8 flex gap-4">
            <Button size="lg">Start Free Trial</Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="h-64 bg-slate-100 rounded-xl flex items-center justify-center text-gray-400">
            Dashboard Preview
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center">Powerful Features</h3>
          <p className="text-center text-gray-600 mt-3">
            Everything you need to run your SaaS efficiently
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {["Automation", "Analytics", "Security"].map((feature) => (
              <Card key={feature} className="rounded-2xl shadow-sm">
                <CardContent className="p-6">
                  <CheckCircle className="text-blue-600 mb-4" />
                  <h4 className="text-xl font-semibold">{feature}</h4>
                  <p className="text-gray-600 mt-2">
                    Simplify operations with our advanced{" "}
                    {feature.toLowerCase()} tools.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center">Simple Pricing</h3>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {["Starter", "Pro", "Enterprise"].map((plan, index) => (
              <Card key={plan} className="rounded-2xl shadow-md">
                <CardContent className="p-8 text-center">
                  <h4 className="text-xl font-semibold">{plan}</h4>
                  <p className="text-4xl font-bold mt-4">
                    ₹{index * 999 + 999}
                  </p>
                  <p className="text-gray-600 mt-2">per month</p>
                  <Button className="mt-6 w-full">Choose Plan</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 bg-slate-900 text-gray-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <p>© 2026 MySaaS. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
