---
date: 2019-08-21
title: 'Install Ruby Old Versions with Rbenv'
template: post
thumbnail: '../thumbnails/ruby.png'
slug: ruby_old_versions_with_rbenv
categories:
  - Tutorials
  - Ruby
tags:
  - ruby
  - rbenv
  - rails
---

As far as I know, (and tested) Ruby versions < 2.4 requires libssl1.0, while >2.4 libssl1.1+. The two libssl packages conflict with each other, so you can't have both of them, so I had to juggle the libs in order to install the required ruby version. To make things even funnier (or more complicated), Ruby <2.4 tends to require gcc-6 instead of the current upstream version (which is 7).
So, usually it looks like that:

### for ruby <2.4

```terminal

apt install libssl1.0-dev
CC=$(which gcc-6) rbenv install `version`
```

### for ruby >2.4

```terminal
apt install libssl-dev
rbenv install `version`
```
