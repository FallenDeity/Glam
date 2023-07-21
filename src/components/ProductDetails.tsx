"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";

import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import { BsCartDash } from "react-icons/bs";
import { Carousel } from "react-responsive-carousel";
import { toast, ToastContainer } from "react-toastify";
import { useRecoilState } from "recoil";

import { Product } from "@/lib/hooks/getProducts";

import { cartAtom } from "./atoms/cartAtom";

export default function ProductDetails({ product }: { product: Product }): React.JSX.Element {
	const [count, setCount] = React.useState(1);
	const [cart, addProduct] = useRecoilState(cartAtom);
	const addItemsToCart = (): void => {
		if (cart.find((item) => item._id === product._id)) {
			console.log("Already in cart");
			addProduct((prev) =>
				prev.map((item) => {
					if (item._id === product._id) {
						return {
							...item,
							quantity: item.quantity + count,
						};
					}
					return item;
				})
			);
		} else {
			addProduct((prev) => [
				...prev,
				{
					...product,
					quantity: count,
				},
			]);
		}
		toast.success("Added to cart", {
			position: "bottom-right",
			autoClose: 2000,
		});
	};
	return (
		<div className="mx-auto flex h-screen max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
			<div className="-mx-4 mb-10 flex flex-col space-x-5 md:flex-row">
				<div className="px-4 md:flex-1">
					<div className="mb-4 flex h-64 w-full items-center justify-center rounded-lg md:h-80">
						<Carousel
							className="h-full w-full shadow-[0_35px_120px_-15px_#211e35]"
							showArrows={false}
							showStatus={false}
							infiniteLoop={true}
							autoPlay={true}
							showThumbs={false}
							interval={5000}
							emulateTouch={true}>
							{product.images.map((image, index) => (
								<Image
									key={`${product._id}-${index}`}
									alt="Product"
									unoptimized
									width={100}
									height={100}
									src={image}
									className="h-64 w-full rounded-lg object-cover md:h-80"
								/>
							))}
						</Carousel>
					</div>
				</div>
				<div className="m-auto h-full w-full px-4 md:flex-1">
					<h2 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-5xl">
						{product.name}
					</h2>
					<p className="text-sm text-gray-200">{product.category}</p>

					<div className="my-3 flex items-center space-x-4">
						<div>
							<div className="flex rounded-lg px-3 py-2">
								<span className="mr-1 mt-1 text-gray-400">₹</span>
								<span className="text-3xl font-bold text-white">{product.price}</span>
							</div>
						</div>
						<div className="flex-1">
							<p className="text-xl font-semibold text-green-400">In Stock</p>
							<p className="text-sm text-gray-400">Inclusive of all Taxes.</p>
						</div>
					</div>
					<p className="text-gray-300">{product.details}</p>
					<div className="flex space-x-4 py-4">
						<div className="relative rounded-md bg-white">
							<div className="absolute left-0 right-0 block pt-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
								Qty
							</div>
							<p className="flex h-14 appearance-none items-end rounded-xl border border-gray-200 pb-1 pl-4 pr-8">
								{count}
							</p>
							<div className="absolute inset-y-0 right-0 mt-5 flex flex-col items-center justify-center px-2">
								<ChevronUp
									className="h-3 w-3 cursor-pointer text-gray-400 hover:text-gray-500"
									onClick={(): void => setCount((prev) => prev + 1)}
								/>
								<ChevronDown
									className="h-3 w-3 cursor-pointer text-gray-400 hover:text-gray-500"
									onClick={(): void => setCount((prev) => Math.max(prev - 1, 1))}
								/>
							</div>
						</div>

						<button
							onClick={addItemsToCart}
							type="button"
							className="flex h-14 flex-row items-center justify-center rounded-xl bg-indigo-600 px-6 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-indigo-500">
							<BsCartDash className="mr-2 h-6 w-6 text-white" />
							Add to Cart
						</button>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}
