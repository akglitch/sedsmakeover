"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

export default function Home() {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <div ref={containerRef} className="bg-white">

      {/* MINIMALIST HERO - Aesop Style */}
      <section ref={heroRef} className="relative h-screen w-full bg-[#f5f1eb] overflow-hidden">

        {/* Refined Background */}
        <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=2676&auto=format&fit=crop"
              alt="Luxury Beauty Products"
              fill
              className="object-cover opacity-15"
              priority
            />
            {/* Soft gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f5f1eb]/40 to-[#f5f1eb]" />
          </div>
        </motion.div>

        {/* Content - Centered Minimalism */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            {/* Minimalist Typography */}
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-charcoal mb-8 tracking-tight font-light">
              SedsMakeover
            </h1>

            <div className="w-16 h-[1px] bg-charcoal/30 mx-auto mb-8"></div>

            <p className="text-charcoal/60 text-sm md:text-base tracking-[0.2em] uppercase font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              A sanctuary for the discerning. Where beauty is refined, not redefined.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <Button asChild variant="outline" className="rounded-none border-charcoal text-charcoal hover:bg-charcoal hover:text-white transition-all duration-500 h-14 px-12 text-xs uppercase tracking-[0.3em]">
                <Link href="/booking">Reserve</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 text-charcoal/40" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-32 md:py-40 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-charcoal/40 font-medium">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-serif text-charcoal mt-6 font-light leading-tight">
                Quiet luxury in every detail
              </h2>
            </div>
            <div className="space-y-6 text-charcoal/70 leading-relaxed">
              <p>
                We believe in the power of subtlety. Our approach honors the individual,
                enhancing natural beauty through meticulous attention and time-honored techniques.
              </p>
              <p>
                Each service is a considered act—delivered in an environment designed
                for contemplation and renewal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID - Minimalist */}
      <section className="py-20 bg-[#f5f1eb]">
        <div className="container mx-auto px-6">

          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal font-light">Services</h2>
            <div className="w-12 h-[1px] bg-charcoal/20 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-charcoal/10">
            {[
              {
                title: "Hair",
                desc: "Precision cutting and color",
                img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1574&auto=format&fit=crop"
              },
              {
                title: "Skin",
                desc: "Advanced facial treatments",
                img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"
              },
              {
                title: "Body",
                desc: "Therapeutic massage & care",
                img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"
              },
            ].map((service, i) => (
              <Link
                key={i}
                href="/services"
                className="group relative bg-white overflow-hidden aspect-[3/4] block"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-white/60 group-hover:bg-white/40 transition-colors duration-500" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                  <h3 className="text-2xl font-serif text-charcoal mb-2 font-light">{service.title}</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-charcoal/60">{service.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE BREAK */}
      <section className="h-[70vh] relative">
        <Image
          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop"
          alt="Sanctuary"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-white/50" />
      </section>

      {/* TESTIMONIAL */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-2xl md:text-3xl font-serif text-charcoal font-light leading-relaxed mb-8">
            "An experience that transcends the ordinary. Every visit feels like a return to oneself."
          </p>
          <div className="w-12 h-[1px] bg-charcoal/20 mx-auto mb-4"></div>
          <p className="text-xs uppercase tracking-[0.3em] text-charcoal/40">— Client Since 2022</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-[#2a2d34] text-white">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-serif font-light mb-8">Begin your journey</h2>
          <p className="text-white/60 text-sm tracking-[0.2em] uppercase mb-12">
            Appointments available by reservation
          </p>
          <Button asChild variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-charcoal transition-all duration-500 h-14 px-12 text-xs uppercase tracking-[0.3em]">
            <Link href="/booking">Book Now</Link>
          </Button>
        </div>
      </section>

    </div>
  )
}
