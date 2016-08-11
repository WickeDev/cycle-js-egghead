import Rx from 'rx'
import {run} from '@cycle/rx-run'
import {h1, span, makeDOMDriver} from '@cycle/dom'

// Logic (functional)
function main(sources) {
  const mouseover$ = sources.DOM.select('span').events('mouseover');
  const sinks = {
    DOM: mouseover$
      .startWith(null)
      .flatMapLatest(() =>
        Rx.Observable.timer(0, 1000)
          .map(i =>
            h1({style: {background: 'red'}}, [
              span([
                `Seconds elapsed: ${i}`
              ])
            ])
          )
      ),
    Log: Rx.Observable.timer(0, 2000).map(i => 2 * i),
  };
  return sinks;
}

// Effects (imperative)
function consoleLogDriver(msg$) {
  msg$.subscribe(msg => console.log(msg));
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  Log: consoleLogDriver,
};

run(main, drivers);

