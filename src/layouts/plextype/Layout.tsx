"use client";

import Link from "next/link";
import Header from "./Header"


export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
        <main className="">
          {children}
        </main>

      <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            {/* Logo & Tagline */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="font-extrabold text-xl tracking-tighter flex items-center gap-2 text-black mb-4">
                <div className="w-4 h-4 bg-black" /> PLEXTYPE
              </Link>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                The ultimate framework for professional typists. <br />
                Built for speed, precision, and performance.
              </p>
            </div>

            {/* Links - Product */}
            <div>
              <h4 className="text-black font-bold text-sm mb-5">Product</h4>
              <ul className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
                <li><Link href="#" className="hover:text-black transition-colors">Showcase</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Templates</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Pricing</Link></li>
              </ul>
            </div>

            {/* Links - Resources */}
            <div>
              <h4 className="text-black font-bold text-sm mb-5">Resources</h4>
              <ul className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
                <li><Link href="#" className="hover:text-black transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">API Reference</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Community</Link></li>
              </ul>
            </div>

            {/* Links - Company */}
            <div>
              <h4 className="text-black font-bold text-sm mb-5">Company</h4>
              <ul className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
                <li><Link href="#" className="hover:text-black transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Copyright Area */}
          <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-xs font-medium">
                © {new Date().getFullYear()} Plextype Inc. All rights reserved.
              </span>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-black transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.481A9.994 9.994 0 0022 12c0-5.523-4.477-10-10-10z" /></svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-black transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                </Link>
              </div>
            </div>

            {/* System Status / Badge */}
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-100 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[11px] font-bold text-green-700 uppercase tracking-tight">System Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}