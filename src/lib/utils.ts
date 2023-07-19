import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export const meta = {
	title: "Glam",
	description: "A new generation ecommerce cosmetics store!",
	keywords: ["glam", "cosmetics", "makeup", "beauty", "skincare"],
	authors: [{ name: "FallenDeity" }],
	robots: {
		follow: true,
		index: false,
		nocache: true,
	},
	openGraph: {
		title: "Glam",
		description: "A new generation ecommerce cosmetics store!",
		images: "/logo.png",
		type: "website",
	},
	themeColor: "#e422f2",
};
