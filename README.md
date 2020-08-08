# PankoApp

Your own productivity assistant that makes recommendations on observed behaviors over time, based on research-backed claims. Built with an intuitively streamlined interface.

PankoApp is designed to be 100% scalable and implements continuous integration with [GitHub Actions](https://github.com/thejykim/pankoapp/actions). The project's primary stack is:

- Angular 6
- Node.js
- Google Cloud Storage

Read the full list of libraries and APIs used [here](https://pankoapp.com/about).

## Getting started

With Node.js and the latest version of Angular installed, clone this repository and run `npm install` to install the project's dependencies.

## Data storage

The application uses Firestore for data storage. Data collected can be summarized in two parts:

### Per user

```
boardsCreated (number)
completedTimes (array of numbers)
creationData (array of maps)
 => date (number)
 => mood (number)
tasksCreated (number)
tasksCompleted (number)
```

### Per board

```
priority (number)
tasks (array of maps)
 => completed (number)
 => description (string)
 => isDone (bool)
 => label (string)
```