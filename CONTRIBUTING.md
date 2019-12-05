## Development Best Practices at FOSSASIA
## Culture and Communication
Please adapt your language to non-native English speakers and be super friendly. Remember we are an international community with contributors mainly from Asia and Europe. We are not used to swearing and will mostly understand words literally. At all times ensure your tone stays appropriate and friendly in the FOSSASIA community.
Stay modest. Sometimes newcomers already have an amazing knowledge in some areas. Still remember, it is no reason to be arrogant. Even the best developer does not know everything.
Be nice and welcoming. Why not add “please” in an issue or a comment “Thank you” in a pull request if someone did a good job? Show your appreciation for the good work of your co-developers.
If you are involved in a topic you don’t understand yet, try to learn yourself as much as possible from public channels (wikipedia, stackoverflow) but also do not hesitate to ask questions to other developers.
Communication Channels
Every project at FOSSASIA has its own channels. Many projects use Gitter, some Slack or IRC. Usually you will find information of the main communication channels of a project in the Readme.md.

While we are a community of Open Source and Free Software developers we still reserve our right to use whatever tools we deem necessary to help us to achieve our goal of developing the best possible Open Technologies – software and hardware. It is one step at a time 🙂

Private and Public Chat or Issue Tracker
Chat is a great way to connect with other contributors, but not all contributors are there all the time (consider time difference and personal schedules) and they are not always available to chat. Chat tends to be unstructured and with lots of people in a room there are often a number of threads. Therefore chat is great for help on setup issues and things where you got stuck.

Do not use chat for feature requests and detailed discussions on issues. These things are best for the issue tracker, where people from different timezones can join and where a focused conversation on one specific topic can happen.

Some people try to overcome the unstructured chats by switching to private communication. This shuts out other contributors who might have similar issues. A result I often observed is also, that contributors will bring up arguments in discussions like “I have discussed this already with xyz privately and he agrees”. Other contributors have not seen this discussion if it has not been taken place in public and we haven’t seen the arguments. We don’t know if xyz really agrees or if it was misunderstood. Private conversations are not transparent. Surely, there are cases where private chat is needed, e.g. for specific deployment questions of projects, but whenever you talk about development, please switch to public chat or open an issue.

Feature Requests and Bug Reports
Some newcomers are not accustomed to issue trackers and might try to inform developers on the mailing list, chat or even write private emails about bugs and features, but the right place to do this is: The issue tracker of a project.
Any bug or feature, please open an issue in the issue tracker right away and indicate if you want to work on it yourself.
Please include all relevant information when you submit an issue and wherever possible a link, information about the code that has issues and a screenshot.
When you file a bug report on the issue tracker, make sure you add steps to reproduce it. Especially if that bug is some weird/rare one.
Join Development
Before you join development, please set up the project on your local machine, run it and go through the application completely. Press on any button you can find and see where it leads to. Explore. (Don’t worry. Nothing will happen to the app or to you due to the exploring. Only thing that will happen is, you’ll be more familiar with what is where and might even get some cool ideas on how to improve various aspects of the app.).
If you would like to work on an issue, drop in a comment at the issue. If it is already assigned to someone, but there is no sign of any work being done, please free to drop in a comment so that the issue can be assigned to you if the previous assignee has dropped it entirely.
Commits/Pull Requests
All pull requests need to be associated to an issue.
All PRs need to be assigned to the person working on it.
If an issue cannot be completed in less than a day, it should be broken up into multiple issues.
Make pull requests from your own forks (even if you have write rights to the repository, do not create new branches, develop on your own branches).
State the actual change or enhancement in the commit message of PRs (do not just state “Fixes issue #123”).
Add the issue number into the description (this helps to speed up reviews as reviewers can simply click to get more info in the issue itself).
Write clear meaningful git commit messages (Do read http://chris.beams.io/posts/git-commit/).
Match pull requests with issues and make sure your pull requests description contains GitHub’s special keyword references that automatically close the related issue when the pull request is merged. (More info at https://github.com/blog/1506-closing-issues-via-pull-requests).
When you make very minor changes to a pull request of yours (like for example fixing a failing travis build or some small style corrections or minor changes requested by reviewers) make sure you squash your commits afterwards so that you don’t have an absurd number of commits for a very small fix (Learn how to squash at https://davidwalsh.name/squash-commits-git).
Add a screenshot if you changed anything in the UI of a project. When you’re submitting a pull request for a UI-related issue, please add a screenshot of your change or a link to a deployment where it can be tested out along with your pull request. It makes it much easier for the reviewers and helps to speed up the process. You’ll also get reviews quicker.
Add a link to your deployment of the project, where reviewers can check out what you have changed (especially for smaller changes this is very helpful as the reviewer might not even need to set up the system itself and test it. Again this speeds up the review process a lot).
Always ensure CI and tests are successful.
Help to resolve merge conflicts (especially if there are several PRs at the same time, merge conflicts are common. Help the reviewers and solve merge conflicts to speed up the process.).
Merging Pull Requests should only happen if at least two contributors reviewed the PR and approved it.
Scope of Issues and Commits
Stay focused on the issue and its specifics: Sometimes it is tempting to do more changes in a pull request and simply add a nice little feature after mentioning it in the issue tracker. Please do not do this. Contributors will look at the title of issues usually to check if it is relevant for them. For example, if an issue is about changing a font, do not also change the color even if this seems like small change to you. Many projects have a design template and standard colors etc. that they want to achieve. So your changes might need to be discussed in a bigger setting even if they seem small to you. Same applies to many other areas.
Do only the changes in a pull request that are mentioned in the issue. Do not change anything else without ever mentioning it (remember match issues with pull requests).
Branch Policies
Most FOSSASIA Projects have:

a development branch (which is the working branch. Please commit to this branch.) and
a master branch (which is the stable branch).
Some projects also keep additional branches e.g.:

gh-pages for documentation purposes (often autogenerated from md-files in docs folder)
apk branches for Android apps (often autogenerated with travis).
### Getting Started
Newcomers are sometimes afraid to make a pull request. Don’t be! It is the responsibility of reviewers to review them. And Git is a beautiful tool when it comes to reverting pull requests with errors.
In simple issues keep it simple and “simply” contribute, e.g. in an issue “change the color of the button from green to red”, there is no need to mention and ask “here is a screenshot where I changed the color to red. Should I make a PR now?”. Just make the pull request and wait for the feedback of the reviewer.
Take on responsibility early and help to review other contributions. Even though you do not have write access in a repository you can already help to review other commits.
### Documentation
Please ensure you provide information about your code and the functioning of your app as part of every code contribution.
Add information on technologies and the code into the code itself and into documentation files e.g. into the Readme.md or /docs folder. Documentation is not a thing that should be done at the end after a few weeks or months of coding! Documentation is a continuous effort at every step of software development.
If you add new libraries or technologies add information about them into the Readme file.
If you implement a different design or change the css in a web project, please add information to the design specifications/template. If there are not any design specifications in the project yet, why not start them and add a section into the Readme.md to start with?
Always help to keep documentation up to date and make it easy for new contributors to join the project.
