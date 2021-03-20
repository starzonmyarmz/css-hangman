const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier")

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("splitPhrase", (data) => {
    const markup = []
    const phrase = data.split('').forEach((char) => {
      markup.push(`<div class="${char}">${char}</div>`)
    })
    return markup.join('')
  })

  eleventyConfig.addFilter("is", (data, letter) => {
    return data.includes(letter)
  })

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles
  })

  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true
      })
      return minified
    }
    return content
  })

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
}
