"use client"
import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn } from "lucide-react"

const GALLERY_IMAGES = [
    { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop", category: "Hair" },
    { src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop", category: "Makeup" },
    { src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1000&auto=format&fit=crop", category: "Nails" },
    { src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop", category: "Hair" },
    { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1000&auto=format&fit=crop", category: "Spa" },
    { src: "https://images.unsplash.com/photo-1487412947132-26c5c1b19462?q=80&w=1000&auto=format&fit=crop", category: "Makeup" },
    { src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1000&auto=format&fit=crop", category: "Nails" },
    { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop", category: "Skincare" },
    { src: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1000&auto=format&fit=crop", category: "Spa" },
]

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null)

    return (
        <div className="bg-cream min-h-screen py-20 px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">Our Transformations</h1>
                <p className="text-gray-500">A visual journey through our finest work.</p>
            </div>

            <div className="container mx-auto">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {GALLERY_IMAGES.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group rounded-xl overflow-hidden break-inside-avoid shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                            onClick={() => setSelectedImage(img.src)}
                        >
                            <Image
                                src={img.src}
                                alt="Gallery Image"
                                width={500}
                                height={700}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ZoomIn className="text-white w-8 h-8" />
                            </div>
                            <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-charcoal opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                {img.category}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-10 h-10" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="relative w-full max-w-5xl h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Full Screen View"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
