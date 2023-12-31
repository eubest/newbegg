import React from "react";
import { Skeleton } from "@/checkout/src/components";

interface PaymentSectionSkeletonProps {}

export const PaymentSectionSkeleton: React.FC<PaymentSectionSkeletonProps> = ({}) => {
	return (
		<div className="px-4 pb-6 pt-5">
			<Skeleton variant="title" />
			<div className="mt-4 flex flex-row items-center rounded border border-slate-200 px-6 pb-4 pt-6">
				<Skeleton className="mr-4 w-1/5" />
				<Skeleton className="mr-4 w-1/5" />
				<Skeleton className="w-1/5" />
			</div>
		</div>
	);
};
