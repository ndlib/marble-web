module.exports = {
  listItem: {
    marginBottom: '1em',
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
