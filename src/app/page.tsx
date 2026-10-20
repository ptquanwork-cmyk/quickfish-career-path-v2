import { Suspense } from "react";
import CareerDashboard from "@/features/career-dashboard/CareerDashboard";
import LocaleToggle from "./LocaleToggle";

/**
 * Demo shell. In the real app the page is src/app/[locale]/career-path/page.tsx:
 *     return <div className="qf-career-host"><CareerDashboard /></div>;
 * inside the app's SidebarShell layout.
 */
export default function Page() {
    return (
        <Suspense>
            <div className="qf-career-host">
                <CareerDashboard />
            </div>
            <LocaleToggle />
        </Suspense>
    );
}
