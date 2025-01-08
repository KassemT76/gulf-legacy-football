import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		colors: {
			background: 'hsl(240, 4.8%, 95.9%)', // Light grayish blue for the background
			foreground: 'hsl(0, 0%, 10%)', // Very dark gray for text
			card: {
			  DEFAULT: 'hsl(240, 4.8%, 100%)', // Slightly lighter than background
			  foreground: 'hsl(0, 0%, 10%)', // Matches foreground for readability
			},
			popover: {
			  DEFAULT: 'hsl(240, 4.8%, 92%)', // Slightly darker than background for subtle distinction
			  foreground: 'hsl(0, 0%, 10%)', // Matches foreground for consistency
			},
			primary: {
			  DEFAULT: 'hsl(240, 5.9%, 20%)', // Darker version of foreground
			  foreground: 'hsl(240, 4.8%, 95.9%)', // Contrasts well with primary
			},
			secondary: {
			  DEFAULT: 'hsl(240, 4.8%, 80%)', // Slightly darker than background
			  foreground: 'hsl(0, 0%, 20%)', // Darker than the default foreground
			},
			muted: {
			  DEFAULT: 'hsl(240, 4.8%, 90%)', // Muted version of background
			  foreground: 'hsl(0, 0%, 40%)', // Subtle gray for less emphasis
			},
			accent: {
			  DEFAULT: 'hsl(97, 80%, 67%)', // Bright green for accents and hovers
			  foreground: 'hsl(0, 0%, 100%)', // White for contrast
			},
			destructive: {
			  DEFAULT: 'hsl(0, 70%, 55%)', // Warm red for destructive actions
			  foreground: 'hsl(0, 0%, 100%)', // White for contrast
			},
			border: 'hsl(240, 4.8%, 80%)', // Light border color for subtle effects
			input: 'hsl(240, 4.8%, 85%)', // Matches background with slight contrast
			ring: 'hsl(97, 80%, 67%)', // Matches accent for focus indicators
			chart: {
			  1: 'hsl(97, 80%, 67%)', // Matches accent
			  2: 'hsl(240, 5.9%, 20%)', // Matches primary
			  3: 'hsl(0, 70%, 55%)', // Matches destructive
			  4: 'hsl(200, 60%, 60%)', // Complementary blue for variety
			  5: 'hsl(50, 70%, 50%)', // Warm yellow for additional contrast
			},
		  },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
  			pulse: 'pulse var(--duration) ease-out infinite',
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			meteor: 'meteor 5s linear infinite',
  			ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite'
  		},
  		keyframes: {
  			'border-beam': {
  				'100%': {
  					'offset-distance': '100%'
  				}
  			},
  			pulse: {
  				'0%, 100%': {
  					boxShadow: '0 0 0 0 var(--pulse-color)'
  				},
  				'50%': {
  					boxShadow: '0 0 0 8px var(--pulse-color)'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			},
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
  			meteor: {
  				'0%': {
  					transform: 'rotate(215deg) translateX(0)',
  					opacity: '1'
  				},
  				'70%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'rotate(215deg) translateX(-500px)',
  					opacity: '0'
  				}
  			},
  			ripple: {
  				'0%, 100%': {
  					transform: 'translate(-50%, -50%) scale(1)'
  				},
  				'50%': {
  					transform: 'translate(-50%, -50%) scale(0.9)'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
