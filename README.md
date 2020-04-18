![Address Book CI](https://github.com/mateuszkoncikowski/address-book-app/workflows/Address%20Book%20CI/badge.svg)

# Address Book app

## Solution key takeaways

- Performance: address list re-render performance has been closely monitored when developing the solution. Scrolling and filtering results
  are smooth even with large numbers of items loaded from the user`s endpoint.
- Testing approach: value to effort and confidence are big factors when choosing the testing strategy. Therefore, preferred way of
  testing is to introduce unit testing for pure functions of important code functionalities (`useFilter.spec.js`) and e2e test suite for
  all major functionalities (`addressBook.spec.js`). Also in order to make e2e test faster and more reliable some app adjustments has
  been made (exposing Redux store, usage: `addressBook.spec.js:12`).

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

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
