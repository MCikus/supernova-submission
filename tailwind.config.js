const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')

const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

module.exports = {
  content: ['./src/**/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#212838',
            maxWidth: '639px',
            fontSize: rem(18),
            lineHeight: round(32 / 18),
            a: {
              fontSize: em(18, 18),
              color: '#62BCBF',
            },
            p: {
              fontSize: em(18, 18),
              marginTop: em(24, 18),
              marginBottom: em(1, 18),
            },
            'p[data-value="intro"]': {
              fontSize: em(20, 18),
              marginTop: em(32, 20),
              marginBottom: em(1, 20),
            },
            h2: {
              fontSize: em(36, 18),
              marginTop: em(32, 36),
              marginBottom: em(1, 36),
            },
            'h2 + *': {
              marginTop: em(24, 18),
            },
            'h2[data-value="title"]': {
              fontSize: em(30, 18),
              lineHeight: round(36 / 18),
              marginTop: em(8, 36),
              marginBottom: em(1, 36),
            },
            'h2[data-value="title"] + *': {
              marginTop: em(24, 18),
            },
            ul: {
              fontSize: em(18, 18),
              marginTop: em(24, 18),
              marginBottom: em(1, 18),
            },
            'ul > li': {
              position: 'relative',
              marginTop: em(1, 18),
              marginBottom: em(6, 18),
            },
            'ul > li::before': {
              width: em(6, 18),
              height: em(6, 18),
              top: `calc(${em(32 / 2, 18)} - ${em(3, 18)})`,
              left: em(4, 18),
              backgroundColor: '#212838',
            },
            blockquote: {
              marginTop: em(24, 18),
              marginBottom: em(24, 18),
              paddingLeft: em(20, 18),
              fontWeight: '600',
            },
            figure: {
              marginTop: em(32, 18),
              marginBottom: em(1, 18),
            },
            'figure figcaption': {
              fontSize: em(16, 18),
              lineHeight: round(24 / 16),
              marginTop: em(8, 16),
              color: '#212838',
            },
            'figure img': {
              maxHeight: em(382, 18),
              objectFit: 'cover',
            },
          },
        },
        lg: {
          css: {
            color: '#212838',
            maxWidth: '1024px',
            fontSize: rem(18),
            lineHeight: round(32 / 18),
            a: {
              fontSize: em(18, 18),
              color: '#62BCBF',
            },
            p: {
              fontSize: em(18, 18),
              marginTop: em(24, 18),
              marginBottom: em(1, 18),
            },
            'p[data-value="intro"]': {
              fontSize: em(20, 18),
              marginTop: em(32, 20),
              marginBottom: em(1, 20),
            },
            h2: {
              fontSize: em(36, 18),
              marginTop: em(32, 36),
              marginBottom: em(1, 36),
            },
            'h2 + *': {
              marginTop: em(24, 18),
            },
            'h2[data-value="title"]': {
              fontSize: em(36, 18),
              marginTop: em(8, 36),
              marginBottom: em(1, 36),
            },
            'h2[data-value="title"] + *': {
              marginTop: em(24, 18),
            },
            ul: {
              fontSize: em(18, 18),
              marginTop: em(24, 18),
              marginBottom: em(1, 18),
            },
            'ul > li': {
              position: 'relative',
              marginTop: em(1, 18),
              marginBottom: em(6, 18),
            },
            'ul > li::before': {
              width: em(6, 18),
              height: em(6, 18),
              top: `calc(${em(32 / 2, 18)} - ${em(3, 18)})`,
              left: em(4, 18),
              backgroundColor: '#212838',
            },
            blockquote: {
              marginTop: em(24, 18),
              marginBottom: em(24, 18),
              paddingLeft: em(20, 18),
              fontWeight: '600',
            },
            figure: {
              marginTop: em(32, 18),
              marginBottom: em(1, 18),
            },
            'figure figcaption': {
              fontSize: em(16, 18),
              lineHeight: round(24 / 16),
              marginTop: em(8, 16),
              color: '#212838',
            },
            'figure img': {
              maxHeight: em(382, 18),
              objectFit: 'cover',
            },
          },
        },
      },
      borderRadius: {
        angularness: '0',
      },
      colors: {
        primary: {
          DEFAULT: '#5976DE',
          focus: '#475FB2',
          content: '#FFFFFF',
          disabled: '#D8D8D8',
          200: '#CDD6F6',
          300: '#B3C4FF',
        },
        secondary: {
          DEFAULT: '#CDD6F6',
          focus: '#B3C4FF',
          content: '#4538D2',
          disabled: '#D8D8D8',
        },
        accent: {
          DEFAULT: '#00D577',
          focus: '#00C06A',
          content: '#FFFFFF',
          disabled: '#D8D8D8',
          300: '#00DE94',
        },
        base: {
          100: '#FFFFFF',
          200: '#E4E4E4',
          300: '#D9D9D9',
          400: '#9AA3B0',
          700: '#344153',
          content: '#1C202C',
          'content-70': 'rgba(28, 32, 44,0.7)',
        },
        state: {
          info: '#6AC4FF',
          'info-content': '#FFFFFF',
          success: '#00D577',
          'success-content': '#FFFFFF',
          warning: '#FFC600',
          'warning-content': '#FFFFFF',
          error: '#FF364F',
          'error-content': '#FFFFFF',
        },
        highlight: {
          lavender: '#CF9DEC',
          blue: '#A9DBFF',
          coral: '#FF9786',
        },
        coral: {
          light: '#FFD6CF',
        }
      },
      width: {
        '2/1': '200%',
      },
      height: {
        '2/1': '200%',
      },
      margin: {
        '-200': '-200%',
        200: '200%',
      },
      maxWidth: {
        56: '14rem',
        64: '16rem',
        80: '20rem',
      },
      transitionProperty: {
        size: 'height, min-height, width, min-width',
      },
    },
    fontFamily: {
      sans: ['Raleway', 'Inter', 'Roboto', 'system-ui', '-apple-system'],
    },
    screens: {
      xs: '480px',
      '3xl': '1920px',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    /* eslint @typescript-eslint/no-var-requires: "off" */
    require('@tailwindcss/typography')({
      modifiers: ['DEFAULT', 'lg'],
    }),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
