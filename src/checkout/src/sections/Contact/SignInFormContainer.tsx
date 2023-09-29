import React, { type PropsWithChildren } from "react";
import { Button } from "@/checkout/src/components/Button";
import { Title } from "@/checkout/src/components/Title";
import { useFormattedMessages } from "@/checkout/src/hooks/useFormattedMessages";
import { contactLabels } from "@/checkout/src/sections/Contact/messages";

export interface SignInFormContainerProps {
	title: string;
	redirectSubtitle?: string;
	redirectButtonLabel?: string;
	subtitle?: string;
	onSectionChange: () => void;
}

export const SignInFormContainer: React.FC<PropsWithChildren<SignInFormContainerProps>> = ({
	title,
	redirectButtonLabel,
	redirectSubtitle,
	subtitle,
	onSectionChange,
	children,
}) => {
	const formatMessage = useFormattedMessages();

	return (
		<div className="p-4">
			<div className="mb-2 flex flex-col">
				<div className="flex flex-row items-baseline justify-between">
					<Title>{title}</Title>
					<div className="flex flex-row">
						{redirectSubtitle && (
							<p color="secondary" className="mr-2">
								{redirectSubtitle}
							</p>
						)}
						{redirectButtonLabel && (
							<Button
								ariaLabel={formatMessage(contactLabels.changeSection)}
								onClick={onSectionChange}
								variant="tertiary"
								label={redirectButtonLabel}
							/>
						)}
					</div>
				</div>
				{subtitle && (
					<p color="secondary" className="mt-3">
						{subtitle}
					</p>
				)}
			</div>
			{children}
		</div>
	);
};
