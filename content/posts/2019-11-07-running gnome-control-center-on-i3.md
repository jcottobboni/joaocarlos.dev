---
date: 2019-09-27
title: 'Setup Barman on Ubuntu'
template: post
thumbnail: '../thumbnails/terminal.png'
slug: running-gnome-control-center-on-i3
categories:
  - Tutorials
  - I3
tags:
  - linux
  - i3
  - tutorials
---

## Running gnome-control-center in i3 session
Here is the issue: I’m running i3 on the desktop, but still need to have GNOME Evolution to do some system configurations more easialy. Evolution is configured in GNOME Controll Center, but unfortunately GNOME control center wouldn’t start properly in a bare i3 session. The solution is easy: env XDG_CURRENT_DESKTOP=GNOME gnome-control-center.

### It’s also worth creating an alias for that command

```terminal
 alias settings='XDG_CURRENT_DESKTOP=GNOME gnome-control-center' 
```
