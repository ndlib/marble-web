/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui'
import { useState } from 'react'
import PropTypes from 'prop-types'
import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionModal'
import MaterialButton from '@ndlib/gatsby-theme-marble/src/components/Shared/MaterialButton'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import ExportCsv from './ExportCsv'

import sx from './sx'

const ItemListModal = ({ marbleItems, headerLabel, onClose }) => {
  const [modalOpen, setModalOpen] = useState(true)

  const handleCloseModal = () => {
    setModalOpen(false)
    if (onClose) {
      onClose()
    }
  }

  return (
    <ActionModal
      isOpen={modalOpen}
      contentLabel={headerLabel}
      shouldFocusAfterRender
      shouldReturnFocusAfterClose
      closeFunc={handleCloseModal}
      fullscreen
      footer={(
        <Box sx={sx.footer}>
          <MaterialButton onClick={handleCloseModal} primary>Close</MaterialButton>
          <ExportCsv items={marbleItems} filename={headerLabel} />
        </Box>
      )}
    >
      <Container>
        {marbleItems.map(item => (
          <Box sx={sx.listItem} key={item.marbleId}>
            <Link to={'/' + item.slug} sx={sx.itemLink}>{item.title}</Link>
          </Box>
        ))}
      </Container>
    </ActionModal>
  )
}

ItemListModal.propTypes = {
  marbleItems: PropTypes.arrayOf(PropTypes.shape({
    marbleId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  })).isRequired,
  headerLabel: PropTypes.string.isRequired,
  onClose: PropTypes.func,
}

export default ItemListModal
