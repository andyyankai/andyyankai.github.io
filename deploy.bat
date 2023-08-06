rem npm run build

rem cd dist

rem echo yank.ai > CNAME

git init
git add -A
git commit -m deploy

git push -f https://github.com/andyyankai/andyyankai.github.io.git master

cd -
