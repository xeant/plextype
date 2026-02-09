"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wine, ChevronDown, Settings } from "lucide-react";
import AccountDropwdown from "@/widgets/forms/AccountDropwdown";
import drinkNavConfig from "@/app/drink/drink-nav.json";

interface MenuItem {
  name: string;
  title: string;
  route: string;
  subMenu: { name: string; title: string; route: string }[];
}

export default function DrinkHeader() {
  const pathname = usePathname();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState("");

  useEffect(() => {
    // URL에서 현재 위치 표시 로직
    const segment = pathname?.split("/")[2] || "";
    setCurrentRoute(segment);
  }, [pathname]);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut", staggerChildren: 0.05 }
    },
    exit: { opacity: 0, y: 10, transition: { duration: 0.15 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -5 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/drink" className="font-extrabold text-xl tracking-tighter flex items-center gap-2 text-black">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-100 shadow-lg">
              <Wine className="text-white size-5" />
            </div>
            <span>DRINK<span className="text-indigo-600">.</span>LIFE</span>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {Object.values(drinkNavConfig.header).map((item: MenuItem) => (
              <div
                key={item.name}
                className="relative flex items-center h-full"
                onMouseEnter={() => setHoveredMenu(item.name)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  href={item.route}
                  className={`relative flex items-center gap-1.5 py-1.5 px-3.5 text-sm tracking-tight transition-all duration-200 rounded-full ${
                    currentRoute === item.name
                      ? "text-indigo-600 font-bold bg-indigo-50"
                      : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {item.title}
                  {item.subMenu.length > 0 && (
                    <ChevronDown className={`size-3 transition-transform duration-200 ${hoveredMenu === item.name ? "rotate-180" : ""}`} />
                  )}
                </Link>

                <AnimatePresence>
                  {item.subMenu.length > 0 && hoveredMenu === item.name && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-0 top-full pt-2 w-40"
                    >
                      <div className="overflow-hidden rounded-xl shadow-xl border border-gray-100 bg-white p-1">
                        {item.subMenu.map((sub) => (
                          <motion.div key={sub.name} variants={itemVariants}>
                            <Link
                              href={sub.route}
                              className="block px-3 py-2 text-xs text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            >
                              {sub.title}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
            <Settings className="size-5" />
          </button>
          <div className="h-4 w-[1px] bg-gray-200" />
          <AccountDropwdown />
        </div>
      </div>
    </header>
  );
}