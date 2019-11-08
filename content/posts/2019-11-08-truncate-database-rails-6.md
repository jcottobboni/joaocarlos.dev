---
date: 2019-11-07
title: 'Truncate database in Ruby on Rails 6'
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

## Truncate database in Ruby on Rails 6
Insteaed of chaining rails db:drop, rails db:create and rails db:migrate we are finally able to use one commend that will clean databse in case you have to seed it one more time:

```terminal
rails db:truncate_all
```
NOTE: In older version of rails you can always use database_cleaner gem. Thanks to this gem you can run DatabaseCleaner.clean_with :truncation in rails console or create a rake task on your own.
