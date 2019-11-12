# Notes

- On the server some routes need to fetch data, so a `fetchInitialData` function is attached to the route object

```js
const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/popular/:id",
    component: Grid,
    fetchInitialData: (path = "") => fetchPopularRepos(path.split("/").pop())
  }
];
```

- That method is invoked on the server using `matchPath` to determine which route is being requested

- The data is passed into the `Grid` component via the `context` prop on `StaticRouter`

```js
import { StaticRouter, matchPath } from "react-router-dom";

...

app.get("*", (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {};

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

    promise
    .then(data => {
      const context = { data };
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );
```

- `Grid` has to be able to access the data it needs in three ways

- 1. using the flag added via Webpack...

```js
plugins: [
  new webpack.DefinePlugin({
    __isBrowser__: "true"
  })
];
```

- 1. (cont.) `Grid` rendered on the server knows to use the data the server has fetched, which is accessed via `props.staticContext.data`

- 2. Once the page is loaded in the browser and `hyrdate` is hooking React up to the HTML, `Grid` will initially try to access the data which the server has posted to the `window`

```js
    res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>SSR with RR</title>
            <script src="/bundle.js" defer></script>
            <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
          </head>
```

- 3. This all works fine for the initial page load from the server, but once we try to navigate anywhere via React Router, the server is not involved and the `fetch` from the server that had initially provided the data is no invoked for the new page's content. Thus, `cDM` in `Grid` fetches the data it needs

  -

```js
class Grid extends Component {
  constructor(props) {
    super(props);

    let repos;
    if (__isBrowser__) {
      repos = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      repos = props.staticContext.data;
    }

    this.state = {
      repos,
      loading: repos ? false : true
    };

    this.fetchRepos = this.fetchRepos.bind(this);
  }

  componentDidMount() {
    if (!this.state.repos) {
      this.fetchRepos(this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchRepos(this.props.match.params.id);
    }
  }

  fetchRepos(lang) {
    this.setState(() => ({
      loading: true
    }));

    this.props.fetchInitialData(lang).then(repos =>
      this.setState(() => ({
        repos,
        loading: false
      }))
    );
  }
```
