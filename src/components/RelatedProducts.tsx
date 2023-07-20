"use client";

import { motion } from "framer-motion";
import React from "react";

import { Product } from "@/lib/hooks/getProducts";
import { fadeIn, textVariant } from "@/lib/motion";

import ProductCard from "./Product";

export default function RelatedProducts({ products }: { products: Product[] }): React.JSX.Element {
	if (products.length === 0) {
		return <></>;
	}
	return (
		<div className="mb-10 px-16 text-center sm:px-8">
			<motion.div variants={textVariant(undefined)} initial="hidden" whileInView="show" viewport={{ once: true }}>
				<p className="mt-5 text-[14px] uppercase tracking-wider text-neutral-400 sm:text-[18px]">
					Similar Products
				</p>
				<h2 className="xs:text-[40px] text-[30px] font-black uppercase text-neutral-800 sm:text-[50px] md:text-[60px]">
					Related Products
				</h2>
			</motion.div>
			<div className="my-10 flex flex-wrap items-center justify-center gap-10">
				{products.map((product, index) => (
					<motion.div
						key={product._id}
						variants={fadeIn("right", "spring", index * 0.5, 0.75)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}>
						<ProductCard product={product} />
					</motion.div>
				))}
			</div>
		</div>
	);
}
