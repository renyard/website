---
layout: post
title:  "Multiple Checkouts With Git Worktree"
excerpt: "Manage multiple Git checkouts with the worktree command"
image: tree.jpg
author: "Ian Renyard"
date: 2016-02-05
categories: git
---

I regularly find the need to switch branches in my local Git repos for code reviews or to work on another feature or bug within a project. In the past, I would have either cloned a new copy of the repo or stashed any changes which were not ready to commit. Neither of these is ideal as a new copy is wasteful, as checking out a large repo can take a while and stashing changes is quite disruptive to your current context.

## Worktree

Git 2.5 introduced the `worktree` command, which can be used to checkout multiple working trees from the same local repo. In short this gives you as many different branches as you like checked out to multiple directories at the same time, all pointing to the same local Git repo. This means no wasting disk space on multiple copies of Git meta data and best of all, each worktree is instantly aware of any changes committed from another worktree.

### Usage

#### Code Reviews

For this example, let's assume the original checkout is on a feature branch that I'm working on and a colleague asks me to review a feature before it's merged.

~~~
$ git worktree add newfeature -b newfeature origin/newfeature
~~~

This will create a new directory `newfeature` in the root of the existing repo, containing the `newfeature` branch from origin. At this point, the new feature can be reviewed without loosing the context of the `develop` branch or even any open files.

Once the review is complete, the `newfeature` directory can be deleted and the worktree pruned:

~~~
$ rm -rf newfeature
$ git worktree prune
~~~

#### Bug Fixing

For me, the other major use case of the `worktree` command is for bug fixing. In the following example, the original checkout is on a feature branch and we want to start a new branch for a bugfix:

~~~
$ git worktree add bugfix -b bugfix develop
$ cd bugfix
~~~

In this command, a new directory called `bugfix` is created on a new branch with the same name. The last parameter tells Git to base the new branch on the existing `develop` branch.

We then cd into the bugfix directory and can implement the bug fix. Once the bugfix is committed, the branch is ready to be merged back to `develop`:

~~~
$ git commit -a
$ git checkout develop
$ git merge bugfix
~~~

The worktree can then be removed and the branch deleted:

~~~
$ git branch -d bugfix
$ cd ../
$ rm -rf bugfix
$ git worktree prune
~~~

At the time of writing, `worktree` is still quite new and as such is considered experimental. It also does not yet support the full functionality of Git, such as `submodules`, in multiple checkouts and the [documentation suggests a few features which could be added in the future](https://git-scm.com/docs/git-worktree/2.7.0#_bugs).

Even with the above limitations, `worktree` can be useful when a quick fix needs to be made or for reviewing another branch.
