module.exports = {
  input: (valid) => {
    return {
      border: valid ? '1px solid' : '2px solid',
      borderColor: valid ? 'gray.0' : 'attention',
      display: 'inline-block',
      fontFamily: 'heading',
      fontSize: '26px',
      
      width: ['100%', 'calc(100% - 230px)', 'calc(100% - 230px)'],
    }
  },
  buttonWrapper: {
    marginLeft: '.5rem',
    verticalAlign: 'top',
    '& > button': {
      marginLeft: '.5rem',
    },
    display: 'block',
  },
  warning: {
    fontSize: '.7rem',
    color: 'attention',
  },
}
