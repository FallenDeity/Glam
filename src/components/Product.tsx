"use client";

import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Product } from "@/lib/hooks/getProducts";

export default function ProductCard({ product }: { product: Product }): React.JSX.Element {
	const router = useRouter();
	return (
		<div className="w-72 rounded-xl bg-white shadow-md duration-500 hover:scale-105 hover:shadow-xl">
			<div onClick={(): void => router.push(`/product/${product.slug}`)}>
				<Image
					unoptimized
					width={100}
					height={100}
					src={product.images[0]}
					alt="Product"
					className="h-80 w-72 rounded-t-xl object-cover"
				/>
				<div className="w-72 space-y-3 px-4 py-3">
					<span className="mr-3 text-xs uppercase text-gray-400">{product.category}</span>
					<p className="block truncate text-lg font-bold capitalize text-black">{product.name}</p>
					<span className="block text-sm text-gray-500">{product.details}</span>
					<div className="flex items-center border-t border-gray-200">
						<p className="my-3 cursor-auto text-lg font-semibold text-black">₹{product.price}</p>
						<div className="ml-auto">
							<ShoppingCartIcon className="h-6 w-6 text-black" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
