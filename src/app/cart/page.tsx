import { Metadata } from "next";
import React from "react";

import CartProducts from "@/components/CartProducts";
import CartWidget from "@/components/CartWidget";
import Navbar from "@/components/Navbar";
import { meta } from "@/lib/utils";

export function generateMetadata(): Metadata {
	meta.title = "Cart";
	meta.openGraph.title = "Cart";
	return meta;
}

export default function Cart(): React.JSX.Element {
	return (
		<div className="flex min-h-screen flex-col bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
			<div className="relative z-0">
				<Navbar />
				<div className="container mx-auto my-32 px-4 sm:px-10">
					<div className="grid grid-cols-1 sm:gap-12 lg:grid-cols-12">
						<div className="col-span-1 lg:col-span-8">
							<CartProducts />
						</div>
						<div className="col-span-1 lg:col-span-4">
							<div className="relative top-32 lg:sticky">
								<CartWidget />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
