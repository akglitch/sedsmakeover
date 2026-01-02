"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { SERVICES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Check, Clock, Plus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const CATEGORIES = ["All", "Hair", "Nails", "Skincare", "Makeup", "Spa"]

export default function ServicesPage() {
    const [activeCategory, setActiveCategory] = React.useState("All")
    const [selectedService, setSelectedService] = React.useState<typeof SERVICES[0] | null>(null)

    const filteredServices = SERVICES.filter(s => activeCategory === "All" || s.category === activeCategory)

    return (
        <div className="bg-cream min-h-screen">
            {/* Minimalist Header */}
            <section className="pt-32 pb-20 px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-serif font-medium text-charcoal mb-6"
                >
                    Service Menu
                </motion.h1>
                <p className="text-gray-500 uppercase tracking-widest text-sm">Curated Tratments for the Modern Muse</p>
            </section>

            {/* Category Navigation - Pill Style -> Minimal Text */}
            <div className="sticky top-20 z-30 bg-cream/90 backdrop-blur-sm py-6 mb-12 border-b border-gold/10">
                <div className="container mx-auto px-4 overflow-x-auto">
                    <div className="flex justify-center gap-8 min-w-max">
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "text-sm font-medium tracking-wider uppercase transition-all duration-300 relative py-2",
                                    activeCategory === category ? "text-charcoal" : "text-gray-400 hover:text-gold"
                                )}
                            >
                                {category}
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="cat-active"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Service List - Editorial Layout */}
            <div className="container mx-auto px-4 max-w-5xl pb-32">
                <motion.div layout className="grid grid-cols-1 gap-x-12 gap-y-0">
                    {filteredServices.map((service, i) => (
                        <motion.div
                            layout
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group py-8 border-b border-charcoal/5 flex flex-col md:flex-row justify-between md:items-center gap-4 cursor-pointer hover:bg-white/50 px-4 -mx-4 rounded-xl transition-colors"
                            onClick={() => setSelectedService(service)}
                        >
                            <div className="flex-1">
                                <div className="flex items-baseline gap-4 mb-2">
                                    <h3 className="text-2xl font-serif text-charcoal group-hover:text-gold transition-colors">{service.name}</h3>
                                    <span className="text-sm text-gray-400 font-light hidden md:inline-block">/ {service.duration} MIN</span>
                                </div>
                                <p className="text-gray-500 font-light max-w-xl line-clamp-2 text-sm md:text-base">
                                    {service.description}
                                </p>
                            </div>
                            <div className="flex items-center gap-8 shrink-0">
                                <span className="text-xl font-medium text-charcoal">${service.price}</span>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gold hover:text-white transition-colors">
                                    <Plus className="w-5 h-5" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Detailed Modal - Clean & Elegant */}
            <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
                <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white border-none rounded-none md:rounded-lg">
                    {selectedService && (
                        <div className="flex flex-col md:flex-row h-[80vh] md:h-auto">
                            <div className="relative h-64 md:h-auto md:w-1/2">
                                <Image
                                    src={selectedService.image}
                                    alt={selectedService.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center md:w-1/2 bg-cream">
                                <span className="text-gold uppercase tracking-widest text-xs font-bold mb-4">{selectedService.category}</span>
                                <h2 className="text-3xl font-serif font-bold text-charcoal mb-6">{selectedService.name}</h2>
                                <p className="text-gray-600 leading-relaxed mb-8 font-light">
                                    {selectedService.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="border border-charcoal/10 p-4 text-center">
                                        <p className="text-gray-400 text-xs uppercase mb-1">Price</p>
                                        <p className="text-xl font-medium text-charcoal">${selectedService.price}</p>
                                    </div>
                                    <div className="border border-charcoal/10 p-4 text-center">
                                        <p className="text-gray-400 text-xs uppercase mb-1">Duration</p>
                                        <p className="text-xl font-medium text-charcoal">{selectedService.duration}m</p>
                                    </div>
                                </div>

                                <Button asChild className="w-full bg-charcoal hover:bg-gold text-white rounded-sm h-12 uppercase tracking-wide transition-all">
                                    <Link href={`/booking?service=${selectedService.id}`}>Book This Service</Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
