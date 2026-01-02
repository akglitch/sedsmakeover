"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const NAV_ITEMS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
]

export function Navigation() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileOpen, setIsMobileOpen] = React.useState(false)
    const pathname = usePathname()

    // Handle Scroll Effect
    React.useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Lock Body Scroll on Mobile Menu
    React.useEffect(() => {
        if (isMobileOpen) document.body.style.overflow = "hidden"
        else document.body.style.overflow = "unset"
    }, [isMobileOpen])

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform",
                    isScrolled
                        ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm"
                        : "bg-transparent py-6 md:py-8"
                )}
            >
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

                    {/* Logo - Corporate Luxury */}
                    <Link href="/" className="relative z-50 group">
                        <span className={cn(
                            "font-serif text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300",
                            isScrolled || isMobileOpen ? "text-charcoal" : "text-charcoal"
                            // Note: Kept text-charcoal on transparent too, assuming light bg or handle in Hero. 
                            // If Hero is dark, we need conditional logic. Let's assume Hero is light/cream based on previous designs.
                        )}>
                            SEDS<span className="text-gold font-light">MAKEOVER</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation - Centered & Precise */}
                    <div className="hidden md:flex items-center gap-10">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-xs font-medium uppercase tracking-[0.2em] relative group py-2",
                                    isScrolled ? "text-gray-600 hover:text-charcoal" : "text-gray-700 hover:text-charcoal",
                                    pathname === item.href && "text-charcoal font-bold"
                                )}
                            >
                                {item.name}
                                <span className={cn(
                                    "absolute bottom-0 left-0 h-[1px] bg-charcoal transition-all duration-300 ease-out",
                                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                                )} />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA - High Trust */}
                    <div className="hidden md:flex items-center gap-6">
                        <a
                            href="tel:+13105550123"
                            className={cn(
                                "hidden lg:flex items-center gap-2 text-xs font-medium tracking-wide transition-colors",
                                isScrolled ? "text-gray-500 hover:text-gold" : "text-gray-600 hover:text-gold"
                            )}
                        >
                            <Phone className="w-3.5 h-3.5" />
                            <span>(310) 555-0123</span>
                        </a>
                        <Button asChild size="sm" className="rounded-full bg-charcoal hover:bg-gold text-white px-8 h-10 text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300">
                            <Link href="/booking">Book Now</Link>
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden relative z-50 p-2 -mr-2 text-charcoal"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                    >
                        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay - Full Screen Corporate */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="fixed inset-0 bg-cream z-40 flex flex-col justify-center items-center"
                    >
                        <div className="space-y-8 text-center">
                            {NAV_ITEMS.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className="block text-4xl font-serif text-charcoal hover:text-gold transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="pt-8"
                            >
                                <Button asChild className="bg-charcoal text-white rounded-none px-12 py-6 text-lg uppercase tracking-widest">
                                    <Link href="/booking" onClick={() => setIsMobileOpen(false)}>Book Appointment</Link>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
