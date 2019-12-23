let lang = ["fr", "fr-BE", "fr-CA", "fr-CH", "fr-LU"].includes(navigator.languages[0]) ? "fr" : "en";
let automaton;

/**
 * Adds the about section and the content once the page is loaded, runs the cellular automaton
 */
window.addEventListener("load", function() {
  updateAll();

  if(window.innerWidth > 850) {
    automaton = new CellularAutomatonCanvas(document.getElementById("cellularAutomatonCanvas"), 2);
    setTimeout(function () {
      automaton.run(skip=false);
    }, 100);
  }
});


/**
 * Relaunches the cellular automaton
 */
function reRunCellularAutomaton() {
  automaton.run();
}


/**
 * Updates the about section and the content of the page
 */
function updateAll() {
  updateAbout(generalConfigs.aboutSection, lang);
  updateContent(content, lang);
}


/**
 * Updates the about section of the page with the given language
 * @param {LitteralObject} params - Configs of the about section, given in the general_configs.js
 * @param {String} lang - Language, at the moment only "en" or "fr"
 */
function updateAbout(params, lang="en") {
  let container = document.getElementById("about");
  container.innerHTML = createAboutSection(params, lang);
}


/**
 * Updates the content section of the page
 * @param {LitteralObject} params - Content as given in content.js
 * @param {String} lang - Language, at the moment only "en" or "fr"
 */
function updateContent(content, lang) {
  let container = document.getElementById("content");
  container.innerHTML = createContent(content, lang);
}


/**
 * Updates the language global varible with the given language, and updates the page
 * @param {String} newLang - Language to set
 */
function updateLang(newLang) {
  lang = newLang;
  updateAll();
}
