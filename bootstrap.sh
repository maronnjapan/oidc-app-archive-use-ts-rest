#!/bin/zsh
npm run compile &&  (npm run watch & npm run start:app & npm run start:dev:api)
