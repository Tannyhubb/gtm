"use client";

import { motion } from "framer-motion";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
];

export default function Footer() {
  return (
    <footer className="section-padding py-12 border-t border-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <a
            href="#"
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <div className="font-mono text-xl tracking-tight flex items-center">
              <span className="text-accent mr-2">{">"}</span>
              <span className="text-fg font-bold">buildyour.company</span>
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="text-accent ml-0.5 mt-1"
              >
                _
              </motion.span>
            </div>
          </a>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted hover:text-fg transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <span className="hidden md:block w-px h-4 bg-border" />
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted hover:text-fg transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} buildyour.company. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Strategy · Positioning · Demand · Revenue
          </p>
        </div>
      </div>
    </footer>
  );
}
