"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Zap, Shield, Code, Book, Users, MessageSquare, Globe, ArrowRight } from "lucide-react";

import AccountDropwdown from "@/widgets/forms/AccountDropwdown"
import nav from "@plextype/res/config/navigation.json";


interface Inspage {
  route?: string;
}
interface MenuItem {
  name: string;
  title: string;
  route: string;
  icon?: string;
  parent?: string;
  subMenu?: MenuItem[];
}
export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [showNavigation, setShowNavigation] = useState(false);
  const [currentPage, setCurrentPage] = useState<Inspage | undefined>();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  useEffect(() => {
    const params = pathname?.split("/");

    if (params?.length) {
      const page = params?.length > 2 ? `${params?.[2]}` : `${params?.[1]}`;

      setCurrentPage({ route: page });
    }
  }, [pathname]);

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      // transition 설정 시 에러 방지를 위해 visibility는 제거하거나
      // transitionEnd로 옮기는 것이 좋습니다.
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut", // 이제 Variants 타입 덕분에 string이 아닌 Easing 타입으로 인식됩니다.
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const getMenuByName = (menuConfig: Record<string, MenuItem>, name: string): MenuItem | null => {
    // reduce<반환타입>을 명시하여 found와 menu의 타입을 확정짓습니다.
    return Object.values(menuConfig).reduce<MenuItem | null>((found, menu) => {
      // 이제 menu는 MenuItem 타입으로 인식됩니다.
      if (found) return found;
      if (menu.name === name) return menu;

      return menu.subMenu?.find((sub) => sub.name === name) || null;
    }, null);
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };


  const matched = getMenuByName(nav.header, currentPage?.route ?? "");
  return (
    <header className="sticky top-0 w-full z-50 bg-white backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* 로고 영역 */}
        <div className="flex items-center gap-10">
          <Link href="/" className="font-extrabold text-xl tracking-tighter flex items-center gap-2 text-black">
            <div className="w-6 h-6 bg-black rounded-lg" /> PLEXTYPE
          </Link>

          {/* 메인 네비게이션 */}
          <nav className="hidden md:flex items-center">
            {nav.header &&
              Object.entries(nav.header).map(([key, item]) => (
                <div
                  key={item.name}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => setHoveredMenu(item.name)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Link
                    href={item.route}
                    className={
                      "relative flex items-center gap-2 py-2 px-5 text-xs font-normal lg:text-sm tracking-wider transition-colors duration-200 " +
                      (matched?.parent === item.parent
                        ? "text-gray-900 dark:text-white font-medium bg-gray-900/5 backdrop-blur-lg hover:bg-gray-900/5 rounded-full "
                        : "dark:text-dark-500 text-gray-950 hover:text-gray-400 dark:hover:text-white")
                    }
                  >
                    <div>{item.title}</div>
                    {item.subMenu.length > 0 && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-3 transition-transform duration-200 ${hoveredMenu === item.name ? "rotate-180" : ""}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>

                    )}
                  </Link>

                  {/* 2차 메뉴 영역 */}
                  <AnimatePresence>
                    {item.subMenu.length > 0 && hoveredMenu === item.name && (
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-0 top-full z-50 pt-2 w-48"
                      >
                        <div className="overflow-hidden rounded-lg shadow-lg shadow-gray-900/5 bg-white dark:bg-dark-900/75 backdrop-blur-lg border border-gray-100 dark:border-dark-800">
                          <div className="flex flex-col py-1">
                            {item.subMenu.map((subItem) => (
                              <motion.div
                                key={subItem.name} variants={itemVariants}
                                whileHover={{ x: 6 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              >
                                <Link
                                  href={subItem.route}
                                  className={
                                    "block px-4 py-3 text-xs dark:text-gray-200 transition-colors " +
                                    (subItem.name === currentPage?.route ? " text-gray-400 " : "  text-gray-900 hover:text-gray-400")
                                  }
                                >
                                  {subItem.title}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
          </nav>
        </div>

        {/* 오른쪽 버튼 */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <AccountDropwdown />
          </div>
        </div>
      </div>
    </header>
  );
}