# Panko

Your own productivity assistant, built with [Angular CLI](https://github.com/angular/angular-cli).

## Getting started

With Node.js and the latest version of Angular installed, clone this repository and run ```npm install``` to install the project's dependencies.

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