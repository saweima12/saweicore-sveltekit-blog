set -e

pnpm run build
GIT_URL="git@github.com:saweima12/saweima12.github.io.git master"
BUILD_DATE=$(date +"%Y%m%d%H%M")

# go into build directory
cd ./build/
# custom domain
echo 'saweicore.com' > CNAME

# create no jekyll
touch .nojekyll

# git process
git init 
git add -A
git commit -m "deploy at $BUILD_DATE"


git-ssh -i ~/.ssh/tassis-laptop push -f $GIT_URL