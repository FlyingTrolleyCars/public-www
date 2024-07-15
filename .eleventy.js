const image = require('@11ty/eleventy-img');
const pluginSEO = require("eleventy-plugin-seo");
const pluginImage = require("./.eleventy.image.js");

const stringify = require('javascript-stringify').stringify;
const markdownIt = require('markdown-it');

module.exports = function(eleventyConfig) {
  // From: https://github.com/artstorm/eleventy-plugin-seo
  const seo = require("./src/seo.json");
  eleventyConfig.addPlugin(pluginSEO, seo);

  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.setLibrary('md', markdownIt({
    html: true,
    linkify: true
  }));

  eleventyConfig.setBrowserSyncConfig({ ghostMode: false });

  // our plugins
  eleventyConfig.addPlugin(pluginImage);
  
  /* Build the collection of posts to list in the site
     - Read the Next Steps post to learn how to extend this
  */
//   eleventyConfig.addCollection("posts", function(collection) {
//     const coll = collection
//       .getFilteredByTag("posts");

//     // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
//     for (let i = 0; i < coll.length; i++) {
//       const prevPost = coll[i - 1];
//       const nextPost = coll[i + 1];

//       coll[i].data["prevPost"] = prevPost;
//       coll[i].data["nextPost"] = nextPost;
//     }

//     return coll;
//   });

//   eleventyConfig.addFilter('console', function(value) {
//     const output = stringify(value, null, "  ", { maxDepth: 3 });
//     console.log(output);
//     return '';
//   });

  return {
    // Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid",
		],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

    dir: {
      input: "src",
      includes: "../_includes",  // default: "_includes"
      data: "../_data",          // default: "_data"
      output: "build"
    },
  };
};

