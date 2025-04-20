import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiMail, FiInfo, FiShield } from "react-icons/fi";

const footerLinks = [
  { name: "About", href: "#about", icon: <FiInfo /> },
  { name: "Privacy", href: "#privacy", icon: <FiShield /> },
  { name: "Contact", href: "mailto:support@habitvault.com", icon: <FiMail /> },
  { name: "GitHub", href: "https://github.com/your-repo", icon: <FiGithub /> },
  {
    name: "Twitter",
    href: "https://twitter.com/yourhandle",
    icon: <FiTwitter />,
  },
];

const Footer = () => {
  return (
    <footer className="backdrop-blur-lg bg-white/10 border-t border-white/20 shadow-inner mt-12">
      <div className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 select-none">
          <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
            HabitVault
          </span>
        </div>
        <div className="flex flex-wrap gap-5 justify-center items-center">
          {footerLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/80 hover:text-cyan-300 transition-colors text-sm font-medium"
            >
              {item.icon}
              {item.name}
            </a>
          ))}
        </div>
        <div className="text-center text-xs text-white/50 mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} HabitVault. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
