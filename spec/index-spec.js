const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')

describe('Index HTML', () => {
  let dom

  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '../dist/index.html')
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
    dom = new JSDOM(htmlContent)
  })

  it('should have the correct title', () => {
    expect(dom.window.document.title).toBe('Novo Nordisk')
  })
})
