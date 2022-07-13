set -e

pnpm run build
pnpm run postbuild

BUILD_DATE=$(date +"%Y%m%d%H%M")

# go into build directory
cd ./build/
# custom domain
echo 'saweicore.com' > CNAME

# create no jekyll
touch .nojekyll

# git process
git init 
git add -Af

# commit
if [ -z "$DEPLOY_TOKEN" ]; then
    GIT_URL="git@github.com:saweima12/saweima12.github.io.git"
    git commit -m "deploy at $BUILD_DATE"
    git-ssh -i ~/.ssh/cctips push -f $GIT_URL master

else
    GIT_URL="https://saweima12:$DEPLOY_TOKEN@github.com/saweima12/saweima12.github.io.git"
    git config --global user.name "Saweima"
    git config --global user.email "saweima12@gmail.com"
    git commit -m "deploy by github action at $BUILD_DATE"

    git push -f $GIT_URL master
fi

