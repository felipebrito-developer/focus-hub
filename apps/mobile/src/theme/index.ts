// ─── neuro_ui_principles.md compliant theme ─────────────────────────────────
// Primary palette: Dark Warm Minimalist (Organic Option A)
// Background:  #161513 (Warm Charcoal) – reduces light sensitivity & visual tension
// Primary:     #B25A45 (Muted Terracotta) – grounding accent
// Secondary:   #6B8E6A (Muted Olive) – calm success/progress
// Accent:      #C6A664 (Soft Ochre/Gold)  – "Meaning" highlights
// ─────────────────────────────────────────────────────────────────────────────
import { configureFonts, MD3DarkTheme } from "react-native-paper";

export const colors = {
	// Core background palette (Warm darks)
	background: "#161513", // Warm Charcoal
	surface: "#1E1C1A", // slightly lighter surface
	surfaceElevated: "#262421", // elevated cards/bento boxes
	surfaceModal: "#2E2B27", // modal/sheet surfaces

	// Primary: Muted Terracotta (grounding, organic energy)
	primary: "#B25A45",
	primaryDark: "#8F4534",
	primaryLight: "#D97D66",
	onPrimary: "#161513",

	// Accent: Soft Ochre (meaning, achievement)
	accent: "#C6A664",
	accentDark: "#9A7E46",
	accentLight: "#E8C88A",
	onAccent: "#161513",

	// Semantic (Warm off-whites for text to avoid pure white vibration)
	onBackground: "#EAE6DF",
	onSurface: "#D1CCC2",
	muted: "#8C867B",
	border: "#2E2B27", // Subtle borders for flat architecture
	borderFocused: "#B25A45",

	// Status — never use bright red/green per principles
	success: "#6B8E6A", // Muted Olive
	overdueColor: "#B25A45", // Uses primary Terracotta — NOT alarmist red
	inProgress: "#6C84A1", // Muted Slate Blue

	// Error (only internal system errors – NOT shown to user for overdue)
	errorSystem: "#B24545",

	// Specific UI roles
	meaningGold: "#C6A664", // "Why" anchors
	winLoop: "#6B8E6A", // "Your future self is proud"
	ghostedTask: "#383531", // ghost list blurred items

	// ─── Convenience aliases (used by components) ───────────────────────────────
	secondary: "#6C84A1",
	error: "#B24545",
	warning: "#B25A45",
} as const;

export const spacing = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	xxl: 48,
} as const;

export const radius = {
	sm: 6,
	md: 12,
	lg: 16, // Reduced from 18 for a slightly crisper Bento box feel
	xl: 24,
	full: 9999,
} as const;

// Typography uses generous line-heights (min 1.5x) to prevent "text swimming"
export const typography = {
	h1: {
		fontSize: 32,
		fontWeight: "700" as const,
		lineHeight: 44,
		letterSpacing: -0.5,
	},
	h2: {
		fontSize: 24,
		fontWeight: "700" as const,
		lineHeight: 36,
		letterSpacing: -0.2,
	},
	h3: { fontSize: 20, fontWeight: "600" as const, lineHeight: 30 },
	body: { fontSize: 16, fontWeight: "400" as const, lineHeight: 26 }, // 1.6x line-height for organic breathability
	bodySmall: { fontSize: 14, fontWeight: "400" as const, lineHeight: 22 },
	label: {
		fontSize: 14,
		fontWeight: "600" as const,
		lineHeight: 22,
		letterSpacing: 0.5,
	}, // Wide tracking for labels
	caption: { fontSize: 12, fontWeight: "400" as const, lineHeight: 18 },
} as const;

// Minimalist UI enforces ultra-flat architecture. Shadows are heavily diffused or non-existent.
export const shadow = {
	sm: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
	},
	md: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.08,
		shadowRadius: 16,
		elevation: 4,
	},
	lg: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.1,
		shadowRadius: 24,
		elevation: 8,
	},
} as const;

const fontConfig = { fontFamily: "System" };

export const paperTheme = {
	...MD3DarkTheme,
	dark: true,
	fonts: configureFonts({ config: fontConfig }),
	colors: {
		...MD3DarkTheme.colors,
		primary: colors.primary,
		secondary: colors.accent,
		background: colors.background,
		surface: colors.surface,
		onBackground: colors.onBackground,
		onSurface: colors.onSurface,
		onPrimary: colors.onPrimary,
		error: colors.errorSystem,
	},
};

export type AppTheme = typeof paperTheme;
