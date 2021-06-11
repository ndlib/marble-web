/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import typy from 'typy'
import MaterialButton from '@ndlib/gatsby-theme-marble/src/components/Shared/MaterialButton'

// These field keys can be nested multiple layers. Typy will fetch it.
// (Ex: 'metadata[0].value': 'My Metadata Field')
const FIELDS = {
  marbleId: 'Marble ID',
  title: 'Title',
  description: 'Description',
  collection: 'Collection ID',
  copyrightRestricted: 'Copyright Restricted?',
  partiallyDigitized: 'Partially Digitized?',
}

export const formatCSVString = (item) => {
  let formattedData = ''
  const fieldKeys = Object.keys(FIELDS)
  fieldKeys.forEach((key, i) => {
    // Always enclose values inside quotes because it's easier that way
    formattedData += '"'
    const typyField = typy(item, key)
    if (typyField.isBoolean) {
      formattedData += typyField.safeBoolean.toString()
    } else if (typyField.isNumber) {
      formattedData += typyField.safeNumber.toString()
    } else {
      formattedData += typyField.safeString.replace(/"/g, '""') // Escape quotes (") with two quote characters ("")
    }
    formattedData += (i < fieldKeys.length - 1) ? '",' : '"\r\n'
  })
  return formattedData
}

const ExportCsv = ({ items, filename }) => {
  const download = () => {
    // Generate the header row
    const headerLabels = Object.keys(FIELDS).map(key => FIELDS[key])
    // In case a field name has a comma, enclose in quotes
    let formattedOutput = `"${headerLabels.join('","')}"\r\n`

    // Now append a row for each item
    items.forEach(item => {
      formattedOutput += formatCSVString(item)
    })

    // Sanitize the filename fed in
    // Remove most punctuation and replace spaces with hyphen for the filename
    let exportFilename = filename.toLowerCase().replace(/\s/g, '-').replace(/[#%&{}\\<>*?/$!'":;,@+`|=]/g, '')
    // If extension was included, remove that for now. We'll add it on later
    if (exportFilename.endsWith('.csv')) {
      exportFilename = exportFilename.slice(0, exportFilename.length - 4)
    }
    // Expect 15 char suffix for date and file extension (_YYYY-MM-DD.csv)
    // 49 chars = maximum file name length of 64
    if (exportFilename.length > 49) {
      // If it ends with a hyphen, chop that off
      exportFilename = exportFilename.slice(0, exportFilename.charAt(49) === '-' ? 48 : 49)
    }
    // This will get the current date in YYYY-MM-DD format
    const now = new Date()
    const dateString = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().split('T')[0]
    exportFilename += `_${dateString}.csv`

    // Create a file blob, write data to it, and trigger a download
    const element = document.createElement('a')
    const file = new Blob([formattedOutput], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = exportFilename
    element.click()
  }

  return (
    <MaterialButton secondary onClick={download}>
      Export CSV
    </MaterialButton>
  )
}

ExportCsv.propTypes = {
  items: PropTypes.array.isRequired,
  filename: PropTypes.string.isRequired,
}

export default ExportCsv
