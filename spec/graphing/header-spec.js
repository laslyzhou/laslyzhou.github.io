const jsdom = require('jsdom')
const { JSDOM } = jsdom
const fs = require('fs')
const path = require('path')

describe('Header', () => {
  let dom
  let document

  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../../src/index.html'), 'utf8')
    dom = new JSDOM(html)
    document = dom.window.document
  })

  it('should display Novo Nordisk in the header', () => {
    const headerLink = document.querySelector('.input-sheet__logo a')
    const headerImage = document.querySelector('.input-sheet__logo img')

    expect(headerLink.href).toBe('https://www.novonordisk.com/')
    expect(headerImage.alt).toBe('Novo Nordisk logo')
  })
})
