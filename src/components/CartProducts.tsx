"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";

import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRecoilState } from "recoil";

import { cartAtom, CartProduct as Product } from "./atoms/cartAtom";

export default function CartProducts(): React.JSX.Element {
	const [cart, setCart] = useRecoilState(cartAtom);
	const removeProduct = (product: Product): void => {
		setCart((oldCart) => oldCart.filter((p) => p._id !== product._id));
		localStorage.setItem("cart", JSON.stringify(cart.filter((p) => p._id !== product._id)));
		toast.success("Product removed from cart", {
			position: "bottom-right",
			autoClose: 2000,
		});
	};
	const handlePlusMinus = (product: Product, add = true): void => {
		if (add) {
			setCart((oldCart) =>
				oldCart.map((p) => {
					if (p._id === product._id) {
						return {
							...p,
							quantity: p.quantity + 1,
						};
					}
					return p;
				})
			);
		} else {
			if (product.quantity === 1) {
				setCart((oldCart) => oldCart.filter((p) => p._id !== product._id));
				return;
			}
			setCart((oldCart) =>
				oldCart.map((p) => {
					if (p._id === product._id) {
						return {
							...p,
							quantity: p.quantity - 1,
						};
					}
					return p;
				})
			);
		}
	};
	return (
		<div className="rounded-lg bg-gray-100 p-6 pb-6 shadow-lg lg:p-6">
			<div className="flex w-full items-center justify-center border-b pb-8">
				<h1 className="text-center text-2xl font-semibold">Shopping Cart</h1>
			</div>
			<div className="mb-5 mt-10 flex md:px-6">
				<h3 className="w-3/5 text-xs font-semibold uppercase text-gray-600 sm:w-2/5">Product Details</h3>
				<h3 className="w-2/5 text-center text-xs font-semibold uppercase text-gray-600 xs:w-1/5">Quantity</h3>
				<h3 className="hidden w-1/5 text-center text-xs font-semibold uppercase text-gray-600 sm:block">
					Price
				</h3>
				<h3 className="hidden w-1/5 text-center text-xs font-semibold uppercase text-gray-600 xs:block">
					Total
				</h3>
			</div>
			{cart.map((product) => (
				<div key={product._id} className="transition-all duration-300 ease-linear hover:bg-gray-200">
					<div className="flex items-center py-5 md:px-6">
						<div className="flex w-3/5 sm:w-2/5">
							<div className="hidden h-14 w-14 xs:block">
								<Image
									src={product.images[0]}
									alt={product.name}
									width={80}
									height={80}
									className="h-full w-full rounded-full object-cover"
								/>
							</div>
							<div className="ml-4 flex flex-grow flex-col justify-between">
								<span className="text-sm font-bold">{product.name}</span>
								<span className="text-xs text-gray-500">{product.category}</span>
								<TrashIcon
									className="h-4 w-4 cursor-pointer text-gray-500 hover:text-red-500"
									onClick={(): void => removeProduct(product)}
								/>
							</div>
						</div>
						<div className="flex w-2/5 items-center justify-center xs:w-1/5">
							<MinusIcon
								className="h-3 w-3 cursor-pointer text-gray-500 hover:text-red-500"
								onClick={(): void => handlePlusMinus(product, false)}
							/>
							<p className="m-2 w-8 border p-2 text-center text-xs">{product.quantity}</p>
							<PlusIcon
								className="h-3 w-3 cursor-pointer text-gray-500 hover:text-red-500"
								onClick={(): void => handlePlusMinus(product)}
							/>
						</div>
						<span className="hidden w-1/5 text-center text-sm font-semibold sm:block">
							₹{product.price.toLocaleString("en-IN")}
						</span>
						<span className="hidden w-1/5 text-center text-sm font-semibold xs:block">
							₹{(product.price * product.quantity).toLocaleString("en-IN")}
						</span>
					</div>
				</div>
			))}
			<ToastContainer />
		</div>
	);
}
