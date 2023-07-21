import { NextResponse } from "next/server";
import Stripe from "stripe";

import { Product } from "@/lib/hooks/getProducts";
import { sanityClient, urlFor } from "@/lib/sanity.client";

export const stripe = new Stripe(String(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY), {
	apiVersion: "2022-11-15",
});

enum METHODS {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

enum SHIPPING_RATES {
	FREE = "shr_1NWAiXSFaWYw1HW0Xj5pbMQM",
	FAST = "shr_1NWAjvSFaWYw1HW0WW0D4ED1",
}

interface StripeBody extends ReadableStream<Uint8Array> {
	cart: {
		id: string;
		quantity: number;
	}[];
}

interface StripeError extends Error {
	message: string;
	statusCode: number;
}

async function fetchProduct(productId: string): Promise<Product | null> {
	const query = '*[_type == "product" && _id == $productId][0]';
	const product = await sanityClient.fetch<Product | null>(query, { productId });
	if (!product) {
		return null;
	}
	product.images = product.images.map((image) => urlFor(image).url());
	return product;
}

async function handler(req: Request): Promise<NextResponse> {
	if (req.method === METHODS.POST.toString()) {
		try {
			const res = (await req.json()) as StripeBody;
			if (!res.cart.length) {
				return new NextResponse(JSON.stringify({ statusCode: 400, message: "Cart is empty" }), {
					status: 400,
				});
			}
			const line_items = [];
			for (const item of res.cart) {
				const product = await fetchProduct(item.id);
				if (!product) {
					return new NextResponse(
						JSON.stringify({ statusCode: 404, message: `Product ${item.id} not found` }),
						{ status: 404 }
					);
				}
				line_items.push({
					price_data: {
						currency: "inr",
						product_data: {
							name: product.name,
							images: product.images,
						},
						unit_amount: product.price * 100,
					},
					adjustable_quantity: {
						enabled: true,
						minimum: 1,
					},
					quantity: item.quantity,
				});
			}
			const session = await stripe.checkout.sessions.create({
				submit_type: "pay",
				mode: "payment",
				payment_method_types: ["card"],
				billing_address_collection: "auto",
				shipping_options: [
					{
						shipping_rate: SHIPPING_RATES.FREE,
					},
					{
						shipping_rate: SHIPPING_RATES.FAST,
					},
				],
				line_items,
				success_url: `${String(process.env.NEXT_PUBLIC_BASE_URL)}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${String(process.env.NEXT_PUBLIC_BASE_URL)}/cart`,
			});
			return new NextResponse(JSON.stringify({ id: session.id }), { status: 200 });
		} catch (error) {
			return new NextResponse(JSON.stringify({ statusCode: 500, message: (error as StripeError).message }), {
				status: 500,
			});
		}
	}
	return new NextResponse(JSON.stringify({ statusCode: 405, message: "Method not allowed" }), {
		status: 405,
	});
}

export { handler as POST };
