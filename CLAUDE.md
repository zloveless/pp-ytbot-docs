# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Documentation project for `ytbot` under the `@pseudoposse` organization. Uses Yarn 4 (Berry) as the package manager.

## Package Manager

This project uses Yarn 4 Berry (`packageManager: yarn@4.14.1`). Always use `yarn` — never `npm` or `npx`.

```sh
yarn install       # install dependencies
yarn <script>      # run a package.json script
```

## Conventions

- 2-space indentation, LF line endings, UTF-8 (enforced by `.editorconfig`)
