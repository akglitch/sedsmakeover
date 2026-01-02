"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock, Check, ChevronRight, ChevronLeft, Loader2, Sparkles } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

import { SERVICES } from "@/lib/constants"
import { cn } from "@/lib/utils"

const bookingSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    notes: z.string().optional(),
})

type BookingFormValues = z.infer<typeof bookingSchema>

const TIME_SLOTS = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
]

const STEPS = ["Service", "Date & Time", "Details", "Confirmation"]

function BookingContent() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [currentStep, setCurrentStep] = React.useState(0)
    const [selectedServiceId, setSelectedServiceId] = React.useState<string | null>(searchParams.get("service"))
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [selectedTime, setSelectedTime] = React.useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
    })

    const selectedService = SERVICES.find(s => s.id === selectedServiceId)

    const handleNext = () => {
        if (currentStep === 0 && !selectedServiceId) {
            toast.error("Please select a service")
            return
        }
        if (currentStep === 1 && (!date || !selectedTime)) {
            toast.error("Please select a date and time")
            return
        }
        setCurrentStep(prev => prev + 1)
    }

    const handleBack = () => {
        setCurrentStep(prev => prev - 1)
    }

    const onSubmit = async (data: BookingFormValues) => {
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        console.log({
            service: selectedService,
            date,
            time: selectedTime,
            ...data
        })

        setIsSubmitting(false)
        setCurrentStep(3) // Move to confirmation
        toast.success("Booking confirmed successfully!")
    }

    const progress = ((currentStep + 1) / STEPS.length) * 100

    return (
        <div className="min-h-screen bg-cream py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-charcoal mb-4">Book Your Appointment</h1>
                    <p className="text-gray-500">Follow the steps below to schedule your luxury experience.</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-12 relative max-w-2xl mx-auto">
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gold"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        {STEPS.map((step, index) => (
                            <span
                                key={step}
                                className={cn(
                                    "text-xs font-semibold uppercase tracking-wider transition-colors",
                                    index <= currentStep ? "text-gold" : "text-gray-300"
                                )}
                            >
                                {step}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[500px] border border-gold/10 relative">
                    <div className="p-8 lg:p-12">
                        <AnimatePresence mode="wait">
                            {currentStep === 0 && (
                                <motion.div
                                    key="step-0"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-serif font-semibold text-charcoal mb-8">Select a Service</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {SERVICES.map((service) => (
                                            <div
                                                key={service.id}
                                                onClick={() => setSelectedServiceId(service.id)}
                                                className={cn(
                                                    "p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-gold/50 flex gap-4 items-center group",
                                                    selectedServiceId === service.id
                                                        ? "border-gold bg-gold/5"
                                                        : "border-gray-100 hover:bg-gray-50"
                                                )}
                                            >
                                                <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0 relative">
                                                    {/* Placeholder for image optimization */}
                                                    <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className={cn("font-serif font-medium group-hover:text-gold transition-colors", selectedServiceId === service.id ? "text-gold" : "text-charcoal")}>{service.name}</h3>
                                                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                                        <span>${service.price}</span>
                                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration}m</span>
                                                    </div>
                                                </div>
                                                {selectedServiceId === service.id && (
                                                    <div className="w-6 h-6 rounded-full bg-gold text-white flex items-center justify-center shrink-0">
                                                        <Check className="w-4 h-4" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 1 && (
                                <motion.div
                                    key="step-1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-serif font-semibold text-charcoal mb-8">Choose Date & Time</h2>
                                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                                        <div className="flex-1">
                                            <Label className="mb-4 block text-gray-500">Select Date</Label>
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                                className="rounded-xl border shadow-sm p-4 w-full"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <Label className="mb-4 block text-gray-500">Available Time Slots</Label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {TIME_SLOTS.map((time) => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={cn(
                                                            "py-2 px-4 rounded-lg text-sm font-medium transition-all border",
                                                            selectedTime === time
                                                                ? "bg-gold text-white border-gold shadow-md"
                                                                : "bg-white text-gray-700 border-gray-200 hover:border-gold hover:text-gold"
                                                        )}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step-2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h2 className="text-2xl font-serif font-semibold text-charcoal mb-8">Your Details</h2>
                                    <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input id="name" {...register("name")} placeholder="Jane Doe" />
                                                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input id="phone" {...register("phone")} placeholder="(555) 123-4567" />
                                                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" type="email" {...register("email")} placeholder="jane@example.com" />
                                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="notes">Special Requests (Optional)</Label>
                                            <Textarea id="notes" {...register("notes")} placeholder="Any allergies or preferences?" className="min-h-[100px]" />
                                        </div>

                                        <div className="bg-gray-50 p-6 rounded-xl space-y-3 mt-8">
                                            <h4 className="font-serif font-medium text-charcoal">Booking Summary</h4>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Service</span>
                                                <span className="font-medium text-charcoal">{selectedService?.name}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Date & Time</span>
                                                <span className="font-medium text-charcoal">
                                                    {date ? format(date, "MMMM d, yyyy") : ""} at {selectedTime}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Total</span>
                                                <span className="font-bold text-gold text-lg">${selectedService?.price}</span>
                                            </div>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step-3"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                        <Sparkles className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Booking Confirmed!</h2>
                                    <p className="text-gray-500 max-w-md mx-auto mb-8">
                                        Thank you for choosing SedsMakeover. A confirmation email has been sent to your inbox. We look forward to seeing you.
                                    </p>
                                    <div className="bg-gray-50 p-6 rounded-2xl w-full max-w-md mb-8 border border-gray-100">
                                        <p className="font-medium text-charcoal mb-2">Appointment Details</p>
                                        <p className="text-gold font-serif text-xl mb-1">{selectedService?.name}</p>
                                        <p className="text-gray-500 text-sm">
                                            {date ? format(date, "EEEE, MMMM d") : ""} • {selectedTime}
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button variant="outline" onClick={() => router.push("/")}>Return Home</Button>
                                        <Button onClick={() => router.push("/services")} className="bg-gold hover:bg-gold/90 text-white">Book Another</Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer Buttons */}
                    {currentStep < 3 && (
                        <div className="border-t border-gray-100 p-6 bg-gray-50/50 flex justify-between items-center">
                            <Button
                                variant="ghost"
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className={cn("text-gray-500 hover:text-charcoal", currentStep === 0 && "invisible")}
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>

                            {currentStep === 2 ? (
                                <Button
                                    form="booking-form"
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-gold hover:bg-gold/90 text-white px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Confirming...
                                        </>
                                    ) : (
                                        "Confirm Booking"
                                    )}
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleNext}
                                    className="bg-charcoal hover:bg-charcoal/90 text-white px-6 rounded-full"
                                >
                                    Next Step
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function BookingPage() {
    return (
        <React.Suspense fallback={
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-gold" />
            </div>
        }>
            <BookingContent />
        </React.Suspense>
    )
}
