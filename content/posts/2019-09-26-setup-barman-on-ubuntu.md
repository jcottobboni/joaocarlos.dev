---
date: 2019-09-26
title: 'Setup Barman on Ubuntu'
template: post
thumbnail: '../thumbnails/barman.png'
slug: setup-barman-on-ubuntu
categories:
  - Tutorials
  - PostgreSQL
tags:
  - linux
  - postgresql
  - barman
---


### Troubleshooter

#### "WAL archive: FAILED (please make sure WAL shipping is setup)"

we must have :INCOMING_WALS_DIRECTORY same value with :incoming_wals_directory returned by command barman show-server pg

bash util to check

```terminal
barman@backup $ barman show-server pg | grep incoming_wals_directory
# output1
# > incoming_wals_directory: /var/lib/barman/pg/incoming

postgres@pg $ cat /etc/postgresql/10/main/postgresql.conf | grep archive_command
# output2
# > archive_command = 'rsync -a  %p  barman@staging:/var/lib/barman/pg/incoming/%f'
```

#### Paths are ok but the error persists

barman check tries to confirm that archiving is set up correctly by asserting that there's actually something in the archive. However, WAL segments are generally only archived once they're filled up, and if your server is idle, this is never going to happen.

To work around this, Barman provides a command to force a segment switch, wait for the completed WAL to show up, and then archive it immediately:

So execute:

```bash
barman switch-xlog --force --archive replica
```
