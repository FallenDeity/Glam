import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

import Navbar from "@/components/Navbar";
import SuccessCard from "@/components/SuccessCard";
import { meta } from "@/lib/utils";

interface Props {
	params: Record<string, string>;
	searchParams: {
		session_id?: string;
	};
}

export function generateMetadata(): Metadata {
	meta.title = "Success";
	meta.openGraph.title = "Success";
	return meta;
}

export default function Page(props: Props): React.JSX.Element {
	if (!props.searchParams.session_id) {
		return redirect("/");
	}
	return (
		<div className="relative z-0 overflow-x-hidden">
			<section className="wave-section bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-900 to-gray-900">
				<Navbar />
				<SuccessCard session_id={props.searchParams.session_id} />
			</section>
		</div>
	);
}
