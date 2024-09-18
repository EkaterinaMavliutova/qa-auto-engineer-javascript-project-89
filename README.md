#Chatbot Widget testing project at Hexlet:
[![Actions Status](https://github.com/EkaterinaMavliutova/qa-auto-engineer-javascript-project-89/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/EkaterinaMavliutova/qa-auto-engineer-javascript-project-89/actions) [![CI](https://github.com/EkaterinaMavliutova/qa-auto-engineer-javascript-project-89/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/EkaterinaMavliutova/qa-auto-engineer-javascript-project-89/actions/workflows/ci.yml) [![Test Coverage](https://api.codeclimate.com/v1/badges/6021cbabef1ba9e8af5c/test_coverage)](https://codeclimate.com/github/EkaterinaMavliutova/qa-auto-engineer-javascript-project-89/test_coverage)

**Chatbot Widget** is an npm package that exports a function with chat configuration passed to it as a parameter and returns a React component that represents the UI part. Configuration determines the user's interaction with the Chatbot Widget by describing various chatbot states as the chat messages and possible transitions between them as buttons for the user to click.

Testing was conducted using React Testing Library as a testing library and Jest as a test runner. Also, jest-dom library was used to get access to the additional Jest matchers to test the state of the DOM.

Testing covers the following cases:
* How the widget renders in various states.
* Transitions between states.
* How the widget integrates into another app.
* How the widget corresponds with the passed chat configuration.
* How it handles configuration errors.

## Installation
>note: the current version of Chatbot Widget was tested using Node.js v22.5.1
* Clone this repository.
* Install required dependencies:
```
npm ci
```

## How to run tests
* Run Chatbot Widget:
```
npm run dev
```
* Run tests:
```
npm test
```

## Chatbot Widget recordings on asciinema.org
### User interaction example: