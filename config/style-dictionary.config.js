import StyleDictionary from 'style-dictionary'

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'gfk',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: ':root'
          }
        }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [
        {
          destination: 'tokens.mjs',
          format: 'javascript/esm'
        }
      ]
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested'
        }
      ]
    }
  }
})

await sd.buildAllPlatforms()
