# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://github.com/<USERNAME>/<REPO>
git push -f https://github.com/Jerry-Yeh/Travel-Guide master:gh-pages

cd ..