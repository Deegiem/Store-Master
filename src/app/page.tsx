"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ShoppingCart,
  Tag,
  Eye,
  Store,
  PackageCheck,
  ArrowLeftRight,
  RefreshCw,
  BarChart2,
  Zap,
  ShieldCheck,
  Share2,
  Mail,
  PlayCircle,
  LayoutGrid,
  Building2,
} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col font-display bg-[#F8F9FA]">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-100 w-full border-b border-gray-200/50 backdrop-blur-md bg-white/75">
        <div className="max-w-[78rem] mx-auto px-8 py-5 flex items-center justify-between">
          <span className="text-[1.7rem] font-semibold text-gray-900 tracking-tight">
            Store Master
          </span>

          <nav className="hidden md:flex items-center text-md gap-8">
            <a href="#features" className=" font-medium text-[#000ac0] border-b-2 border-[#000ac0] pb-0.5">
              Features
            </a>
            <a href="#how-it-works" className=" font-medium text-gray-600 hover:text-gray-900 transition-colors">
              How it Works
            </a>
            <a href="#pricing" className=" font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <Link href="/login" className=" font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Login
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
          >
            <span className={`absolute w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? 'rotate-45' : '-translate-y-2'}`} />
            <span className={`absolute w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`absolute w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-2'}`} />
          </button>

          <Link href="/register" className="hidden md:block">
            <Button className="bg-linear-to-br from-[#003e9d] to-[#0050c9] hover:bg-[#0009a0] text-white font-semibold rounded-lg px-6 py-5 text-[15px] tracking-wide">
              GET STARTED
            </Button>
          </Link>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`md:hidden sticky top-[72px] z-40 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-8 pb-6 pt-2 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
          <nav className="flex flex-col gap-4">
            <a onClick={() => setIsOpen(false)} href="#features" className="text-sm font-medium text-[#000ac0]">
              Features
            </a>
            <a onClick={() => setIsOpen(false)} href="#how-it-works" className="text-sm font-medium text-gray-600">
              How it Works
            </a>
            <a onClick={() => setIsOpen(false)} href="#pricing" className="text-sm font-medium text-gray-600">
              Pricing
            </a>
            <Link onClick={() => setIsOpen(false)} href="/login" className="text-sm font-medium text-gray-600">
              Login
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/register">
              <Button className="w-full py-6 bg-[#003d9b] text-white rounded-lg mt-2">
                GET STARTED
              </Button>
            </Link>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="bg-white overflow-hidden">
        <div className="max-w-[78rem] mx-auto px-8 pt-20 md:pt-28 flex flex-col md:flex-row items-start md:items-end gap-10 md:gap-16">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-xl pb-10 md:pb-24"
          >
            <h1 className="text-5xl md:text-6xl mt-6 font-bold text-gray-900 tracking-tight leading-none mb-6">
              Master Your{" "} <br />
              <span className="text-[#003d9b]">Multi-Branch</span>{" "} <br />
              Inventory
            </h1>
            <p className="text-12px text-gray-500 mb-10 leading-relaxed max-w-md">
              Centralized oversight, decentralized operations. The ultimate cloud-based backend for retail and wholesale.
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <Link href="/register">
                <div className="bg-gradient-to-r from-[#003e9d] to-[#0050c9] hover:bg-[#0009a0] text-white font-bold rounded-lg px-8 py-4 text-sm tracking-widest uppercase">
                  GET STARTED
                </div>
              </Link>
              <button className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:bg-[#eceffc] rounded-lg px-8 py-4 hover:text-[#003d9b] tracking-widest uppercase transition-colors">
                <PlayCircle className="w-5 h-5 text-[#003d9b]" />
                WATCH DEMO
              </button>
            </div>
          </motion.div>

          {/* Right — dashboard floats up from bottom edge */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex-1 self-end flex justify-center md:justify-end w-full"
          >
            <div className="w-full max-w-[560px] rounded-t-2xl overflow-hidden shadow-2xl border border-gray-200">
              <Image
                src="/dashboard-mockup.jpg"
                alt="Dashboard Preview"
                width={560}
                height={320}
                className="w-full h-auto"
              />

            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Global vs. Local Advantage ── */}
      <section id="features" className="py-20 bg-gray-50">

        <div className="max-w-[78rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="inline-block text-xs font-semibold text-[#4c608a] bg-[#b6c8fe] rounded-full px-3 py-2 mb-4 uppercase tracking-widest">
              Our Framework
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              The Global vs. Local Advantage
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Global Tier */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#003d9b] rounded-t-3xl" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[3rem] border-2 border-[#003D9B] p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="pr-4">
                  <h3 className="font-semibold text-2xl text-gray-900">Global Tier (HQ)</h3>
                  <p className="text-md text-gray-500 mt-0.5">Executive Strategy & Central Control</p>
                </div>
                <div className="flex gap-2">
                  <div className="size-12 rounded-lg bg-[#DAE2FF] flex items-center justify-center">
                    <LayoutGrid className="size-6 text-[#021945]" />
                  </div>
                  <div className="size-12 rounded-lg bg-[#DAE2FF] flex items-center justify-center">
                    <Building2 className="size-6 text-[#021945]" />
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                {[
                  { icon: ShoppingCart, title: "Bulk Purchasing", desc: "Leverage economies of scale with centralized procurement for the entire branch network." },
                  { icon: Tag, title: "Global Pricing", desc: "Enforce brand-wide pricing strategies or adjust per-region instantly from the HQ dashboard." },
                  { icon: Eye, title: "Financial Oversight", desc: "Real-time consolidated financial reporting and branch performance audit trails." },
                ].map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#DAE2FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <f.icon className="w-4 h-4 text-[#021945]" />
                    </div>
                    <div>
                      <p className="font-semibold text-md text-gray-900">{f.title}</p>
                      <p className="text-md text-gray-500 leading-relaxed mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-12 text-xs font-bold text-[#003D9B] tracking-widest uppercase">
                Roles: Purchase Manager, Finance Manager
              </p>
            </motion.div>

            {/* Local Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-[3rem] border border-gray-200 p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="pr-4">
                  <h3 className="font-semibold text-2xl text-gray-900">Local Tier (Branches)</h3>
                  <p className="text-md text-gray-500 mt-0.5">Operational Excellence & Customer Focus</p>
                </div>
                <div className="flex gap-2">
                  <div className="size-12 rounded-lg bg-[#E1E3E4] flex items-center justify-center">
                    <Store className="size-6 text-[#434654]" />
                  </div>
                  <div className="size-12 rounded-lg bg-[#E1E3E4] flex items-center justify-center">
                    <ShieldCheck className="size-6 text-[#434654]" />
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                {[
                  { icon: Store, title: "Local Sales", desc: "Streamlined POS and inventory reduction based on immediate consumer demand." },
                  { icon: PackageCheck, title: "Stock Reception", desc: "Automated verification of stock arriving from HQ or third-party suppliers." },
                  { icon: ArrowLeftRight, title: "Inter-branch Transfers", desc: "Seamless movement of stock between branches to resolve local shortages." },
                ].map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#E1E3E4] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <f.icon className="w-4 h-4 text-[#434654]" />
                    </div>
                    <div>
                      <p className="font-semibold text-md text-gray-900">{f.title}</p>
                      <p className="text-md text-gray-500 leading-relaxed mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-12 text-xs font-bold text-gray-500 tracking-widest uppercase">
                Roles: Store Managers, Sales Staff
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Precision Features for Scale ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[78rem] px-6 mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center"
          >
            Precision Features for Scale
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { icon: RefreshCw, title: "Multi-Store Sync", desc: "Every barcode scan and sale is updated across your entire network in milliseconds." },
              { icon: BarChart2, title: "Real-time Analytics", desc: "Deep dive into heatmaps and turnover rates per branch with AI-driven insights." },
              { icon: Zap, title: "Automated Replenishment", desc: "Set low-stock thresholds and let the system trigger automatic purchase orders." },
              { icon: ShieldCheck, title: "Role-based Access", desc: "Granular permissions ensure employees only see the data they need for their specific role." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group bg-[#F3F4F5] hover:bg-white transition-all duration-300 ease-in-out hover:shadow-lg rounded-2xl px-6 py-10"
              >
                <div className="size-14 rounded-xl bg-[#e8eaff] flex items-center justify-center mb-5 transition-transform duration-100 ease-out group-hover:scale-120">
                  <f.icon className="size-7 text-[#021945]" />
                </div>

                <h3 className="font-semibold text-xl text-gray-900 mb-2">
                  {f.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-[78rem] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">How It Works</h2>
            <p className="text-gray-500 mb-12">Get up and running in minutes, not months.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Register Your Account", desc: "Create your profile and set up your business preferences." },
              { step: "02", title: "Add Products & Suppliers", desc: "Easily input or import your inventory and supplier details." },
              { step: "03", title: "Track & Grow", desc: "Monitor inventory flow, automate purchases, and maximize efficiency." },
            ].map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-8 border border-gray-200 rounded-2xl bg-white hover:shadow-md transition text-left"
              >
                <div className="text-4xl font-extrabold text-[#000ac0] mb-4 opacity-20">{h.step}</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{h.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[78rem] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-2">What Our Users Say</h2>
            <p className="text-gray-500 mb-12">Trusted by businesses across Nigeria and beyond.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Aisha B.", comment: "Store Master has completely changed the way we manage stock. Everything is so seamless now!" },
              { name: "Tunde O.", comment: "The analytics dashboard helps me make data-driven decisions effortlessly." },
              { name: "Grace K.", comment: "Setup was easy and intuitive. I recommend Store Master to every business owner!" },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{r.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#e8eaff] flex items-center justify-center text-[#000ac0] font-bold text-xs">
                    {r.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span className="font-semibold text-sm text-gray-900">{r.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 px-6 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[78rem] mx-auto bg-gradient-to-r from-[#003e9d] to-[#0050c9] rounded-[3rem] py-12 px-12 md:px-42 md:py-16 text-white text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to unify your operations?</h2>
          <p className="text-blue-200 mb-8 text-lg">
            Join 500+ enterprises optimizing their multi-branch inventory with Store Master.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 w-full">
            <Link href="/register" className="w-full md:w-auto">
              <Button className="w-full md:w-auto bg-white text-[#0050c9] font-semibold hover:bg-gray-100 rounded-lg px-8 py-9 text-lg tracking-widest uppercase">
                GET STARTED NOW
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full md:w-auto border text-white text-lg hover:bg-white/30 font-semibold rounded-lg px-8 py-9 tracking-widest uppercase"
            >
              SCHEDULE A CONSULT
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-gray-200 py-14 px-6">
        <div className="max-w-[78rem] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <p className="font-bold text-gray-900 mb-2">Store Master</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                The architectural choice for enterprise multi-branch retail management.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-4">Product</p>
              <ul className="space-y-2">
                {["Features", "API Status", "Documentation"].map(l => (
                  <li key={l}><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-4">Support</p>
              <ul className="space-y-2">
                {["Support", "Terms of Service", "Privacy Policy"].map(l => (
                  <li key={l}><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-4">Connect</p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#000ac0] hover:text-[#000ac0] transition-colors">
                  <Share2 className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#000ac0] hover:text-[#000ac0] transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 text-center">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Store Master. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}