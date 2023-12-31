import React, { type PropsWithChildren } from "react";
import { useSummaryLineLineAttributesText, getSummaryLineProps } from "./utils";
import { summaryLabels } from "./messages";
import { type CheckoutLineFragment, type OrderLineFragment } from "@/checkout/src/graphql";
import { PhotoIcon } from "@/checkout/ui-kit/icons";
import { useFormattedMessages } from "@/checkout/src/hooks/useFormattedMessages";

export type SummaryLine = CheckoutLineFragment | OrderLineFragment;

interface LineItemProps {
	line: SummaryLine;
}

export const SummaryItem: React.FC<PropsWithChildren<LineItemProps>> = ({ line, children }) => {
	const { productName, productImage } = getSummaryLineProps(line);

	const formatMessage = useFormattedMessages();

	const attributesText = useSummaryLineLineAttributesText(line);

	return (
		<li className="relative mb-6 flex flex-row items-start last-of-type:mb-0">
			<div className="relative flex flex-row">
				<div className="z-1 mr-4 flex h-20 w-20 items-center justify-center">
					{productImage ? (
						<img className="object-contain" alt={productImage?.alt || undefined} src={productImage?.url} />
					) : (
						<PhotoIcon />
					)}
				</div>
			</div>
			<div className="flex w-full flex-row items-start items-center justify-between">
				<div className="flex flex-col">
					<p aria-label={formatMessage(summaryLabels.summaryItemName)} className="mb-3 font-bold">
						{productName}
					</p>
					<p aria-label={formatMessage(summaryLabels.variantName)} className="text-xs">
						{attributesText}
					</p>
				</div>
				{children}
			</div>
		</li>
	);
};
