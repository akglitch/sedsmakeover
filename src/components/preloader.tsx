"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Disable scrolling while loading
        document.body.style.overflow = "hidden"

        const timer = setTimeout(() => {
            setIsLoading(false)
            document.body.style.overflow = "unset"
        }, 2000)

        return () => {
            clearTimeout(timer)
            document.body.style.overflow = "unset"
        }
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-cream flex items-center justify-center flex-col"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center"
                    >
                        <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
                            SEDS<span className="text-gold font-light">MAKEOVER</span>
                        </h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-0.5 bg-gold mx-auto"
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-gray-500"
                        >
                            Redefining Luxury
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
