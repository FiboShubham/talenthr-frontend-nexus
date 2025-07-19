import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				'border-light': 'hsl(var(--border-light))',
				ring: 'hsl(var(--primary))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				surface: 'hsl(var(--surface))',
				'surface-hover': 'hsl(var(--surface-hover))',
				
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					dark: 'hsl(var(--primary-dark))',
					light: 'hsl(var(--primary-light))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				
				success: {
					DEFAULT: 'hsl(var(--success))',
					light: 'hsl(var(--success-light))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					light: 'hsl(var(--warning-light))'
				},
				error: {
					DEFAULT: 'hsl(var(--error))',
					light: 'hsl(var(--error-light))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					light: 'hsl(var(--info-light))'
				},
				
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					light: 'hsl(var(--muted-light))'
				},
				
				card: {
					DEFAULT: 'hsl(var(--card))',
					shadow: 'hsl(var(--card-shadow))'
				},
				
				'input-bg': 'hsl(var(--input-bg))',
				'input-border': 'hsl(var(--input-border))',
				
				sidebar: {
					bg: 'hsl(var(--sidebar-bg))',
					item: 'hsl(var(--sidebar-item))',
					'item-hover': 'hsl(var(--sidebar-item-hover))',
					text: 'hsl(var(--sidebar-text))',
					'text-muted': 'hsl(var(--sidebar-text-muted))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'sm': 'var(--shadow-sm)',
				'DEFAULT': 'var(--shadow)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-success': 'var(--gradient-success)',
				'gradient-surface': 'var(--gradient-surface)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;