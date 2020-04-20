[![Address Book CI](https://github.com/mateuszkoncikowski/address-book-app/workflows/Address%20Book%20CI/badge.svg)](https://github.com/mateuszkoncikowski/address-book-app/actions)

# Address Book app

## Solution key takeaways

- Performance: address list re-render performance has been closely monitored when developing the solution. Scrolling and filtering results
  are smooth even with large numbers of items loaded from the user`s endpoint.
- Testing approach: value to effort and confidence in results are big factors when choosing the testing strategy. Therefore, preferred
  way of testing is to introduce unit testing for pure functions of important code functionalities (`useFilter.spec.js`) and e2e test
  suite for all major functionalities (`addressBook.spec.js`). Also in order to make e2e test faster and more reliable some app
  adjustments has been made (exposing Redux store, usage: `addressBook.spec.js:12`).
- Simple CI pipeline has been created using Github Actions with test execution included.

## Run locally:

1. `npm run install`
2. `npm run start`

## Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test:unit:dev`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:unit:ci`

Launches the test runner in the non-interactive watch mode.<br />

### `npm run test:cypress:dev`

Launches the e2e test runner in the open mode. Useful in on-going local development<br />

### `npm run test:cypress:ci`

Launches the e2e test runner in the headless mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
