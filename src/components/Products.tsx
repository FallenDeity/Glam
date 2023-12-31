"use client";

import { motion } from "framer-motion";
import React from "react";

import ProductCard from "@/components/Product";
import useProducts, { Product } from "@/lib/hooks/getProducts";
import { fadeIn, textVariant } from "@/lib/motion";

export default function Products(): React.JSX.Element {
	const products = useProducts();
	const [bestSellingProducts, setBestSellingProducts] = React.useState<Product[]>([]);
	React.useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (products) {
			setBestSellingProducts(products);
		}
	}, [products]);
	return (
		<>
			<motion.div variants={textVariant()} initial="hidden" whileInView="show" viewport={{ once: true }}>
				<h1 className="mb-4 mt-20 text-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
					<span className="bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
						Best Selling Products
					</span>
				</h1>
			</motion.div>
			<div
				className="mx-auto mt-20 grid w-fit grid-cols-1 justify-center justify-items-center gap-x-14 gap-y-20 pb-10 md:grid-cols-2 lg:grid-cols-3"
				id="products">
				{bestSellingProducts.map((product, index) => (
					<motion.div
						key={product._id}
						variants={fadeIn("up", "spring", index * 0.15, 0.75)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}>
						<ProductCard product={product} />
					</motion.div>
				))}
			</div>
		</>
	);
}
