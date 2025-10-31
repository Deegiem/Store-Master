"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div 
      style={{
    backgroundImage: "url('/public/hero-bg.jpg')",
  }}
    className="min-h-screen flex flex-col font-sans">
      {/* Hero Section */}
      <section className="bg-[#000ac0] text-white py-24 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Store Master
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
        >
          Smart inventory control for modern businesses. Simplify, optimize, and grow with ease.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center gap-4"
        >
          <Link href="/register">
            <Button className="bg-white text-[#000ac0] font-semibold hover:bg-gray-100">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="border-white  text-white bg-[#000ac0] hover:bg-white hover:text-[#000ac0]">
              Login
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000ac0] mb-12">Powerful Features</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Automated Inventory Tracking",
              desc: "Monitor stock levels, sales, and supplier data in real-time.",
            },
            {
              title: "Advanced Analytics",
              desc: "Gain insights into your business performance with intuitive dashboards.",
            },
            {
              title: "Multi-User Access",
              desc: "Assign roles and manage staff access securely.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.6, duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition"
            >
              <CheckCircle className="text-[#000ac0] w-10 h-10 mb-4 mx-auto" />
              <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000ac0] mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            {
              step: "1",
              title: "Register Your Account",
              desc: "Create your profile and set up your business preferences.",
            },
            {
              step: "2",
              title: "Add Products & Suppliers",
              desc: "Easily input or import your inventory and supplier details.",
            },
            {
              step: "3",
              title: "Track & Grow",
              desc: "Monitor inventory flow, automate purchases, and maximize efficiency.",
            },
          ].map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.6, duration: 0.5 }}
              className="p-8 border rounded-2xl shadow-sm bg-gray-50 hover:shadow-md transition"
            >
              <div className="text-5xl font-bold text-[#000ac0] mb-4">{h.step}</div>
              <h3 className="font-semibold text-xl mb-2">{h.title}</h3>
              <p className="text-gray-600">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000ac0] mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Aisha B.",
              comment:
                "Store Master has completely changed the way we manage stock. Everything is so seamless now!",
            },
            {
              name: "Tunde O.",
              comment: "The analytics dashboard helps me make data-driven decisions effortlessly.",
            },
            {
              name: "Grace K.",
              comment: "Setup was easy and intuitive. I recommend Store Master to every business owner!",
            },
          ].map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.6, duration: 0.5 }}
              className="bg-white p-6 rounded-2xl border shadow-sm"
            >
              <p className="italic text-gray-600 mb-4">“{r.comment}”</p>
              <h4 className="font-semibold text-[#000ac0]">{r.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000ac0] text-white py-10 px-6 text-center">
        <p className="text-sm mb-2">&copy; {new Date().getFullYear()} Store Master. All rights reserved.</p>
        <p className="text-sm">Designed with excellence for the next generation of business efficiency.</p>
      </footer>
    </div>
  );
}
