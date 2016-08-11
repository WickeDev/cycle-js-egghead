import Rx from 'rx'
import {run} from '@cycle/rx-run'
import {button, h1, h4, a, div, makeDOMDriver} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'

// DOM read effect: button clicked
// HTTP write effect: request sent
// HTTP read effect: response received
// DOM write effect: data displayed

function main(sources) {
  const clickEvent$ = sources.DOM
    .select('.get-first').events('click');

  const request$ = clickEvent$.map(() => {
    return {
      url: 'http://jsonplaceholder.typicode.com/users/1',
      method: 'GET',
    };
  });

  const response$$ = sources.HTTP.response$$
    .filter(response$ => response$.request.url ===
    'http://jsonplaceholder.typicode.com/users/1');

  // request$: r
  // response$$: a, b
  // ------------r------------------r---------------------
  //            └----a--          └----b--

  // flatten, switch, mergeAll
  const response$ = response$$.switch();
  const firstUser$ = response$.map(response => response.body)
    .startWith(null);

  return {
    DOM: firstUser$.map(firstUser =>
      div([
        button('.get-first', 'Get first user'),
        firstUser === null ? null : div('.user-details', [
          h1('.user-name', firstUser.name),
          h4('.user-email', firstUser.email),
          a('.user-website', {href: firstUser.website}, firstUser.website)
        ])
      ])
    ),
    HTTP: request$,
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
};

run(main, drivers);
