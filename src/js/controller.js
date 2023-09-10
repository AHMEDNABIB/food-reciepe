import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    console.log(model.state.search.results);
  } catch (error) {}
};



const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandleSearch(controlSearchResults)
};
init();

// ['hashchange', 'load'].forEach(ev => { window.addEventListener(ev, showRecipe) } );

// const loadEvent = ['hashchange', 'load'];

// loadEvent.forEach(ev => window.addEventListener(ev, controlRecipe));
