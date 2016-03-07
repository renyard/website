#!/bin/bash
rm -rf dist/ || exit 0;
gulp

( cd dist/
  git init
  git config user.name "Travis-CI"
  git config user.email "renyard@users.noreply.github.com"
  git add .
  git commit -m "Deployed to Github Pages"
  git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)
