import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px -5px hsl(16 90% 58% / 0.3)" },
          "50%": { boxShadow: "0 0 30px -5px hsl(16 90% 58% / 0.5)" },
        },
        "egg-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "egg-sleep": {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        "egg-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
        },
        "egg-jump": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-8px) scale(1.05)" },
        },
        "egg-wave-left": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-20deg)" },
        },
        "egg-wave-right": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(20deg)" },
        },
        "egg-tear": {
          "0%": { transform: "translateY(0)", opacity: "0.6" },
          "100%": { transform: "translateY(8px)", opacity: "0" },
        },
        "egg-zzz": {
          "0%": { transform: "translateY(0) scale(0.8)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(-10px) scale(1.2)", opacity: "0" },
        },
        "egg-sparkle": {
          "0%, 100%": { transform: "scale(0.8)", opacity: "0.5" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
        },
        // Ovo Reactive animations
        "ovo-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "ovo-bounce": {
          "0%, 100%": { transform: "translateY(0) scaleY(1)" },
          "30%": { transform: "translateY(-6px) scaleY(1.08) scaleX(0.94)" },
          "60%": { transform: "translateY(0) scaleY(0.94) scaleX(1.06)" },
        },
        "ovo-droop": {
          "0%, 100%": { transform: "translateY(0) scaleY(1)" },
          "50%": { transform: "translateY(3px) scaleY(0.95)" },
        },
        "ovo-vibrate": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-2px) rotate(-1deg)" },
          "40%": { transform: "translateX(2px) rotate(1deg)" },
          "60%": { transform: "translateX(-1px)" },
          "80%": { transform: "translateX(1px)" },
        },
        "ovo-spin": {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.05)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        "ovo-roll": {
          "0%, 100%": { transform: "rotate(0deg) scaleY(1)" },
          "25%": { transform: "rotate(-8deg) scaleY(0.92) scaleX(1.08)" },
          "50%": { transform: "rotate(0deg) scaleY(1.08) scaleX(0.92)" },
          "75%": { transform: "rotate(8deg) scaleY(0.92) scaleX(1.08)" },
        },
        "ovo-shake-disapprove": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
        "ovo-sparkle-up": {
          "0%": { transform: "translateY(0) scale(0.5)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(-12px) scale(1.2)", opacity: "0" },
        },
        "ovo-heart-float": {
          "0%": { transform: "translateY(0) scale(0.6)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(-16px) scale(1)", opacity: "0" },
        },
        "ovo-smoke": {
          "0%": { transform: "translateY(0) scale(0.8)", opacity: "0" },
          "50%": { opacity: "0.8" },
          "100%": { transform: "translateY(-8px) scale(1.3)", opacity: "0" },
        },
        "ovo-tear-drop": {
          "0%": { transform: "translateY(0)", opacity: "0.6" },
          "100%": { transform: "translateY(6px)", opacity: "0" },
        },
        "ovo-cap-shake": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "30%": { transform: "rotate(-6deg)" },
          "70%": { transform: "rotate(6deg)" },
        },
        "ovo-eye-sparkle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.2)" },
        },
        "ovo-idle-particle": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.2" },
          "50%": { transform: "translateY(-6px)", opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "egg-bounce": "egg-bounce 2s ease-in-out infinite",
        "egg-sleep": "egg-sleep 3s ease-in-out infinite",
        "egg-shake": "egg-shake 0.5s ease-in-out infinite",
        "egg-jump": "egg-jump 0.8s ease-in-out infinite",
        "egg-wave-left": "egg-wave-left 1s ease-in-out infinite",
        "egg-wave-right": "egg-wave-right 1s ease-in-out infinite 0.5s",
        "egg-tear": "egg-tear 1s ease-in-out infinite",
        "egg-zzz": "egg-zzz 2s ease-in-out infinite",
        "egg-sparkle": "egg-sparkle 1.5s ease-in-out infinite",
        // Ovo Reactive
        "ovo-float": "ovo-float 3s ease-in-out infinite",
        "ovo-bounce": "ovo-bounce 0.6s ease-in-out",
        "ovo-droop": "ovo-droop 2s ease-in-out infinite",
        "ovo-vibrate": "ovo-vibrate 0.4s ease-in-out 3",
        "ovo-spin": "ovo-spin 0.8s ease-in-out",
        "ovo-roll": "ovo-roll 0.7s ease-in-out 2",
        "ovo-shake-disapprove": "ovo-shake-disapprove 0.5s ease-in-out 3",
        "ovo-sparkle-up": "ovo-sparkle-up 1.2s ease-out infinite",
        "ovo-heart-float": "ovo-heart-float 1.8s ease-out infinite",
        "ovo-smoke": "ovo-smoke 1.5s ease-out infinite",
        "ovo-tear-drop": "ovo-tear-drop 1s ease-in-out infinite",
        "ovo-cap-shake": "ovo-cap-shake 0.4s ease-in-out 2",
        "ovo-eye-sparkle": "ovo-eye-sparkle 1s ease-in-out infinite",
        "ovo-idle-particle": "ovo-idle-particle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
