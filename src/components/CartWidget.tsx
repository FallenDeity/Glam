"use client";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { useRecoilState } from "recoil";

import { StripeClient } from "@/lib/stripe.client";

import { cartAtom, CartProduct } from "./atoms/cartAtom";

function convertCart(cart: CartProduct[]): { id: string; quantity: number }[] {
	return cart.map((product) => ({ id: product._id, quantity: product.quantity }));
}

export default function CartWidget(): React.JSX.Element {
	const [loading, setLoading] = React.useState<boolean>(false);
	const cart = useRecoilState(cartAtom)[0];
	const handleCheckout = async (): Promise<void> => {
		setLoading(true);
		const client = new StripeClient();
		const stripe = await client.getStripe();
		const response = await fetch("/api/stripe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ cart: convertCart(cart) }),
		});
		if (response.status !== 200) {
			const message = (await response.json()) as { message: string };
			toast.error(message.message, {
				position: "bottom-right",
				autoClose: 2000,
			});
			setLoading(false);
			return;
		} else {
			const session = (await response.json()) as { id: string };
			toast.loading("Redirecting to checkout", {
				position: "bottom-right",
				autoClose: 2000,
			});
			localStorage.setItem("session_id", session.id);
			void stripe.redirectToCheckout({ sessionId: session.id });
		}
		setLoading(false);
	};
	return (
		<div className="mb-8 flex flex-col rounded-lg bg-white p-8 shadow-lg">
			<h1 className="border-b pb-8 text-center text-2xl font-semibold text-neutral-800">Order Summary</h1>
			<div className="flex h-64 flex-col overflow-y-auto scrollbar-hide">
				{cart.length ? (
					cart.map((product) => (
						<div key={product._id} className="mt-6 flex justify-between">
							<div className="flex flex-row">
								<div>
									<h3 className="w-[10rem] truncate text-[13px] font-semibold text-neutral-700 md:w-[11rem]">
										{product.name}
									</h3>
								</div>
							</div>
							<span className="text-sm font-semibold text-neutral-900">
								₹{(product.price * product.quantity).toLocaleString("en-IN")}
							</span>
						</div>
					))
				) : (
					<div className="flex flex-col items-center justify-center">
						<AiOutlineShoppingCart className="mt-10 text-6xl text-neutral-500" />
						<h1 className="text-2xl font-semibold text-neutral-700">Your cart is empty</h1>
					</div>
				)}
			</div>
			<div className="border-t">
				<div className="flex justify-between py-6 text-sm font-semibold uppercase">
					<span>Total cost</span>
					<span>
						₹{Math.round(cart.reduce((a, b) => a + b.price * b.quantity, 0)).toLocaleString("en-IN")}
					</span>
				</div>
				<button
					disabled={loading}
					className="inline-flex w-full items-center justify-center rounded-md bg-indigo-500 py-3 text-sm font-semibold uppercase text-white transition-all duration-300 ease-in-out hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-blue-400"
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={handleCheckout}>
					{loading ? <BeatLoader color="#fff" size={10} /> : "Checkout"}
				</button>
			</div>
			<ToastContainer />
		</div>
	);
}
