---
date: 2019-11-07
title: 'Gnome Control Center on i3wm'
template: post
thumbnail: '../thumbnails/i3wm.png'
slug: running-gnome-control-center-on-i3
categories:
  - Tutorials
  - i3wm
tags:
  - linux
  - i3wm
  - tutorials
---

## Running gnome-control-center in i3 session
Here is the issue: I’m running i3 on the desktop, but still need to have GNOME Evolution to do some system configurations more easily. Evolution is configured in GNOME Controll Center, but unfortunately GNOME control center wouldn’t start properly in a bare i3 session. The solution is easy: env XDG_CURRENT_DESKTOP=GNOME gnome-control-center.

### It’s also worth creating an alias for that command

```terminal
 alias settings='XDG_CURRENT_DESKTOP=GNOME gnome-control-center'
```
