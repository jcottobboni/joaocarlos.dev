---
date: 2019-09-27
title: 'Setup Barman on Ubuntu'
template: post
thumbnail: '../thumbnails/barman.png'
slug: setup_barman_on_ubuntu
categories:
  - Tutorials
  - PostgreSQL
tags:
  - linux
  - postgresql
  - barman
---

## Why Barman ?

## Continuous Archiving And Point-In-Time Recovery(PITR)
## PostgreSQL Backups
### Logical Backups
- Don't have P.I.T.R (Point In Time Recovery)

### Physical Backups
- Binary Backups
- Copy folder of postgres data
- Backup all data
- Have PITR

### W.A.L (Write Ahead Log)
Store postgres transactions

# Installing Barman on backup-server machine

### Setting up SSH

### Configuring Barman
### Verify Barman Configured Servers
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

## Build a base backup

## Recovery With Barman

### Stop the database
```terminal
$ systemctl stop postgresql

```
### Run the recovery
- Get a list of possible backup spots with
```terminal
$ barman list-backup pg
```

- Get details for the backup you choose with. Note that <backup_id> is the timestamp of the backup.
```terminal
$ barman show-backup pg <backup_id>
```
- Run
```terminal
$ barman recover --remote-ssh-command "ssh -i ~/.ssh/pg -o StrictHostKeyChecking=no postgres@<database_host>" --target-time="<YYYY-MM-DD HH:MM:SS.SSSSSS+00:00>" pg <backup_id> /data/postgresql/9.6/main.
```
This took us about 30 seconds per GB of data.

### Restart the database
Back on the PostgreSQL server, run start
```terminal
$ systemctl start postgresql
```

### Schedule a backup with crontab

Back on the PostgreSQL server, run $ systemctl start postgresql
