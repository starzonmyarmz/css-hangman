module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/styles.css")

  eleventyConfig.addFilter("splitPhrase", (data) => {
    const markup = []
    const phrase = data.split('').forEach((char) => {
      markup.push(`<div class="${char}">${char}</div>`)
    })
    return markup.join('')
  })

  eleventyConfig.addFilter("is", (data, letter) => {
    return data.includes(letter) ? 'data-y' : 'data-n'
  })

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
}
