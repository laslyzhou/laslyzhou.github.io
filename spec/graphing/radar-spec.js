const Radar = require('../../src/graphing/radar')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

describe('Radar', () => {
  let radar
  let document

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="radar"></div></body></html>')
    document = dom.window.document
    global.document = document // Set document globally for radar.js
    // Default radar instance for general tests, specific describe blocks can override
  })

  describe('plotRadarHeader', () => {
    beforeEach(() => {
      // Ensure UIRefresh2022 is false for this suite
      require('../../src/config').featureToggles.UIRefresh2022 = false
      const dom = new JSDOM('<!DOCTYPE html><html><body><div id="radar"></div></body></html>')
      document = dom.window.document
      global.document = document
      global.window = dom.window // Ensure window is also set for SVGElement mock

      // Mock for createSVGPoint for d3-tip compatibility
      if (typeof global.window.SVGElement === 'undefined') {
        global.window.SVGElement = function () {} // Ensure SVGElement is defined
      }
      if (typeof global.window.SVGElement.prototype.createSVGPoint === 'undefined') {
        global.window.SVGElement.prototype.createSVGPoint = function () {
          return {
            x: 0,
            y: 0,
            matrixTransform: function () {
              return this
            },
          }
        }
      }

      radar = Radar(500, {
        rings: () => [],
        quadrants: () => [
          { order: 'first', quadrant: { name: () => 'Quadrant 1', blips: () => [] }, startAngle: 0 },
          { order: 'second', quadrant: { name: () => 'Quadrant 2', blips: () => [] }, startAngle: 90 },
          { order: 'third', quadrant: { name: () => 'Quadrant 3', blips: () => [] }, startAngle: 180 },
          { order: 'fourth', quadrant: { name: () => 'Quadrant 4', blips: () => [] }, startAngle: 270 },
        ],
        getAlternatives: () => [],
        getCurrentSheet: () => '',
      })
      radar.init()
    })

    it('should display the correct logo', () => {
      radar.plot() // Plot the radar which includes the header
      const logoImg = document.querySelector('.radar-title__logo img')
      expect(logoImg).not.toBeNull()
      expect(logoImg.getAttribute('src')).toBe('/images/novo-nordisk-logo.png')
    })
  })

  // Basic test for plotHeader (UIRefresh2022 feature toggle)
  // This needs to be adapted if the UIRefresh2022 significantly changes header structure
  describe('plotHeader (UIRefresh2022)', () => {
    let originalFeatureToggle

    beforeEach(() => {
      // Mock config for UIRefresh2022
      originalFeatureToggle = require('../../src/config').featureToggles.UIRefresh2022
      require('../../src/config').featureToggles.UIRefresh2022 = true

      // Re-initialize JSDOM and Radar with the feature toggle active
      const dom = new JSDOM(
        '<!DOCTYPE html><html><body><main><div class="hero-banner"><h1 class="hero-banner__title-text"></h1></div><div class="graph-placeholder" id="radar"></div></main></body></html>',
      )
      document = dom.window.document
      global.document = document
      global.window = dom.window // Ensure window is also set for SVGElement mock

      // Mock for createSVGPoint for d3-tip compatibility
      if (typeof global.window.SVGElement === 'undefined') {
        global.window.SVGElement = function () {} // Ensure SVGElement is defined
      }
      if (typeof global.window.SVGElement.prototype.createSVGPoint === 'undefined') {
        global.window.SVGElement.prototype.createSVGPoint = function () {
          return {
            x: 0,
            y: 0,
            matrixTransform: function () {
              return this
            },
          }
        }
      }
      radar = Radar(500, {
        rings: () => [],
        quadrants: () => [
          { order: 'first', quadrant: { name: () => 'Quadrant 1', blips: () => [] }, startAngle: 0 },
          { order: 'second', quadrant: { name: () => 'Quadrant 2', blips: () => [] }, startAngle: 90 },
          { order: 'third', quadrant: { name: () => 'Quadrant 3', blips: () => [] }, startAngle: 180 },
          { order: 'fourth', quadrant: { name: () => 'Quadrant 4', blips: () => [] }, startAngle: 270 },
        ],
        getAlternatives: () => [],
        getCurrentSheet: () => '',
      })
      radar.init()
    })

    afterEach(() => {
      // Restore original feature toggle
      require('../../src/config').featureToggles.UIRefresh2022 = originalFeatureToggle
    })

    it('should set the document title in hero banner when UIRefresh2022 is active', () => {
      document.title = 'Test Title' // Set a document title for the test
      radar.plot()
      const heroBannerTitle = document.querySelector('.hero-banner__title-text')
      expect(heroBannerTitle).not.toBeNull()
      expect(heroBannerTitle.innerHTML).toBe('Test Title')
      // Note: The logo is not directly part of plotHeader in UIRefresh2022,
      // it's assumed to be in index.html or handled differently.
      // This test focuses on what plotHeader *does* in this mode.
    })
  })
})
