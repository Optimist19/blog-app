'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/create-blog", label: "Create" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="w-full border-b bg-background px-4 py-4 md:px-[5%]">
      <div className="flex items-center justify-between">

        <Link href="/">
          <h1 className="text-2xl font-bold md:text-3xl">
            Learn<span className="text-primary">Pro</span>
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={buttonVariants({
                variant: pathname === link.href ? "default" : "ghost",
              })}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            onClick={toggleMenu}
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className: "md:hidden", 
            })}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-nav"
          className="md:hidden flex flex-col gap-2 mt-4 pt-4 border-t pb-4"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                closeMenu();
                window.location.href = link.href;
              }}
              className={buttonVariants({
                variant: pathname === link.href ? "default" : "ghost",
                className: "justify-start",
              })}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}