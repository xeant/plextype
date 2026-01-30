"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import DefaultLayout from '@/layouts/plextype/Layout'
import {
  ArrowRight,
  Zap,
  Shield,
  Code2,
  Globe,
  Command,
  Keyboard,
  BarChart3
} from "lucide-react";
import Link from "next/link";

/**
 * 애니메이션 변수 정의
 * 앞서 발생했던 타입 오류를 방지하기 위해 Variants 타입을 명시합니다.
 */
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
    transition: {
      staggerChildren: 0.1,
    }
  }
};

export default function PlextypeMainPage() {
  const ctaRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  });

  // CTA 섹션에서 배경이 커지는 애니메이션
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  return (
    <DefaultLayout>
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
        {/* Next.js 스타일의 배경 격자 (Subtle Grid) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-[12px] font-bold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
              </span>
              v1.0.0 is now live
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[0.9]"
            >
              The Typing Engine <br /> for the Modern Web.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-gray-500 text-xl md:text-2xl max-w-2xl mx-auto mb-12 font-medium tracking-tight"
            >
              Plextype is a high-performance typing framework built for developers who demand speed, precision, and a flow state.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth" className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
                Start Typing <ArrowRight size={18} />
              </Link>
              <Link href="/docs" className="w-full sm:w-auto bg-white border border-gray-200 text-black px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all">
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
          {/* Main Large Card */}
          <motion.div
            variants={fadeInUp}
            className="md:col-span-4 md:row-span-2 rounded-[32px] border border-gray-200 bg-[#fafafa] p-10 flex flex-col justify-between relative overflow-hidden group shadow-sm"
          >
            <div className="z-10">
              <div className="w-12 h-12 bg-white rounded-2xl border border-gray-200 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Zap className="text-black" fill="black" size={24} />
              </div>
              <h3 className="text-4xl font-extrabold tracking-tighter mb-4">Zero Latency. <br />Maximum Flow.</h3>
              <p className="text-gray-500 text-lg font-medium max-w-sm">
                Custom Rust engine compiled to WASM. Experience the fastest feedback loop between your mind and the screen.
              </p>
            </div>

            {/* 시각적 요소: 추상적인 그리드/코드 */}
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-white border-t border-l border-gray-200 rounded-tl-[32px] p-6 font-mono text-[12px] text-gray-400 hidden md:block">
              <div className="space-y-2">
                <div className="flex gap-2"><span className="text-black">engine</span>.init()</div>
                <div className="flex gap-2"><span className="text-black">latency</span>: 0.001ms</div>
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-black"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Small Card: Command Palette */}
          <motion.div
            variants={fadeInUp}
            className="md:col-span-2 rounded-[32px] border border-gray-200 bg-white p-8 flex flex-col justify-between shadow-sm hover:border-gray-300 transition-colors"
          >
            <Command className="text-gray-400" size={28} />
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-2">Command Palette</h3>
              <p className="text-sm text-gray-500 font-medium">Full control without leaving the home row. Cmd + K to everything.</p>
            </div>
          </motion.div>

          {/* Small Card: Analytics */}
          <motion.div
            variants={fadeInUp}
            className="md:col-span-2 rounded-[32px] border border-gray-200 bg-white p-8 flex flex-col justify-between shadow-sm"
          >
            <BarChart3 className="text-gray-400" size={28} />
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-2">Deep Insights</h3>
              <p className="text-sm text-gray-500 font-medium">WPM, Accuracy, and Heatmaps. Track your growth over time.</p>
            </div>
          </motion.div>

          {/* Long Horizontal Card: Integrations */}
          <motion.div
            variants={fadeInUp}
            className="md:col-span-2 lg:col-span-2 rounded-[32px] border border-gray-200 bg-white p-8 flex flex-col justify-between shadow-sm"
          >
            <Globe className="text-gray-400" size={28} />
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-2">Global Sync</h3>
              <p className="text-sm text-gray-500 font-medium">Your profile, synced across the edge network.</p>
            </div>
          </motion.div>

          {/* New Feature: Security */}
          <motion.div
            variants={fadeInUp}
            className="md:col-span-4 rounded-[32px] border border-gray-200 bg-black text-white p-10 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold tracking-tighter mb-4">Enterprise Grade Security.</h3>
              <p className="text-gray-400 font-medium">End-to-end encryption for your typing data. We never store your keystrokes.</p>
            </div>
            <div className="flex gap-4">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                <Shield size={32} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-40">
        <div className="space-y-60"> {/* 섹션 사이의 간격을 크게 주어 몰입감 부여 */}

          {/* Feature 01: Typography + Preview */}
          <div className="flex flex-col md:flex-row items-center gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="flex-1"
            >
              <div className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-6">01. Performance</div>
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-none">
                Faster than <br /> your thoughts.
              </h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-md">
                Plextype's custom WASM engine eliminates every millisecond of input lag. It's not just fast; it's instantaneous.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 w-full aspect-square bg-[#fafafa] border border-gray-100 rounded-[40px] p-12 flex items-center justify-center relative group overflow-hidden"
            >
              {/* UI 시뮬레이션 코드 창 */}
              <div className="w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 font-mono text-sm group-hover:scale-105 transition-transform duration-500">
                <div className="flex gap-1.5 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="space-y-2 text-gray-400">
                  <p><span className="text-black">await</span> engine.boot()</p>
                  <p className="text-green-600">// Latency: 0.04ms</p>
                  <p><span className="text-black">status</span>: "Ready to flow"</p>
                </div>
              </div>
              <Zap className="absolute top-10 right-10 text-gray-100" size={120} />
            </motion.div>
          </div>

          {/* Feature 02: Reverse Layout */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="flex-1"
            >
              <div className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-6">02. Control</div>
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-none">
                Everything at <br /> your fingertips.
              </h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-md">
                The command palette is the heart of Plextype. Change everything—from themes to modes—without ever touching your mouse.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 w-full aspect-square bg-black rounded-[40px] p-12 flex flex-col justify-center items-center text-white relative group"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex items-center gap-4 w-full max-w-xs shadow-2xl">
                <Command size={20} />
                <span className="font-mono text-sm">Jump to...</span>
                <kbd className="ml-auto bg-white/20 px-1.5 py-0.5 rounded text-[10px]">K</kbd>
              </div>
              <div className="absolute bottom-12 left-12 right-12 flex justify-between text-[10px] font-mono text-white/30">
                <span>COMMAND_PALETTE_V1</span>
                <span>ACTIVE_SESSION</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- New CTA: The Dark Immersion --- */}
      <section ref={ctaRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 스크롤에 따라 확장되는 검은색 배경 */}
        <motion.div
          style={{ scale, opacity }}
          className="absolute inset-0 bg-black z-0 rounded-[60px] mx-4 my-8 md:mx-10 md:my-20"
        />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-[120px] font-extrabold tracking-tighter text-white leading-none mb-12"
          >
            Ready to <br /> ship speed?
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <button className="bg-white text-black px-12 py-5 rounded-full font-extrabold text-xl hover:scale-105 transition-transform active:scale-95">
              Get Started for Free
            </button>
            <button className="text-white font-bold flex items-center gap-2 hover:opacity-70 transition-opacity">
              Contact Sales <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
    </DefaultLayout>
  );
}