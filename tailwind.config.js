/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                gray: {
                    25: '#FCFCFD',
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    700: '#374151',
                    800: '#1F2A37',
                    900: '#111928'
                },
                primary: {
                    25: '#F5F8FF',
                    50: '#EBF5FF',
                    100: '#E1EFFE',
                    200: '#C3DDFD',
                    300: '#A4CAFE',
                    400: '#528BFF',
                    500: '#2970FF',
                    600: '#1C64F2',
                    700: '#1A56DB',
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                green: {
                    50: '#F3FAF7',
                    100: '#DEF7EC',
                    800: '#03543F'
                },
                yellow: {
                    100: '#FDF6B2',
                    800: '#723B13'
                },
                purple: {
                    50: '#F6F5FF',
                    200: '#DCD7FE'
                },
                indigo: {
                    25: '#F5F8FF',
                    50: '#EEF4FF',
                    100: '#E0EAFF',
                    300: '#A4BCFD',
                    400: '#8098F9',
                    600: '#444CE7',
                    800: '#2D31A6'
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
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
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
                    1: 'hsl(var(--chart-1))',
                    2: 'hsl(var(--chart-2))',
                    3: 'hsl(var(--chart-3))',
                    4: 'hsl(var(--chart-4))',
                    5: 'hsl(var(--chart-5))'
                },
                gold: {
                    400: '#D4AF37',
                    500: '#B8860B',
                    600: '#9A7209'
                },
                platinum: {
                    50: '#F8F9FA',
                    100: '#E9ECEF',
                    900: '#212529'
                }
            },
            fontFamily: {
                'luxury': ['Playfair Display', 'serif'],
            },
            screens: {
                mobile: '100px',
                tablet: '640px',
                pc: '769px'
            },
            boxShadow: {
                xs: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                sm: '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)',
                md: '0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)',
                lg: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
                xl: '0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)',
                '2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
                '3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.14)'
            }
            // borderRadius: {
            //     lg: 'var(--radius)',
            //     md: 'calc(var(--radius) - 2px)',
            //     sm: 'calc(var(--radius) - 4px)'
            // }
        }
    },
    plugins: [require('tailwindcss-animate')]
};
