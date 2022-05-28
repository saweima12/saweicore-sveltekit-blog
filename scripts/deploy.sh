set -e

pnpm run build
pnpm run postbuild
GIT_URL="git@github.com:saweima12/saweima12.github.io.git"
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
git commit -m "deploy at $BUILD_DATE"

# commit
git-ssh -i ~/.ssh/tassis-laptop push -f $GIT_URL master