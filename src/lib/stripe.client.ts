import { loadStripe, Stripe } from "@stripe/stripe-js";

export class StripeClient {
	private stripePromise: Promise<Stripe | null> | null = null;

	public async getStripe(): Promise<Stripe> {
		if (this.stripePromise === null) {
			this.stripePromise = loadStripe(String(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
		}
		return this.stripePromise as Promise<Stripe>;
	}
}
