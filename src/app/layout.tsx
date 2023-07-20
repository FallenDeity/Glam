"use client";

import "@/styles/globals.css";

import React from "react";
import { RecoilRoot } from "recoil";

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<html lang="en">
			<body>
				<RecoilRoot>{children}</RecoilRoot>
			</body>
		</html>
	);
}
