"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlinePhone, AiOutlineShoppingCart } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { useRecoilState } from "recoil";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cartAtom } from "./atoms/cartAtom";

export default function Navbar(): React.JSX.Element {
	const cart = useRecoilState(cartAtom)[0];
	const router = useRouter();
	const navLinks = [
		{
			title: "Products",
			id: "/#products",
			icon: BsInfoCircle,
		},
		{
			title: "Contact",
			id: "/#contact",
			icon: AiOutlinePhone,
		},
		{
			title: "Cart",
			id: "/cart",
			icon: AiOutlineShoppingCart,
		},
	];
	const [active, setActive] = React.useState<string>("");
	const navBarRef = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		const handleScroll = (): void => {
			if (navBarRef.current) {
				if (window.scrollY > 0) {
					navBarRef.current.classList.remove("bg-inherit", "text-white");
					navBarRef.current.classList.add("backdrop-blur-sm", "bg-white", "shadow-lg", "text-black");
				} else {
					navBarRef.current.classList.remove("backdrop-blur-sm", "bg-white", "shadow-lg", "text-black");
					navBarRef.current.classList.add("bg-inherit", "text-white");
				}
			}
		};
		window.addEventListener("scroll", handleScroll);
		return (): void => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<nav
			className={`fixed top-0 z-[10000] flex w-full items-center bg-inherit px-10 py-5 text-white backdrop-filter transition-all duration-300 ease-in`}
			ref={navBarRef}>
			<div className="mx-auto flex w-full items-center justify-between">
				<div
					className="flex cursor-pointer items-center gap-3"
					onClick={(): void => {
						setActive("");
						router.push("/");
						window.scrollTo(0, 0);
					}}>
					<Image src={"/logo.png"} width={50} height={50} alt="Logo" className="h-8 w-8 object-contain" />
					<p className="flex items-center text-2xl font-bold">GLAM</p>
				</div>
				<ul className="hidden list-none flex-row items-center justify-center gap-10 md:flex">
					{navLinks.slice(0, 2).map((link) => (
						<li key={link.title}>
							<div>
								<p
									onClick={(): void => {
										setActive(link.title);
										router.push(link.id);
									}}
									className={`text-md cursor-pointer font-medium transition duration-300 ease-in-out`}>
									{link.title}
								</p>
							</div>
						</li>
					))}
					<li className="flex items-center justify-center">
						<button
							onClick={(): void => {
								setActive("Cart");
								router.push("/cart");
							}}
							className="relative flex items-center justify-center">
							<AiOutlineShoppingCart className="h-6 w-6" />
							<span className="absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform animate-pulse items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-red-100">
								{cart.length}
							</span>
						</button>
					</li>
				</ul>
				<div className="flex items-center md:hidden">
					<DropdownMenu>
						<DropdownMenuTrigger className="focus:outline-none">
							<HiMenu
								className="cursor-pointer text-3xl"
								onClick={(): void => setActive(active === "" ? "active" : "")}
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="mr-5 md:hidden">
							<DropdownMenuGroup>
								{navLinks.map((link) => (
									<DropdownMenuItem
										onClick={(): void => {
											setActive(link.title);
											router.push(link.id);
										}}
										key={link.title}
										className="items-center justify-between px-2 py-[0.2rem]">
										<div>
											<DropdownMenuLabel
												className={`text-md cursor-pointer font-medium transition duration-300 ease-in-out`}>
												{link.title}
											</DropdownMenuLabel>
										</div>
										<link.icon
											className={`text-md cursor-pointer transition duration-300 ease-in-out`}
										/>
									</DropdownMenuItem>
								))}
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	);
}
