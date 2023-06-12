/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./layouts/*.html",
    ],
  theme: {
     container: {
          center: true,
          padding: '1rem',
        },
        screens: {
          'sm': '640px',
          // => @media (min-width: 640px) { ... }
          'md': '768px',
          // => @media (min-width: 768px) { ... }
          'lg': '992px',
          // => @media (min-width: 1199px) { ... }
          'xl': '1170px',
          // => @media (min-width: 1440px) { ... }
          '2xl': '1270px',
        },
        colors: {
            'black': '#000000',
            'white': '#ffffff',
            'transparent': 'transparent',
            primary: {
                '900': '#0824F5',
              },
            pink: {
              '900': '#EC008C',
            },
            dark: {
              '200': '#111111',
              '300': '#B1B3B3',
              '400': '#D3D3D3',
              '500': '#636466',
              '600': '#242424',
            },
        },
        extend: {
            fontFamily: {
                'titling-gothic-fb': ['Titling Gothic FB', 'sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
                'inter': ['Inter', 'sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
            },
            
            fontSize: {
                'md': '16px',
                '1xl': '24px',
                '2xl': '28px',
                '3xl': '30px',
                '4xl': '43px',
                '5xl': '51px',
                '6xl': '55px',
                
            },
            lineHeight: {
                'xl': '26px',
                '1xl': '29px',
                '2xl': '34px',
                '3xl': '36px',
                '4xl': '58px',
                '5xl': '61px',
                '6xl': '71px',
            },
            spacing: {
                'full': '100%',
                
            },
            borderRadius: {
              '6xl': '40px',
              '5xl': '30px',
              '4xl': '20px',
              '2xl': '15px',
              '1xl': '12px',
              'xl': '10px',
            },
            margin: {
                'auto': 'auto',
            },
            zIndex: {
                '-1': '-1',
                '1': '1',
                '2': '2',
                '3': '3',
                '4': '4',
                '5': '5',
                '6': '6',
                '7': '7',
                '8': '8',
                '9': '9',
            },
            boxShadow: {
                'gray': '0px 15px 25px rgba(0, 0, 0, 0.13)',
              },
            height: {
                '100vw': '100vw',
            },
            transitionDuration: {
             '0': '0ms',
             '3000': '3000ms',
            }
        },
  },
  plugins: [],
}

