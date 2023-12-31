"use client";

import dynamic from "next/dynamic";

const Root = dynamic(() => import("@/checkout/src/Root").then((m) => m.Root), { ssr: false });

export const RootWrapper = ({ saleorApiUrl }: { saleorApiUrl: string }) => {
	return <Root saleorApiUrl={saleorApiUrl} />;
};
