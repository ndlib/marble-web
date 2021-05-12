import merge from 'lodash.merge'
import bootstrapTheme from '@theme-ui/preset-bootstrap'

import { theme } from '@ndlib/gatsby-theme-marble/src/gatsby-plugin-theme-ui'

const light = '#e1e8f2'
const lightDark = '#c1cddd'

export default merge({}, theme, bootstrapTheme, {
  colors: {
    primary: '#0c2340',
    primaryDark: '#081629',
    primaryLight: '#143865',
    primaryBright: '#1c4f8f',
    secondary: '#ae9142',
    secondaryDark: '#8c7535',
    secondaryLight: '#d39f10',
    light: '#e1e8f2',
    lightDark: '#c1cddd',
    lightLight: '#edf2f9',
    primaryWithOpacity: '#adc8ce',
    attention: '#aa272f',
    highlight: '#fff190',
    muted: '',
  },
  links: {
    header: {
      position: 'relative',
      display: 'flex',
      margin: '0 0 -2.7rem',
      justifyContent: 'flex-end',
      '& div': {
        display: 'flex',
        opacity: '1',
        transition: 'all 1s',
        my: '5px',
        background: 'white',
      },
      '& input': {
        width: '300px',
        py: '1.25rem',
      },
      '& a, button': {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: '100%',
        padding: '1.25rem 1.375rem',
        opacity: '1',
        lineHeight: '1.2',
        textDecoration: 'none',
        color: 'text',
        borderTop: '0.25rem solid transparent',
        borderBottom: '0.25rem solid transparent',
        transition: 'all 325ms ease-in-out',
        bg: 'white',
        '&:hover': {
          background: light,
          borderBottom: `0.25rem solid ${lightDark}`,
          transform: 'none',
          cursor: 'pointer',
        },
        '&.selected': {
          background: light,
          borderBottom: `0.25rem solid ${lightDark}`,
          transform: 'none',
          cursor: 'pointer',
        },
      },
    },
    footer: {
      textAlign: 'left',
      '& a': {
        display: 'block',
        color: 'white',
        px: '50px',
        py: '5px',
        textDecoration: 'none',
        fontFamily: 'heading',
      },
    },
    help: {
      textAlign: 'left',
      '& a': {
        display: 'block',
      },
    },
  },
  text: {
    default: {
      fontFamily: 'body',
      fontSize: 3,
      lineHeight: 'body',
      fontWeight: 'body',
      color: 'text',
    },
  },
  flexD: ['row', 'column'],
  fonts: {
    body: `
      GPBook,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif
    `,
    bold: `
      GPBold,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif
    `,
    heading: `
      'EB Garamond',
      georgia,
      serif
    `,
    logo: `
      GPCBook,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif
    `,
    menu: `
      GPCBook,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif
    `,
    tagline: `
      GPCBook,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif
    `,
  },
  styles: {
    a: {
      color: 'primary',
      wordBreak: 'break-word',
    },
  },
})
