"use client"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    subject: z.string().min(5, "Subject too short"),
    message: z.string().min(10, "Message too short"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactFormValues) => {
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log(data)
        toast.success("Message sent successfully")
        reset()
    }

    return (
        <div className="min-h-screen bg-cream flex flex-col md:flex-row">
            {/* Visual Side (Left) */}
            <div className="w-full md:w-1/2 relative bg-charcoal text-cream p-12 lg:p-24 flex flex-col justify-between min-h-[50vh] md:min-h-screen z-10">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-20" />

                <div className="relative">
                    <span className="text-gold uppercase tracking-widest text-sm font-semibold mb-4 block">Get in Touch</span>
                    <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-8">Let's Create<br />Beauty</h1>
                    <p className="text-lg text-cream/70 max-w-md font-light leading-relaxed">
                        Have a question or want to book a bespoke consultation? We are here to help you shine.
                    </p>
                </div>

                <div className="relative space-y-8 mt-12 md:mt-0">
                    <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-gold shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-serif mb-1">Visit Us</h3>
                            <p className="text-cream/60">123 Luxury Lane, Beverly Hills, CA 90210</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Phone className="w-6 h-6 text-gold shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-serif mb-1">Call Us</h3>
                            <p className="text-cream/60">(310) 555-0123</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Mail className="w-6 h-6 text-gold shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-serif mb-1">Email</h3>
                            <p className="text-cream/60">concierge@sedsmakeover.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Side (Right) */}
            <div className="w-full md:w-1/2 bg-white px-8 md:px-24 py-20 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-md"
                >
                    <h2 className="text-3xl font-serif text-charcoal mb-8">Send a Message</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs uppercase tracking-wider text-gray-500">Name</Label>
                            <Input id="name" {...register("name")} className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gold bg-transparent placeholder:text-gray-300" placeholder="Jane Doe" />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs uppercase tracking-wider text-gray-500">Email</Label>
                            <Input id="email" {...register("email")} className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gold bg-transparent placeholder:text-gray-300" placeholder="jane@example.com" />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject" className="text-xs uppercase tracking-wider text-gray-500">Subject</Label>
                            <Input id="subject" {...register("subject")} className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gold bg-transparent placeholder:text-gray-300" placeholder="Inquiry about..." />
                            {errors.subject && <p className="text-red-500 text-xs">{errors.subject.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-xs uppercase tracking-wider text-gray-500">Message</Label>
                            <Textarea id="message" {...register("message")} className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gold bg-transparent placeholder:text-gray-300 min-h-[100px] resize-none" placeholder="How can we help you?" />
                            {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full bg-charcoal hover:bg-gold text-white rounded-none h-14 uppercase tracking-widest text-sm transition-all mt-8">
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}
