// This is a placeholder for Resend email integration.
// Since the backend is not set up, we will log to console.

export async function sendBookingConfirmation(email: string, details: any) {
    console.log("------------------------------------------");
    console.log(`[MOCK EMAIL] Sending confirmation to ${email}`);
    console.log("Details:", details);
    console.log("------------------------------------------");

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true };
}
