import Image from "next/image";
import React from "react";

export default function Footer(): React.JSX.Element {
	return (
		<footer className="bg-white shadow dark:bg-gray-900">
			<div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<a href="/" className="mb-4 flex items-center sm:mb-0">
						<Image
							unoptimized
							width={10}
							height={10}
							src="/verstyl.png"
							className="mr-3 h-8 w-8"
							alt="Verstyl Logo"
						/>
						<span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
							Verstyl
						</span>
					</a>
					<ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
						<li>
							<a href="#" className="mr-4 hover:underline md:mr-6 ">
								About
							</a>
						</li>
						<li>
							<a href="#" className="mr-4 hover:underline md:mr-6">
								Privacy Policy
							</a>
						</li>
						<li>
							<a href="#" className="mr-4 hover:underline md:mr-6 ">
								Licensing
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Contact
							</a>
						</li>
					</ul>
				</div>
				<hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
				<span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
					© 2023{" "}
					<a href="https://flowbite.com/" className="hover:underline">
						Verstyl™
					</a>
					. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
}
