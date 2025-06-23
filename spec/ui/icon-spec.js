const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Load the HTML file content
const htmlPath = path.resolve(__dirname, '../../src/index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// Setup JSDOM
let dom;
let document;

beforeAll(() => {
  dom = new JSDOM(htmlContent);
  document = dom.window.document;
  // You might need to make window and other globals available if your scripts need them
  // global.window = dom.window;
  // global.document = dom.window.document;
  // global.navigator = dom.window.navigator;
  // global.jQuery = global.$ = require('jquery')(dom.window);
});

describe('Icon Tests', () => {
  describe('APSIS Logo', () => {
    it('should be present in the header', () => {
      const logoImg = document.querySelector('header.input-sheet__logo img[alt="APSIS logo"]');
      expect(logoImg).not.toBeNull();
    });

    it('should have the correct src attribute', () => {
      const logoImg = document.querySelector('header.input-sheet__logo img[alt="APSIS logo"]');
      expect(logoImg.getAttribute('src')).toBe('/images/tw-logo.png');
    });
  });

  describe('Favicon', () => {
    it('should be linked in the head', () => {
      const faviconLink = document.querySelector('head link[rel="icon"]');
      expect(faviconLink).not.toBeNull();
    });

    it('should have the correct href attribute', () => {
      const faviconLink = document.querySelector('head link[rel="icon"]');
      expect(faviconLink.getAttribute('href')).toBe('/images/favicon.ico');
    });
  });
});
