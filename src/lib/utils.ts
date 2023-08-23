import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export const meta = {
	title: "Verstyl",
	metadataBase: new URL(String(process.env.NEXT_PUBLIC_BASE_URL)),
	description: "A new generation e-commerce cosmetics store!",
	keywords: ["Verstyl", "clothes", "luxury", "beauty", "cultural"],
	authors: [{ name: "FallenDeity" }],
	robots: {
		follow: true,
		index: false,
		nocache: true,
	},
	openGraph: {
		title: "Verstyl",
		description: "A new generation e-commerce cloth-line store!",
		images: "/logo.png",
		type: "website",
	},
	themeColor: "#e422f2",
};
