"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPage() {
    return (
        <div className="bg-cream min-h-screen">
            {/* Hero Text */}
            <section className="pt-40 pb-20 px-4 container mx-auto text-center max-w-4xl">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-8xl font-serif font-bold text-charcoal mb-10"
                >
                    The Story
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed"
                >
                    Founded on the belief that beauty is an art form, SedsMakeover has been a sanctuary for transformation since 2018. We marry technical precision with a luxurious, sensory experience.
                </motion.p>
            </section>

            {/* Large Parallax Image */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2574&auto=format&fit=crop"
                    alt="Salon Interior"
                    fill
                    className="object-cover"
                />
            </section>

            {/* Narrative Section - Two Col */}
            <section className="py-32 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
                    <div>
                        <h2 className="text-4xl font-serif font-bold text-charcoal mb-6">Our Philosophy</h2>
                        <div className="h-1 w-20 bg-gold mb-8"></div>
                        <p className="text-gray-500 text-lg leading-relaxed mb-6">
                            At SedsMakeover, we believe in a holistic approach to beauty. It’s not just about the cut or the color—it’s about how you feel when you look in the mirror.
                        </p>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            Our salon was designed as a retreat from the city's noise. Minimalist interiors, soft lighting, and curated scents create an atmosphere of pure relaxation from the moment you step inside.
                        </p>
                    </div>
                    <div className="relative h-[500px] w-full bg-gray-100">
                        <Image
                            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1471&auto=format&fit=crop"
                            alt="Stylist at work"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Team Section - Clean Portraits */}
            <section className="py-32 bg-white px-4">
                <div className="container mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif text-center mb-24">The Artisans</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: "Sarah Jenkins", role: "Creative Director", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop" },
                            { name: "Michael Chen", role: "Master Colorist", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop" },
                            { name: "Jessica Cole", role: "Senior Stylist", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop" },
                        ].map((member, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative h-[500px] w-full mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden">
                                    <Image
                                        src={member.img}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-2xl font-serif text-charcoal">{member.name}</h3>
                                <p className="text-gold text-sm tracking-widest uppercase mt-2">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
