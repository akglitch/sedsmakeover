export const BRAND = {
    name: "SedsMakeover",
    tagline: "Where Every Day is a Transformation",
    contact: {
        phone: "+1 (555) 123-4567",
        email: "contact@sedsmakeover.com",
        address: "123 Luxury Lane, Beverly Hills, CA 90210",
    },
    socials: {
        instagram: "https://instagram.com/sedsmakeover",
        facebook: "https://facebook.com/sedsmakeover",
        twitter: "https://twitter.com/sedsmakeover",
    },
    hours: {
        weekdays: "9:00 AM - 7:00 PM",
        weekend: "10:00 AM - 5:00 PM",
    },
    colors: {
        gold: "#D4A574",
        charcoal: "#2A2D34",
        cream: "#F8F5F0",
        peach: "#E8C8A9",
    }
};

export const SERVICES = [
    {
        id: "hair-cut",
        name: "Luxury Haircut",
        category: "Hair",
        price: 85,
        duration: 60,
        description: "Precision cut tailored to your face shape and lifestyle, including wash and blow-dry.",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "hair-color",
        name: "Full Color & Highlight",
        category: "Hair",
        price: 220,
        duration: 150,
        description: "Custom color blending for a natural, radiant look using premium organic products.",
        image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "facial",
        name: "Rejuvenating Facial",
        category: "Skincare",
        price: 130,
        duration: 75,
        description: "Deep cleansing, exfoliation, and hydration for glowing, youthful skin.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "manicure",
        name: "Royal Gel Manicure",
        category: "Nails",
        price: 65,
        duration: 60,
        description: "Long-lasting gel color, cuticle care, and hand massage.",
        image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "makeup",
        name: "Event Makeup",
        category: "Makeup",
        price: 150,
        duration: 90,
        description: "Professional makeup application for weddings, galas, and special events.",
        image: "https://images.unsplash.com/photo-1487412947132-26c5c1b19462?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "spa",
        name: "Full Body Massage",
        category: "Spa",
        price: 180,
        duration: 90,
        description: "Relaxing full body massage to relieve tension and stress.",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop"
    }
];

export const MENU_ITEMS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];
