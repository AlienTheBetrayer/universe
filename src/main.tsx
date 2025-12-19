import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import { AnalyticsProvider } from "@alienthebetrayer/analytics-sdk-react";
import { router } from "./router";
import { StoreWatcher } from "./zustand/StoreWatcher";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AnalyticsProvider config={{ endpoint: "universe" }}>
			<StoreWatcher />
			<RouterProvider router={router} />
		</AnalyticsProvider>
	</StrictMode>,
);
