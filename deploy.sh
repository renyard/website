#!/bin/bash
rm -rf dist/ || exit 0;
npx gulp

( cd dist/
  git init
  git config user.name "Travis-CI"
  git config user.email "renyard@users.noreply.github.com"
  git add .
  git commit -m "Deployed to Github Pages"
  git push --force --quiet "https://${GH_TOKEN}@github.com/renyard/website.git" master:gh-pages > /dev/null 2>&1
)
