"use client";

import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useRecoilState } from "recoil";

import { cartAtom } from "./atoms/cartAtom";

export default function CartWidget(): React.JSX.Element {
	const cart = useRecoilState(cartAtom)[0];
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
				<button className="w-full rounded-md bg-indigo-500 py-3 text-sm font-semibold uppercase text-white transition-all duration-300 ease-in-out hover:bg-indigo-600">
					Checkout
				</button>
			</div>
		</div>
	);
}
