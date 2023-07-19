import Image from "next/image";
import React from "react";

export default function HeroBanner(): React.JSX.Element {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center text-right text-white">
			<div className="flex flex-col items-center justify-center space-y-2 text-center">
				<Image src="/logo.png" width={200} height={200} alt="Logo" />
				<p className="text-5xl font-bold">GLAM</p>
				<p className="text-2xl font-semibold">The best place to buy cosmetics</p>
			</div>
		</div>
	);
}
