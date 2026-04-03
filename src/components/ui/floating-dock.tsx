"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Mail, Phone, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const FloatingDock = () => {
  const links = [
    {
      title: "Call",
      icon: <Phone className="h-full w-full text-white" />,
      href: "tel:+919730423423",
    },
    {
      title: "Email",
      icon: <Mail className="h-full w-full text-white" />,
      href: "mailto:crm.alihasan@gmail.com",
    },
    {
      title: "LinkedIn",
      icon: <Briefcase className="h-full w-full text-white" />,
      href: "https://www.linkedin.com/in/hasanali-s-7b0a8814a/",
    },
    {
      title: "Top",
      icon: <ArrowUp className="h-full w-full text-white" />,
      href: "#",
    },
  ];

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex h-14 items-center justify-center gap-3 sm:gap-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 px-4 shadow-2xl transition-colors"
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {links.map((link) => (
        <DockIcon key={link.title} title={link.title} href={link.href}>
          {link.icon}
        </DockIcon>
      ))}
    </div>
  );
};

const DockIcon = ({
  children,
  title,
  href,
}: {
  children: React.ReactNode;
  title: string;
  href: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href} target={href.startsWith("http") ? "_blank" : undefined}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.3, y: -5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative flex aspect-square h-10 items-center justify-center rounded-full bg-white/10 p-2.5"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/90 px-2 py-0.5 text-xs text-black font-medium shadow-xl pointer-events-none"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        {children}
      </motion.div>
    </Link>
  );
};
