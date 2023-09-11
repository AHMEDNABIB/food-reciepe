import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultView from './views/resultView.js';
import searchView from './views/searchView.js';

// if (module.hot) {
//   module.hot.accept();
  
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Loading recipe
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    // console.log(model.state.search.results);

    // Render all results
    // resultView.render(model.state.search.results);
    
    // Render Per Page
    resultView.render(model.getSearchResultsPage());

  } catch (error) {}
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandleSearch(controlSearchResults);
};
init();

// ['hashchange', 'load'].forEach(ev => { window.addEventListener(ev, showRecipe) } );

// const loadEvent = ['hashchange', 'load'];

// loadEvent.forEach(ev => window.addEventListener(ev, controlRecipe));
