module.exports = {
  listItem: {
    margin: '1rem',
    '&:not(:first-of-type)': {
      marginTop: '0',
    },
    '&:last-child': {
      marginBottom: '0',
    },
  },
  itemLink: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  footer: {
    display: 'flex',
    '> *:not(:first-of-type)': {
      marginLeft: '1rem',
    },
  },
}
