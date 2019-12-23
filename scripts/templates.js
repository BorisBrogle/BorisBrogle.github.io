/**
 * Returns the html of the about section of the page with the given language
 * @param {LitteralObject} params - Configs of the about section, given in the general_configs.js
 * @param {String} lang - Language, at the moment only "en" or "fr"
 */
function createAboutSection(params, lang) {
  return `
    <div class="item">
      <div>
        <img id="me-image" src="resources/images/${params.image}">
      </div>
      <div class="item-right-part">
        <h1 id="me-title">${params.me}</h1>
        <p id="self-description">${params.myDescription[lang]}</p>
        <p id="links">
          <a href="${params.githubLink}" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>&nbsp;
          <a href="${params.linkedinLink}" target="_blank"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
        </p>
      </div>
    </div>
  `
}


/**
 * Returns the html of an item given its parameters and the given language
 * @param {LitteralObject} params - Parameters of the item, given in content.js
 * @param {String} lang - Language, at the moment only "en" or "fr"
 */
function createItem(params, lang) {
  return `
    <div class="item item-in-list">
      <a class="item-image" href="${params.link}" target="blank">
        <img src="resources/images/${params.imagePath}">
      </a>
      <div class="item-right-part">
        <h3 class="item-title">
          <a href="${params.link}" target="blank">${params.title[lang]}</a>
          <span class="item-date">${params.date}</span>
        </h3>
        <p class="item-description">${params.description[lang]}</p>
      </div>
    </div>
  `;
}


/**
 * Returns the html of a category given its parameters and the given language
 * @param {LitteralObject} params - Parameters of the category, given in content.js
 * @param {String} lang - Language, at the moment only "en" or "fr"
 */
function createCategory(params, lang) {
  let items = ``;
  params.content.forEach((item) => {
    if(Object.entries(item).length > 0) {
      items+=createItem(item, lang);
    }
  });

  return `
    <div class="category">
      <h2 class="category-title"><i class="fa fa-chevron-right fa-xs" style="font-size:0.7em"></i> ${params.categoryName[lang]}</h2>
      ${items}
    </div>
  `;
}


/**
 * Returns the html of the whole content section given the parameters and the language
 * @param {LitteralObject} params - Parameters of the content section, given in content.js
 * @param {String} lang - Language, at the moment only "en" or "fr"
 */
function createContent(params, lang) {
  let categories = ``;
  params.forEach((category) => {
    if(Object.entries(category).length > 0) {
      categories+=createCategory(category, lang);
    }
  });

  return `${categories}`
}
