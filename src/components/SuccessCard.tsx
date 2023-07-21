"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";

import { runFireworks } from "@/lib/confetti";

export default function SuccessCard({ session_id }: { session_id: string }): React.JSX.Element {
	if (localStorage.getItem("session_id") !== session_id) {
		return redirect("/");
	}
	React.useEffect(() => {
		localStorage.removeItem("session_id");
		runFireworks();
	}, []);
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center">
			<div className="relative flex h-[50vh] w-[70vw] flex-col items-center justify-evenly space-y-2 rounded-lg bg-white p-3 text-center shadow-lg sm:w-[20rem]">
				<BsFillPatchCheckFill className="absolute top-0 -translate-y-2/3 transform rounded-full bg-white p-2 text-9xl text-green-500" />
				<p className="text-4xl font-semibold text-neutral-700">Success</p>
				<p className="text-xl text-neutral-700">Your order has been placed successfully</p>
				<Link
					href="/"
					className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:bg-blue-400">
					Go to Home
				</Link>
			</div>
		</div>
	);
}
