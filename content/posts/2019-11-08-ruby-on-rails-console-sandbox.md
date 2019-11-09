---
date: 2019-11-08
title: 'Ruby On Rails console sandbox mode'
template: post
thumbnail: '../thumbnails/ruby.png'
slug: truncate-database-rails-6
categories:
  - Tutorials
  - Rails
tags:
  - tutorials
  - rails
---

## Ruby On Rails console sandbox mode
If you want to perform some data migration/modification on production and you want to be sure that it will not break anything you can always perform a test run using rails console with --sandbox flag.

After entering console with

```terminal
rails console production --sandbox
```

you will get following information

```terminal
Loading production environment in sandbox (Rails X.X.X)
Any modifications you make will be rolled back on exit
```
You can now safely perform data migration and check if everything is OK.
