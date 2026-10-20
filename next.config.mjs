/** @type {import('next').NextConfig} */
const nextConfig = {
    // The dashboard is copied verbatim from the product app; its auth/i18n
    // imports are stubbed here, so type-only mismatches must not block a build.
    typescript: { ignoreBuildErrors: true },
    eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
