import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#FFF1F1',
  				'100': '#FFE4E4',
  				'200': '#FFCBCB',
  				'300': '#FFA7A7',
  				'400': '#FF7171',
  				'500': '#FE353B',
  				'600': '#E62D32',
  				'700': '#CC2429',
  				'800': '#B31B20',
  				'900': '#991317',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#FCF5F5',
  				'100': '#F9EBEC',
  				'200': '#F3D7D9',
  				'300': '#ECC3C6',
  				'400': '#E29FA3',
  				'500': '#D67A80',
  				'600': '#C95660',
  				'700': '#B33E47',
  				'800': '#8F323A',
  				'900': '#6B262C',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			cream: {
  				'50': '#FFFFFF',
  				'100': '#F9FAFB',
  				'200': '#E8EAEE',
  				'300': '#D1D5DC',
  				'400': '#B9BFC9',
  				'500': '#A2AAB7',
  				'600': '#8A94A4',
  				'700': '#717D91',
  				'800': '#5A6575',
  				'900': '#434C59',
  				DEFAULT: '#E8EAEE'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config