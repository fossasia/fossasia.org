git config --global push.default simple
git config --global user.email "travis"
git config --global user.name "Travis CI"
git remote rm origin
git remote add origin git@github.com:fossasia/fossasia.org.git
if [ "$TRAVIS_PULL_REQUEST" != "false" ]
then git clone https://github.com/fossasia/fossasia.org.git out
cd out
git fetch https://github.com/fossasia/fossasia.org.git refs/pull/${TRAVIS_PULL_REQUEST}/merge:${TRAVIS_PULL_REQUEST}
git checkout $TRAVIS_PULL_REQUEST
python j2build.py
echo "PR is ready to merge!"
fi

if [ "$TRAVIS_PULL_REQUEST" == "false" ]
then git clone https://github.com/${TRAVIS_REPO_SLUG}.git out
git checkout $TRAVIS_BRANCH
cd out
python j2build.py
git add .
git commit -m 'Travis CI: Build new sitemap from template'

touch id_rsa
echo "$travis_deploy_key" > id_rsa
chmod 400 id_rsa
yes \r | (ssh-agent bash -c "ssh-add id_rsa; git push origin")
echo "Finished Build"
fi

