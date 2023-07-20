import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import Navbar from "@/components/Navbar";
import ProductDetails from "@/components/ProductDetails";
import RelatedProducts from "@/components/RelatedProducts";
import { Product } from "@/lib/hooks/getProducts";
import { sanityClient, urlFor } from "@/lib/sanity.client";
import { meta } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const data = meta;
	const product = await fetchProduct(params.slug);
	if (!product) {
		return data;
	}
	meta.title = `${product.name} | ${meta.title}`;
	meta.openGraph.title = `${product.name} | ${meta.openGraph.title}`;
	meta.description = product.details;
	meta.openGraph.description = product.details;
	meta.openGraph.images = product.images[0];
	return data;
}

export async function fetchProduct(slug: string): Promise<Product | null> {
	const query = '*[_type == "product" && slug.current == $slug][0]';
	const product = await sanityClient.fetch<Product | null>(query, { slug });
	if (!product) {
		return null;
	}
	product.images = product.images.map((image) => urlFor(image).url());
	return product;
}

export async function fetchCategoryProducts(category: string): Promise<Product[]> {
	const query = '*[_type == "product" && category == $category]';
	const products = await sanityClient.fetch<Product[]>(query, { category });
	products.forEach((product) => {
		product.images = product.images.map((image) => urlFor(image).url());
	});
	return products;
}

export default async function Page({ params }: { params: { slug: string } }): Promise<React.JSX.Element> {
	const product = await fetchProduct(params.slug);
	if (!product) {
		return notFound();
	}
	const relatedProducts = await fetchCategoryProducts(product.category);
	return (
		<div className="relative z-0 overflow-x-hidden">
			<section className="wave-section bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600">
				<Navbar />
				<ProductDetails product={product} />
				<div className="air air1"></div>
				<div className="air air2"></div>
				<div className="air air3"></div>
				<div className="air air4"></div>
			</section>
			<RelatedProducts products={relatedProducts.filter((p) => p._id !== product._id)} />
		</div>
	);
}
