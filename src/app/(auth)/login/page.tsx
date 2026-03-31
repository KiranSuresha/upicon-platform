import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Sign In — UPICON" };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-upicon-950 via-upicon-900 to-upicon-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 backdrop-blur">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">UPICON Platform</h1>
          <p className="text-upicon-300 text-sm mt-1">Agentic Intelligence Command Center</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Sign in to continue</h2>
          <p className="text-sm text-slate-500 mb-6">Enter your credentials to access the platform</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <Input
                type="email"
                placeholder="you@upicon.in"
                defaultValue="md@upicon.in"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <button className="text-xs text-upicon-600 hover:underline">Forgot password?</button>
              </div>
              <Input type="password" placeholder="••••••••" defaultValue="password" />
            </div>

            <Link href="/dashboard">
              <Button className="w-full gap-2 mt-2">
                Sign In
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center">
              Demo credentials pre-filled. Click Sign In to access the platform.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-upicon-400 mt-6">
          © 2026 UPICON · Developed by BVG Tech Consulting
        </p>
      </div>
    </div>
  );
}
