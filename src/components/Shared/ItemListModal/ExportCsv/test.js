import React from 'react'
import { shallow } from 'enzyme'
import ExportCsv from './index'
import MaterialButton from '@ndlib/gatsby-theme-marble/src/components/Shared/MaterialButton'

let wrapper
let props

describe('StatsPage', () => {
  beforeEach(() => {
    // Unimplemented function in jsdom. Mock it so that it doesn't throw and we can test that it was called.
    Object.defineProperty(window.URL, 'createObjectURL', { value: jest.fn(), configurable: true })

    props = {
      items: [
        {
          marbleId: '123',
          slug: 'item/123',
          title: 'My item is super awesome and stuff',
          description: 'I have a description!',
          collection: '098-98235',
          copyrightRestricted: false,
          partiallyDigitized: null,
        },
        {
          marbleId: '456',
          slug: 'item/456',
          title: 'Mine is better',
          description: '',
          collection: '807153u0',
          copyrightRestricted: true,
          partiallyDigitized: true,
        },
        {
          marbleId: '789',
          slug: 'item/789',
          title: 'Mine is besterest',
          description: 'Desc',
          collection: '8597215097',
          copyrightRestricted: false,
          partiallyDigitized: null,
        },
      ],
      filename: 'My Filename! Is /REALly b#ad (,?<!) and loooooooooooooong.csv',
    }
    wrapper = shallow(<ExportCsv {...props} />)
  })

  afterEach(() => {
    props = undefined
    wrapper = undefined
  })

  test('should render an export button', () => {
    expect(wrapper.find(MaterialButton).exists()).toBe(true)
  })

  test('should download well-formed csv when clicked', async () => {
    const btn = wrapper.find(MaterialButton)
    btn.simulate('click')

    expect(window.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob))

    // Check that contents were formatted as expected
    const blob = window.URL.createObjectURL.mock.calls[0][0]
    const reader = new FileReader()
    const waitForIt = new Promise(resolve => {
      reader.addEventListener('loadend', () => {
        resolve(reader.result)
      })
      reader.readAsText(blob)
    })
    const csv = await waitForIt
    const expectedText = [
      '"Marble ID","Title","Description","Collection ID","Copyright Restricted?","Partially Digitized?"',
      '"123","My item is super awesome and stuff","I have a description!","098-98235","false",""',
      '"456","Mine is better","","807153u0","true","true"',
      '"789","Mine is besterest","Desc","8597215097","false",""',
      '',
    ].join('\r\n')
    expect(csv).toEqual(expectedText)

    // Expected filename: my-filename-is-really-bad-()-and-loooooooooooooon_2021-06-11.csv
    // We don't have a good way to test that
  })
})
