"use client";

import React from "react";

import { sanityClient, urlFor } from "../sanity.client";

export interface Product {
	_id: string;
	images: string[];
	category: string;
	name: string;
	slug: { current: string };
	price: number;
	details: string;
	_createdAt: string;
}

export default function useProducts(): Product[] {
	const [products, setProducts] = React.useState<Product[]>([]);
	React.useEffect(() => {
		async function fetchProducts(): Promise<void> {
			const query = '*[_type == "product"] | order(_createdAt desc)';
			const _products = await sanityClient.fetch<Product[]>(query);
			_products.forEach((product) => {
				product.images = product.images.map((image) => urlFor(image).url());
			});
			setProducts(_products);
		}
		void fetchProducts();
		const subscription = sanityClient.listen("*[_type == 'product']").subscribe((record) => {
			if (record.transition === "appear") {
				try {
					const product = record.result as unknown as Product;
					product.images = product.images.map((image) => urlFor(image).url());
					setProducts((products) => [...products, product]);
				} catch (error) {
					console.log(error);
				}
			}
			if (record.transition === "disappear") {
				setProducts((products) => products.filter((t) => t._id !== record.documentId));
			}
		});
		return () => subscription.unsubscribe();
	}, []);
	return products;
}
