import Rx from 'rxjs'
import {run} from '@cycle/rx-run'

// Logic (functional)
function main(source) {
  const click$ = source.DOM;
  const sinks = {
    DOM: click$
      .startWith(null)
      //.flatMapLatest(() =>
      .switchMap(() =>
        Rx.Observable.timer(0, 1000)
          .map(i => `Seconds elapsed ${i}`)
      ),
    Log: Rx.Observable.timer(0, 2000).map(i => 2 * i),
  };
  return sinks;
}


// source: input (read) effects
// sink: output (write) effects

// Effects (imperative)
function DOMDriver(text$) {
  text$.subscribe(text => {
    const container = document.querySelector('#app');
    container.textContent = text;
  });
  const DOMSource = Rx.Observable.fromEvent(document, 'click');
  return DOMSource;
}

function consoleLogDriver(msg$) {
  msg$.subscribe(msg => console.log(msg));
}

// bProxy = ...
// a = f(bProxy)
// b = g(a)
// bProxy.imitate(b)

/*function run(mainFn, drivers) {
  const proxySources = {};
  Object.keys(drivers).forEach(key => {
    proxySources[key] = new Rx.Subject();
  });
  const sinks = mainFn(proxySources);
  Object.keys(drivers).forEach(key => {
    const source = drivers[key](sinks[key]);
    source.subscribe(x => proxySources[key].next(x));
  })
}*/

const drivers = {
  DOM: DOMDriver,
  Log: consoleLogDriver,
};

run(main, drivers);
