import Stripe from "stripe";

if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_API_KEY) {
    throw new Error("No Stripe api key found.");
}
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_API_KEY);

const createStripeCheckout = async (plan: "basic" | "pro" | "advance") => {
    try {
        const productMap = {
            basic: "prod_RWMMSyYT80kfCp", // Replace with your Basic Product ID
            pro: "prod_RWMNYldW7kswUc", // Replace with your Standard Product ID
            advance: "prod_RWMNRqt5ngpMTx", // Replace with your Premium Product ID
        };

        // Define pricing for each plan (in cents)
        const priceMap = {
            basic: 499, // $4.99
            pro: 999, // $9.99
            advance: 1499, // $14.99
        };

        // Check if the plan exists
        if (!productMap[plan]) {
            throw new Error("Invalid plan selected.");
        }

        // Create a price for the selected plan
        const price = await stripe.prices.create({
            unit_amount: priceMap[plan], // Price in cents
            currency: "usd", // Currency
            product: productMap[plan], // Associated Product ID
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                },
            ],
            success_url: `http://localhost:3000/browse?subscription=${plan}`, // Redirect here on success
            cancel_url: "http://localhost:3000/profile?msg=error", // Redirect here on cancellation
        });

        return session.url;
    } catch (error) {
        console.error(error);
    }
};

export default createStripeCheckout;
