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

# Installing Barman on backup-server machine

### Setting up SSH

### Configuring Barman
### Verify Barman Configured Servers

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
