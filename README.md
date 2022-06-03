# spec-builder-client

## Overview

The jolt-builder-client (or jolt spec builder or whatever I land on for a name :|) is a tool that facilitates the building of jolt specs by abstracting the jolt
language behind clearly named UI elements and focusing in on the parts of jolt spec objects that we really need to
edit. <come back and clarify this explanation>

## Terms

### Jolt Doc Array

The contents of the array that makes up all of the jolt steps.

![jolt doc array](./readme_attachments/jolt-doc-array.png)

### Jolt Document (joltDoc)

The entire contents of a single jolt step.

![jolt doc](./readme_attachments/jolt-doc.png)

### Jolt Spec

The contents of the `spec` property in a jolt doc.

![jolt spec](./readme_attachments/jolt-spec.png)

## Objectives

### MVP

- [x] translate an existing jolt document into a data structure that can be represented in customizable UI blocks
- [x] translate the customizable UI blocks back into valid jolt syntax
- [x] submit data for transformation on blur of UI components
- [ ] Delete blocks
- [ ] Reorder blocks
- [ ] Disable/enable blocks
- [ ] validate jolt built from UI blocks
- [~] create UI blocks that represent each of the stock jolt operations with tools that make understanding and building those blocks easier
- [ ] allow for reordering of blocks
- [ ] allow for disabling of blocks
- [x] given an example input structure, quickly run transformations with given UI blocks and immediately show output object
- [ ] add tooling and UI hints for jolt specific symbols to give the user a hint of what the symbol would be referring to in the example input
- [ ] create domain specific transformations as stock blocks

### Passed MVP

- [ ] Load jolt docs directly from database
- [ ] Save jolt docs as new versions in database
- [ ] pull an example product from the database to use by product id
- [ ] create side by side comparison layout for input and output
- [ ] conditionally include blocks based on a configuration object (the idea julie had)
- [ ] pull the menu buttons out to a list, move them into the domain/operations/... directories, and make their population dynamic so that the button's presence
  is dependent on the domain operation pieces being there.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
