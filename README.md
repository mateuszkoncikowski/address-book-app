[![Address Book CI](https://github.com/mateuszkoncikowski/address-book-app/workflows/Address%20Book%20CI/badge.svg)](https://github.com/mateuszkoncikowski/address-book-app/actions)

# Address Book app

## Post review actions

- Improved UI experience
  - Profile icon changed to Settings icon
  - Language selector changed to Nationality selector
- Enable selection of multiple nationalities
- Introduce default path to handle the 404 scenario.
- Add debounce and memoize features to search input
- Introduce Redux Dev Tools

## Review discussion points

#### Reviewer comment:

`Only one file is covered with unit tests, parts are covered with e2e tests and this combination is not good. Low level unit tests are much more important than integration or even e2e tests, this is a great example for an ice cream cone testing antipattern. https://www .browserstack.com/guide/testing-pyramid-for-test-automation.`

#### Author's comment:

The Testing Pyramid is a concept which has been coined probably more than 10 years ago. A lot has changed since then. The tools got
better. The cost/speed/value ratios with it. When writing tests I value confidence over everything else. Kent C. Dodds described
this in one of his post: https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests with this conclusion:

_Every level comes with its own trade-offs. An E2E test has more points of failure making it often harder to track down what code
caused the breakage, but it also means that your test is giving you more confidence. This is especially useful if you don't have as much
time to write tests. I'd rather have the confidence and be faced with tracking down why it's failing, then not having caught the problem
via a test in the first place._

To summarise, choosing a testing strategy and approach is more complicated than a single article. It highly depends on the context
(business context, tech stack, team skills and preferences etc). It should be a subject to a wide team debate because at the end is a
team effort ;-) The solution I've provided is my personal 5 cents into the discussion.

#### Reviewer comment:

`Fetching and what's more important storing users list is excluded from redux, it's stored in a component state and is handled with a custom hook.`

#### Author's comment:

In my opinion storing users list in redux in this simple app is a step which increases the app complexity without any direct value gained
. In the app context I don't see it as a global data but rather specific to the user's `<InfiniteList />` component.

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
