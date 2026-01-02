"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BRAND, MENU_ITEMS } from "@/lib/constants"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-charcoal text-cream border-t border-gold/10">
            <div className="container mx-auto px-4 py-16 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-3xl font-serif font-bold text-white tracking-tight">
                                {BRAND.name}
                            </span>
                        </Link>
                        <p className="text-cream/60 leading-relaxed max-w-xs">
                            {BRAND.tagline}. Dedicated to providing the finest beauty and spa services in an elegant, relaxing environment.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href={BRAND.socials.instagram} className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href={BRAND.socials.facebook} className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href={BRAND.socials.twitter} className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-serif font-medium text-gold">Explore</h3>
                        <ul className="space-y-4">
                            {MENU_ITEMS.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-cream/70 hover:text-gold transition-colors inline-flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-serif font-medium text-gold">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-cream/70">
                                <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                                <span>{BRAND.contact.address}</span>
                            </li>
                            <li className="flex items-center gap-3 text-cream/70">
                                <Phone className="w-5 h-5 text-gold shrink-0" />
                                <a href={`tel:${BRAND.contact.phone}`} className="hover:text-gold transition-colors">{BRAND.contact.phone}</a>
                            </li>
                            <li className="flex items-center gap-3 text-cream/70">
                                <Mail className="w-5 h-5 text-gold shrink-0" />
                                <a href={`mailto:${BRAND.contact.email}`} className="hover:text-gold transition-colors">{BRAND.contact.email}</a>
                            </li>
                            <li className="flex items-start gap-3 text-cream/70">
                                <Clock className="w-5 h-5 text-gold shrink-0 mt-1" />
                                <div className="space-y-1">
                                    <p>Mon-Fri: {BRAND.hours.weekdays}</p>
                                    <p>Sat-Sun: {BRAND.hours.weekend}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-serif font-medium text-gold">Newsletter</h3>
                        <p className="text-cream/60 text-sm">Subscribe to receive exclusive offers and beauty tips.</p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder="Your Details"
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gold"
                            />
                            <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-white">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/40">
                    <p>© {currentYear} {BRAND.name}. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
