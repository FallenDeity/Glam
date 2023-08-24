import Image from "next/image";
import React from "react";

export default function HeroBanner(): React.JSX.Element {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center text-right text-white">
			<div className="flex flex-col items-center justify-center space-y-2 text-center">
				<Image src="/verstyl.png" width={200} height={200} alt="Logo" />
				<p className="mt-5 text-6xl font-bold">Verstyl</p>
				<p className="mt-3 text-2xl font-extralight">The best place to buy clothes</p>
			</div>
		</div>
	);
}
