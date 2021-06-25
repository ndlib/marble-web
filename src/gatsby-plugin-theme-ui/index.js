import merge from 'lodash.merge'

import { theme } from '@ndlib/gatsby-theme-marble/src/gatsby-plugin-theme-ui'

export default merge({}, theme, {
  colors: {
    primaryWithOpacity: '#adc8ce',
    attention: '#aa272f',
    highlight: '#fff190',
    muted: '',
  },
  NDBrandHeader: {
    p: ['1rem 0 0', '1rem 0 0', '1rem 0 0', '1rem 0 1.5rem'],
    '& .mark': {
      my: 'auto',
    },
  },
  hero: {
    fullBleed: {
      '& .lede': {
        background: 'var(--theme-ui-colors-gray-2)',
        borderRadius: '0 10px 10px 0',
      },
    },
    navSearch: {
      position: 'relative',
      display: 'flex',
      '& div': {
        display: 'flex',
        opacity: '1',
        transition: 'all 1s',
        my: '5px',
        background: 'white',
        border: '1px solid var(--theme-ui-colors-gray-4)',
        borderRadius: '10px',
      },
      '& input': {
        width: '35vw',
        py: '1.25rem',
      },
      '& button': {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: '100%',
        padding: '1.25rem 1.375rem',
        opacity: '1',
        lineHeight: '1.2',
        textDecoration: 'none',
        color: 'text',
        borderRadius: '10px',
        borderTop: '0.25rem solid transparent',
        borderBottom: '0.25rem solid transparent',
        transition: 'all 325ms ease-in-out',
        bg: 'white !important',
        '&:hover': {
          background: 'var(--theme-ui-colors-light)',
          borderBottom: `0.25rem solid var(--theme-ui-colors-lightDark)`,
          transform: 'none',
          cursor: 'pointer',
        },
        '&.selected': {
          background: 'var(--theme-ui-colors-light)',
          borderBottom: `0.25rem solid var(--theme-ui-colors-lightDark)`,
          transform: 'none',
          cursor: 'pointer',
        },
      },
    },
  },
  links: {
    footer: {
      color: 'white',
      textDecoration: 'none',
    },
    menuFooter: {
      color: 'white',
      flex: '50%',
      textDecoration: 'none',
      display: 'block',
    },
    help: {
      textAlign: 'left',
      '& a': {
        display: 'block',
      },
    },
  },
  menus: {
    '& div': {
      display: 'flex',
      flexWrap: 'wrap',
    },
    navTop: {
      '& div':{
        minWidth: [0, 0, 0, '29rem'],
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
  header: {
    default: {
    },
  },
})
