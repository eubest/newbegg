import React from "react";
import { Skeleton } from "@/checkout/src/components";

export const DeliveryMethodsSkeleton = () => {
	return (
		<div className="px-4 pb-6 pt-5">
			<Skeleton variant="title" className="w-1/3" />
			<div className="rounded border border-slate-200 px-6 pb-4 pt-6">
				<Skeleton className="w-2/3" />
				<Skeleton className="w-1/3" />
			</div>
			<Skeleton className="mt-6 w-3/4" />
		</div>
	);
};
