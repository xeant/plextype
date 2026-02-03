"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import DefaultLayout from '@/layouts/plextype/Layout'
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Command,
  BarChart3
} from "lucide-react";
import Link from "next/link";

// 애니메이션 변수 (기존 유지)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function PlextypeMainPage() {
  const ctaRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <DefaultLayout>
      {/* Selection color를 라임으로 변경하여 디테일 살림 */}
      <div className="min-h-screen bg-white text-black selection:bg-lime-400 selection:!text-black">

        {/* --- Hero Section --- */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
              {/* 포인트 컬러: 라임 배지 */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-50 border border-lime-200 text-[12px] font-bold mb-8 text-lime-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
                </span>
                v1.0.0 is now live
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[0.9] text-gray-900">
                The Typing Engine <br /> for the <span className="text-gray-400 italic">Modern</span> Web.
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-gray-500 text-xl md:text-2xl max-w-2xl mx-auto mb-12 font-medium tracking-tight">
                Plextype is a high-performance typing framework built for developers who demand <span className="text-black">speed</span>, precision, and a flow state.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* 메인 CTA: 라임 컬러 적용 */}
                <Link href="/auth" className="w-full sm:w-auto bg-lime-400 text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-lime-500 transition-all shadow-lg shadow-lime-200/50">
                  Start Typing <ArrowRight size={18} />
                </Link>
                <Link href="/docs" className="w-full sm:w-auto bg-white border border-gray-200 text-gray-600 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all">
                  Read Documentation
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- Bento Grid Features --- */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[240px]"
          >
            {/* 고성능 강조 카드 */}
            <motion.div
              variants={fadeInUp}
              className="md:col-span-4 md:row-span-2 rounded-[32px] border border-gray-100 bg-gray-50 p-10 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="z-10">
                <div className="w-12 h-12 bg-lime-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:rotate-12 transition-transform">
                  <Zap className="text-black" fill="black" size={24} />
                </div>
                <h3 className="text-4xl font-extrabold tracking-tighter mb-4">Zero Latency. <br />Maximum Flow.</h3>
                <p className="text-gray-500 text-lg font-medium max-w-sm">
                  Custom Rust engine compiled to WASM. Experience the fastest feedback loop.
                </p>
              </div>

              {/* 시각적 요소: 라임색 게이지 */}
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-white border-t border-l border-gray-100 rounded-tl-[32px] p-6 font-mono text-[12px] text-gray-400 hidden md:block shadow-inner">
                <div className="space-y-4">
                  <div className="flex justify-between"><span className="text-black">System Ready</span> <span className="text-lime-500">100%</span></div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full bg-lime-400"
                    />
                  </div>
                  <div className="text-[10px] text-gray-300">CORE_ENGINE_V2_LOADED</div>
                </div>
              </div>
            </motion.div>

            {/* 나머지 카드들: 회색 톤 조절 */}
            <motion.div variants={fadeInUp} className="md:col-span-2 rounded-[32px] border border-gray-100 bg-white p-8 flex flex-col justify-between hover:border-lime-200 transition-colors group">
              <Command className="text-gray-300 group-hover:text-lime-500 transition-colors" size={28} />
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Command Palette</h3>
                <p className="text-sm text-gray-500 font-medium">Full control without leaving the home row.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="md:col-span-2 rounded-[32px] border border-gray-100 bg-white p-8 flex flex-col justify-between">
              <BarChart3 className="text-gray-300" size={28} />
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Deep Insights</h3>
                <p className="text-sm text-gray-500 font-medium">Track your growth with heatmaps.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="md:col-span-2 rounded-[32px] border border-gray-100 bg-white p-8 flex flex-col justify-between">
              <Globe className="text-gray-300" size={28} />
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Global Sync</h3>
                <p className="text-sm text-gray-500 font-medium">Synced across the edge network.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="md:col-span-4 rounded-[32px] border border-gray-200 bg-black text-white p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="flex-1 text-center md:text-left z-10">
                <h3 className="text-3xl font-bold tracking-tighter mb-4">Enterprise Grade Security.</h3>
                <p className="text-gray-400 font-medium">End-to-end encryption for your typing data.</p>
              </div>
              <div className="z-10 p-4 bg-lime-400 rounded-2xl text-black">
                <Shield size={32} />
              </div>
              {/* 배경 장식 */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-lime-400/10 blur-3xl rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* --- Feature Sections --- */}
        <section className="max-w-7xl mx-auto px-6 py-40">
          <div className="space-y-60">
            <div className="flex flex-col md:flex-row items-center gap-20">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="flex-1">
                <div className="text-sm font-bold tracking-widest text-lime-500 uppercase mb-6">01. Performance</div>
                <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-none">Faster than <br /> your thoughts.</h2>
                <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-md">Plextype's custom WASM engine eliminates every millisecond of input lag.</p>
              </motion.div>
              <motion.div className="flex-1 w-full aspect-square bg-gray-50 border border-gray-100 rounded-[40px] p-12 flex items-center justify-center relative overflow-hidden">
                <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6 font-mono text-sm">
                  <p className="text-gray-400 mb-2">// engine.status</p>
                  <p className="text-black mb-1">Latency: <span className="text-lime-500">0.02ms</span></p>
                  <p className="text-black italic">"Optimal flow state achieved."</p>
                </div>
                <div className="absolute -bottom-10 -right-10 text-lime-400 opacity-20">
                  <Zap size={240} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Final CTA Section --- */}
        <section ref={ctaRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div style={{ scale, opacity }} className="absolute inset-0 bg-black z-0 rounded-[60px] mx-4 my-8 md:mx-10 md:my-20" />
          <div className="relative z-10 text-center px-6">
            <motion.div className="text-6xl md:text-[100px] font-extrabold tracking-tighter text-white leading-none mb-12 italic">
              Ready to <br /> ship <span className="text-lime-400 underline decoration-lime-400 underline-offset-8">speed</span>?
            </motion.div>
            <motion.div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button className="bg-lime-400 text-black px-12 py-5 rounded-full font-extrabold text-xl hover:scale-105 transition-transform">
                Get Started for Free
              </button>
              <button className="text-white font-bold flex items-center gap-2 hover:text-lime-400 transition-colors">
                Contact Sales <ArrowRight size={20} />
              </button>
            </motion.div>
          </div>
        </section>
      </div>

    </DefaultLayout>
  );
}