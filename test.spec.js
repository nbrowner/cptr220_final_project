/**
 * @jest-environment jsdom
 */

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8')

// include custom matchers
const styleMatchers = require('jest-style-matchers')
expect.extend(styleMatchers)

describe('Source code is valid', () => {
  test('HTML validates without errors', async () => {
    const lintOpts = {
      'doctype-first': true,
      'doctype-html5': true,
      'html-req-lang': true,
      'attr-name-style': false, // for meta tags
      'line-end-style': false, // either way
      'indent-style': false, // can mix/match
      'indent-width': false, // don't need to beautify
      'id-class-style': false, // I like dashes in classnames
      'img-req-alt': true,
      'attr-req-value': false,
      'spec-char-escape': false,
      'label-req-for': false,
      'attr-bans': false,
      'link-req-noopener': false,
      'tag-bans': false,
      'line-no-trailing-whitespace': false // don't need to beautify
    }

    const htmlfiles = fs.readdirSync(__dirname).filter((f) => f.endsWith('.html'))
    for (const f of htmlfiles) {
      await expect(f).toHaveNoHtmlLintErrorsAsync(lintOpts)
    }
  })

  test('CSS validates without errors', async () => {
    const cssFiles = fs.readdirSync(__dirname).filter((f) => f.endsWith('.css'))
    for (const f of cssFiles) {
      await expect(f).toHaveNoCssLintErrorsAsync()
    }
  })

  test('JavaScript lints without errors', () => {
    if (fs.existsSync(path.join(__dirname, 'js'))) {
      const jsfiles = fs.readdirSync(path.join(__dirname, 'js')).filter((f) => f.endsWith('.js'))

      for (const f of jsfiles) {
        expect(['js/' + f]).toHaveNoEsLintErrors()
      }
    }
  })
})

describe('HTML/Content Tests', () => {
  let document

  beforeEach(() => {
    document = new DOMParser().parseFromString(html, 'text/html')
  })

  // HTML/Content tests
  test('document has a title "WWU Student Churches"', () => {
    expect(document.title).toBe('WWU Student Churches')
  })

  test('document contains a header element with the text "WWU Student Churches"', () => {
    const header = document.querySelector('header h1')
    expect(header).not.toBeNull()
    expect(header.textContent).toBe('WWU Student Churches')
  })

  test('document references all three student churches', () => {
    const paragraph = document.querySelector('.flex-container-1 .flex-item-2 h2')
    const substrings = ['circle', 'nuestra', 'berean']
    expect(paragraph).not.toBeNull()
    expect(paragraph.textContent).toMatch(new RegExp(substrings.join('|'), 'i'))
    // expect(paragraph.textContent).toMatch(/circle|nuestra|berean/i);
  })

  test('document contains three links with specific href attributes', () => {
    const links = document.querySelectorAll('.flex-container-1 a')
    const hrefs = Array.from(links).map(link => link.getAttribute('href'))
    expect(hrefs).toEqual(['circle.html', 'berean.html', 'nuestra.html'])
  })
})

describe('CSS Tests', () => {
  const document = new DOMParser().parseFromString(html, 'text/html')

  // CSS/Style tests
  test('document has a stylesheet with href "css/style.css"', () => {
    const stylesheet = document.querySelector('link[rel="stylesheet"][href="css/style.css"]')
    expect(stylesheet).not.toBeNull()
  })

  test('document has a link to Google Fonts API', () => {
    const googleFonts = document.querySelector('link[href="https://fonts.googleapis.com/css2?family=Fanwood+Text:ital@0;1&display=swap"]')
    expect(googleFonts).not.toBeNull()
  })

  test('document has a link to Bootstrap CSS', () => {
    const bootstrap = document.querySelector('link[href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"]')
    expect(bootstrap).not.toBeNull()
  })

  test('document has a link to preconnect to Google Fonts', () => {
    const preconnect = document.querySelector('link[rel="preconnect"][href="https://fonts.googleapis.com"]')
    expect(preconnect).not.toBeNull()
  })
})

describe('JavaScript Tests', () => {
  const document = new DOMParser().parseFromString(html, 'text/html')

  // JS/Scripts tests
  test('document has a script with src "https://code.jquery.com/jquery-3.6.0.min.js"', () => {
    const jqueryScript = document.querySelector('script[src="https://code.jquery.com/jquery-3.6.0.min.js"]')
    expect(jqueryScript).not.toBeNull()
  })

  test('document has a script with src "js/footer.js"', () => {
    const ajaxScript = document.querySelector('script[src="js/footer.js"]')
    expect(ajaxScript).not.toBeNull()
  })

  test('document has a script with src "js/animations.js"', () => {
    const animationsScript = document.querySelector('script[src="js/animations.js"]')
    expect(animationsScript).not.toBeNull()
  })

  test('document has a meta tag with author "Noah Brown"', () => {
    const metaAuthor = document.querySelector('meta[name="author"]')
    expect(metaAuthor).not.toBeNull()
    expect(metaAuthor.getAttribute('content')).toBe('Noah Brown')
  })

  // const $ = require('jquery')
/* jest.mock('jquery', () => {
  const originalModule = jest.requireActual('jquery');
  return {
    ...originalModule,
    ajax: jest.fn()
  };
});

const ajaxCall = require('./ajax.js');

test('ajax call is functional upon button press', () => {
  Set up the DOM
  document.body.innerHTML = `
    <button id="load-image">Load Image</button>
    <div id="footer-content"></div>
  `;

  // Mock the AJAX success callback
  $.ajax.mockImplementation(({ success }) => {
    success();
  });

  // Simulate button press
  const button = document.querySelector('#load-image');
  button.addEventListener('click', ajaxCall);
  button.click();

  // Check if image was loaded
  const img = document.querySelector('#jest-image');
  expect(img).not.toBeNull();
  expect(img.src).toBe('https://www.wallawalla.edu/fileadmin/_processed_/5/6/csm_download-10_f0fb550bce.jpg');
  expect(img.alt).toBe('Downloaded Image');
}); */
})
