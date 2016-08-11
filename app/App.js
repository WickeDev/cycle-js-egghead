import xs from 'xstream';
import {run} from '@cycle/xstream-run';
import {makeDOMDriver, h1} from '@cycle/dom';
import {html} from 'snabbdom-jsx';

function main() {
  return {
    DOM: xs.periodic(1000).map(i =>
      <h1>{`${i} seconds elapsed`}</h1>
    )
  };
}

const drivers = {
  DOM: makeDOMDriver('#app')
};

run(main, drivers);
