"use client"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BRAND } from "@/lib/constants"
import { ChevronDown, Star } from "lucide-react"

export function Hero() {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 200])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    return (
        <section className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-charcoal text-cream">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/90 to-charcoal z-10" />
                {/* Dynamic Background Image Placeholder - could be a Next.js Image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center grayscale-[50%] opacity-30 scale-105" />

                <motion.div
                    style={{ y }}
                    className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent z-10"
                />

                {/* Animated Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-peach/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
            </div>

            <div className="container relative z-20 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-6 space-y-4"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs md:text-sm font-medium tracking-[0.2em] uppercase border border-gold/30 rounded-full text-gold bg-gold/5 backdrop-blur-sm"
                    >
                        <Star className="w-3 h-3 fill-gold" />
                        Premium Salon Experience
                        <Star className="w-3 h-3 fill-gold" />
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold text-cream mb-6 leading-[1.1] tracking-tight">
                        Reveal Your <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-peach to-gold italic pr-2">Inner Shine</span>
                    </h1>

                    <p className="text-lg md:text-xl text-cream/70 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                        {BRAND.tagline}. Step into a world of elegance and let our expert stylists transform your look.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-white min-w-[200px] h-14 text-lg rounded-full shadow-[0_0_30px_rgba(212,165,116,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,165,116,0.5)]">
                        <Link href="/booking">Book Appointment</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-gold/50 text-gold hover:bg-gold hover:text-white hover:border-gold min-w-[200px] h-14 text-lg rounded-full backdrop-blur-sm transition-all bg-transparent">
                        <Link href="/services">Explorer Services</Link>
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-cream/50 text-sm md:text-base border-t border-cream/5 pt-8 max-w-4xl mx-auto"
                >
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl font-serif text-gold">500+</span>
                        <span className="uppercase tracking-widest text-xs">Happy Clients</span>
                    </div>
                    <div className="w-px h-8 bg-cream/10 hidden sm:block" />
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl font-serif text-gold">15+</span>
                        <span className="uppercase tracking-widest text-xs">Expert Staff</span>
                    </div>
                    <div className="w-px h-8 bg-cream/10 hidden sm:block" />
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl font-serif text-gold">4.9</span>
                        <span className="uppercase tracking-widest text-xs">Average Rating</span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gold/60 cursor-pointer hover:text-gold transition-colors"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-[10px] uppercase tracking-[0.2em]">Scroll Down</span>
                <ChevronDown className="w-5 h-5" />
            </motion.div>
        </section>
    )
}
