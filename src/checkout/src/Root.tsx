"use client";
import { ErrorBoundary } from "react-error-boundary";
import { IntlProvider } from "react-intl";
import {
	type Client,
	Provider as UrqlProvider,
	cacheExchange,
	createClient,
	dedupExchange,
	fetchExchange,
} from "urql";

import { ToastContainer } from "react-toastify";
import { SaleorAuthProvider, useAuthChange } from "@saleor/auth-sdk/react";
import { useMemo, useState } from "react";
import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { alertsContainerProps } from "./hooks/useAlerts/consts";
import { RootViews } from "./views/RootViews";
import { useLocale } from "./hooks/useLocale";
import { DEFAULT_LOCALE } from "./lib/regions";
import { PageNotFound } from "@/checkout/src/views/PageNotFound";
import "./index.css";

export const Root = ({ saleorApiUrl }: { saleorApiUrl: string }) => {
	const saleorAuthClient = useMemo(() => createSaleorAuthClient({ saleorApiUrl }), [saleorApiUrl]);

	const makeUrqlClient = () =>
		createClient({
			url: saleorApiUrl,
			suspense: true,
			requestPolicy: "cache-first",
			fetch: saleorAuthClient.fetchWithAuth,
			exchanges: [dedupExchange, cacheExchange, fetchExchange],
		});

	const { locale, messages } = useLocale();

	const [urqlClient, setUrqlClient] = useState<Client>(makeUrqlClient());
	useAuthChange({
		saleorApiUrl,
		onSignedOut: () => setUrqlClient(makeUrqlClient()),
		onSignedIn: () => setUrqlClient(makeUrqlClient()),
	});

	if (!saleorApiUrl) {
		console.warn(`Missing "saleorApiUrl" query param!`);
		return null;
	}

	if (!urqlClient) {
		console.warn(`Couldn't create URQL client!`);
		return null;
	}

	return (
		<IntlProvider defaultLocale={DEFAULT_LOCALE} locale={locale} messages={messages}>
			<SaleorAuthProvider client={saleorAuthClient}>
				<UrqlProvider value={urqlClient}>
					<div className="app">
						<div
							className="fixed left-0 top-0 -z-10 hidden h-full w-1/2 bg-white lg:block"
							aria-hidden="true"
						/>
						<div
							className="fixed right-0 top-0 -z-10 hidden h-full w-1/2 bg-slate-100 lg:block"
							aria-hidden="true"
						/>

						<ToastContainer {...alertsContainerProps} />
						<ErrorBoundary FallbackComponent={PageNotFound}>
							<RootViews />
						</ErrorBoundary>
					</div>
				</UrqlProvider>
			</SaleorAuthProvider>
		</IntlProvider>
	);
};
