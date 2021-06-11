import React from 'react'
import { shallow } from 'enzyme'
import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionModal'
import MaterialButton from '@ndlib/gatsby-theme-marble/src/components/Shared/MaterialButton'
import ItemListModal from './index'
import ExportCsv from './ExportCsv'

let wrapper
let props

describe('StatsPage', () => {
  beforeEach(() => {
    props = {
      marbleItems: [
        {
          marbleId: '123',
          slug: 'item/123',
          title: 'My item is super awesome and stuff',
        },
        {
          marbleId: '456',
          slug: 'item/456',
          title: 'Mine is better',
        },
        {
          marbleId: '789',
          slug: 'item/789',
          title: 'Mine is besterest',
        },
      ],
      headerLabel: 'My Modal Header',
      onClose: jest.fn(),
    }
    wrapper = shallow(<ItemListModal {...props} />)
  })

  afterEach(() => {
    props = undefined
    wrapper = undefined
  })

  test('should render an ActionModal', () => {
    const modal = wrapper.find(ActionModal)
    expect(modal.exists()).toBe(true)
    expect(modal.props().contentLabel).toEqual(props.headerLabel)
  })

  test('should create a link to each item in the list', () => {
    // Make sure our test is valid!
    expect(props.marbleItems.length).toBeGreaterThan(0)

    const links = wrapper.find('EmotionCssPropInternal').filterWhere(el => el.props().to)
    props.marbleItems.forEach(item => {
      const link = links.findWhere(el => el.props().to === `/${item.slug}`)
      expect(link.exists()).toBe(true)
      expect(link.text()).toEqual(item.title)
    })
  })

  test('should render an export button in modal footer', () => {
    const modal = wrapper.find(ActionModal)
    const footerWrapper = shallow(modal.props().footer)
    expect(footerWrapper.find(ExportCsv).exists()).toBe(true)
  })

  test('should call onClose when clicking close button', () => {
    expect(props.onClose).not.toHaveBeenCalled()

    const modal = wrapper.find(ActionModal)
    const footerWrapper = shallow(modal.props().footer)
    const btn = footerWrapper.find(MaterialButton)
    expect(btn.exists()).toBe(true)

    btn.simulate('click')
    expect(props.onClose).toHaveBeenCalled()
  })
})
