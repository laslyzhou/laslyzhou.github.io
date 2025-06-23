const JSDOM = require('jsdom').JSDOM
const dom = new JSDOM('<html><body></body></html>')
global.document = dom.window.document
global.window = dom.window
global.navigator = dom.window.navigator
global.jQuery = global.$ = global.jquery = require('jquery')
require('jquery-ui')

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
