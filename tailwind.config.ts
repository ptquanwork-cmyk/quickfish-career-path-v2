module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            keyframes: {
                "slide-in": {
                    "0%": {
                        transform: "translateY(20px)",
                    },
                    "100%": {
                        transform: "translateY(0)",
                    },
                },
                marqueeUp: {
                    from: { transform: "translateY(0)" },
                    to: { transform: "translateY(-50%)" },
                },
                marqueeDown: {
                    from: { transform: "translateY(-50%)" },
                    to: { transform: "translateY(0)" },
                },
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-collapsible-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-collapsible-content-height)" },
                    to: { height: "0" },
                },
                // The design's `qfFloat` — the coach list empty-state disc.
                coachFloat: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-6px)" },
                },
            },
            scrollbar: {
                none: {
                    "&::-webkit-scrollbar": { display: "none" },
                    "&": { scrollbarWidth: "none", msOverflowStyle: "none" },
                },
            },
            animation: {
                "slide-in": "slide-in 0.5s ease-in-out",
                "marquee-up": "marqueeUp 22s linear infinite",
                "marquee-down": "marqueeDown 22s linear infinite",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "coach-float": "coachFloat 3s ease-in-out infinite",
            },
            fontFamily: {
                sans: ["Be Vietnam Pro", "sans-serif"],
            },
            fontSize: {
                root: "1rem",
                "body-1": ["18px", "28px"],
                "body-2": ["16px", "24px"],
                "body-3": ["14px", "20px"],
                "body-4": ["12px", "16px"],
                h2: ["48px", { lineHeight: "58px", letterSpacing: "-0.4px" }],
                h4: ["32px", { lineHeight: "38px", letterSpacing: "-0.2px" }],
                "title-1": [
                    "72px",
                    { lineHeight: "88px", letterSpacing: "-0.8px" },
                ],
            },
            fontWeight: {
                thin: "100",
                light: "400",
                regular: "500",
                medium: "600",
                bold: "700",
                black: "900",
            },
            lineHeight: {
                root: "1.5rem",
            },
            colors: {
                text: {
                    primary: "var(--text-primary)",
                    secondary: "var(--text-secondary)",
                    white: "var(--text-white)",
                },
                bg: {
                    base: "var(--bg-base)",
                    accent: "var(--bg-accent)",
                    brand: "var(--bg-brand)",
                },
                border: {
                    DEFAULT: "var(--border)",
                    base: "var(--border-base)",
                    brand: "var(--border-brand)",
                },
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                success: "#76CA66",
                error: "#BA0000",
                danger: "#FF6347",
                warning: "#FBC756",
                info: "#116ACC",
                background: "var(--background)",
                page: "var(--page)",
                foreground: "var(--foreground)",
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                "surface-subtle": "var(--surface-subtle)",
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
                input: "var(--input)",
                ring: "var(--ring)",
                chart: {
                    "1": "var(--chart-1)",
                    "2": "var(--chart-2)",
                    "3": "var(--chart-3)",
                    "4": "var(--chart-4)",
                    "5": "var(--chart-5)",
                },
            },
            minHeight: {
                "6/10": "60%",
                "9/10": "90%",
            },
            maxWidth: {
                container: "1280px",
                content: "768px",
            },
            height: {
                "6/10": "60%",
                "9/10": "90%",
            },
            width: {
                "4/10": "40%",
                "6/10": "60%",
                "7/10": "70%",
                "9/10": "90%",
            },
            spacing: {
                "token-sm": "8px",
                "token-base": "12px",
                "token-lg": "16px",
                "token-2xl": "24px",
                "token-3xl": "32px",
                "token-5xl": "48px",
                "container-pad": "80px",
            },
            container: {
                center: "true",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("tailwindcss-react-aria-components"),
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("tailwindcss-animate"),
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@tailwindcss/typography"),
    ],
};
