# React-Three-Fiber-Boilerplate (Webpack Version)

The Create React App / React Scripts / CRA is no longer maintained.

If using them, when running `npm install`, you will get a warning indicating many vulnerabilities.

It is debatable whether this is a real issue or not since you are only developing locally.

However, this `webpack` branch is set up similar to how Create React App does it.

- It serves the dev version on port 3000
- It auto opens the browser at address http://localhost:3000
- It enables Hot Module Reloading (HMR)
- It serves from the `public` folder
- It indicates 0 vulnerabilities when running `npm install`, at time when I developed this branch.

## Install

```
git clone https://github.com/Sean-Bradley/React-Three-Fiber-Boilerplate.git
cd React-Three-Fiber-Boilerplate
git checkout webpack
npm install
npm start
```

Your default browser should open http://localhost:3000/ automatically for you.

You should see a green wireframe cube.

You can use this boilerplate branch for the React Three Fiber Course at [https://sbcode.net/react-three-fiber/](https://sbcode.net/react-three-fiber/)

Course Coupons : [https://sbcode.net/coupons](https://sbcode.net/coupons)

## Build Production

```
npm run build
```

Copy all files in the `public` folder to your web server.

See this page [https://sbcode.net/react-three-fiber/host-github-pages/](https://sbcode.net/react-three-fiber/host-github-pages/) for a how to serve your generated site on GitHub pages
