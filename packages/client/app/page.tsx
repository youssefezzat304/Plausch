"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6">
      <section className="text-center max-w-3xl">
        <motion.h1
          className="text-5xl font-bold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Connect, Chat, and Stay in Touch
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          A secure and real-time chat platform designed for effortless
          communication.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link href="/signup">
            <button className="cursor-pointer bg-(--primary-hard) text-white px-6 py-3 rounded-lg shadow-lg hover:bg-(--primary-soft) transition active:scale-95">
              Get Started
            </button>
          </Link>
          <Link href="/login">
            <button className="cursor-pointer bg-gray-200 text-gray-900 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-300 transition active:scale-95">
              Login
            </button>
          </Link>
        </motion.div>
      </section>

      <section className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <feature.icon className="text-(--primary-hard) mx-auto w-12 h-12 mb-3" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}

import {
  ChatBubbleOvalLeftIcon,
  LockClosedIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Instant Messaging",
    description: "Real-time messaging with zero delays.",
    icon: ChatBubbleOvalLeftIcon,
  },
  {
    title: "Secure & Private",
    description: "End-to-end encryption for all conversations.",
    icon: LockClosedIcon,
  },
  {
    title: "Blazing Fast",
    description: "Optimized performance with real-time updates.",
    icon: RocketLaunchIcon,
  },
];
