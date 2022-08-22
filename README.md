# Remix-Metrics

This demo application explores using

* [Remix](https://remix.run/), a React-based full-stack web application framework
* [Recharts](https://recharts.org/), a composable charting library built on React components
* [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream), a web standard for streaming data from server to client

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode. Remix will automatically rebuild assets on save.

Open the application at [http://localhost:3000](https://localhost:3000).

## Deployment

### First Time

Follow Fly.io's [Deploy a Remix Application](https://fly.io/docs/getting-started/remix/) instructions to get an account and command-line tools.

### Every Time

Run

```sh
npm run deploy
```

You can run `flyctl info` to get the url and ip address of your server.

## Future Improvements

If you want to contribute, here are some ideas:

* More metric generator functions
* Smooth transitions for the graph visualization
* Summary values for metrics like latest value, mean, median, 95th percentile
* Dashboard that shows summary information for all metrics
* Pause / resume live updates
* Improve unit tests
* Continuous integration & deployment via GitHub actions
* Identify / fix accessibility issues (because [accessibility issues are bugs](https://sheribyrnehaber.com/why-accessibility-bugs-are-a-good-thing-and-how-to-handle-them/))
