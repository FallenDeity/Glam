import { Metadata } from "next";
import React from "react";

import ContactForm from "@/components/Contact";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import { meta } from "@/lib/utils";

export const metadata: Metadata = meta;

export default function Home(): React.JSX.Element {
	return (
		<div className="relative z-0">
			<section className="wave-section bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
				<Navbar />
				<HeroBanner />
				<div className="air air1"></div>
				<div className="air air2"></div>
				<div className="air air3"></div>
				<div className="air air4"></div>
			</section>
			<Products />
			<ContactForm />
			<Footer />
		</div>
	);
}
