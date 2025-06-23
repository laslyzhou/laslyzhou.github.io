const proxyquire = require('proxyquire')
const d3Mock = {
  selectAll: () => ({
    remove: () => {},
  }),
}
const GraphingRadarMock = function () {
  return {
    init: () => ({
      plot: () => {},
    }),
  }
}

// Need to import the factory module AFTER mocking (with proxyquire)
const factory = proxyquire('../../src/util/factory.js', {
  d3: d3Mock,
  '../graphing/radar': GraphingRadarMock,
})

const plotRadar = factory.plotRadar

describe('plotRadar', () => {
  it('should set the document title to NOVO NORDISK TECH RADAR', () => {
    // Mock document object
    global.document = {
      title: '',
      // Mock querySelector for UIRefresh2022 toggle and other elements
      querySelector: () => ({ style: {} }),
      // Mock body for plotLoading
      body: {
        style: {},
        innerHTML: '',
        // Mock appendChild for d3 manipulations in plotLoading
        appendChild: () => ({
          setAttribute: () => {},
          append: () => ({
            attr: () => ({
              append: () => ({
                attr: () => ({
                  html: () => {},
                }),
              }),
              html: () => {},
            }),
          }),
        }),
      },
      // Mock getElementsByTagName for d3 manipulations
      getElementsByTagName: () => ([]),
    }
    // Mock window object
    global.window = {
      innerHeight: 800, // Provide a default value for innerHeight
    }

    // Call plotRadar with minimal required arguments
    plotRadar('NOVO NORDISK TECH RADAR', [], 'Test Radar', [])
    expect(document.title).toEqual('NOVO NORDISK TECH RADAR')
  })
})
