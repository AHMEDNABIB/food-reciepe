import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultView from './views/resultView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Loading recipe
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
    //  controlServings();
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

    // 4 Render initial pagination
    paginationView.render(model.state.search);
  } catch (error) {}
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};


const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.render(model.state.recipe);
};





const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandleSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
 
};
init();

// ['hashchange', 'load'].forEach(ev => { window.addEventListener(ev, showRecipe) } );

// const loadEvent = ['hashchange', 'load'];

// loadEvent.forEach(ev => window.addEventListener(ev, controlRecipe));
