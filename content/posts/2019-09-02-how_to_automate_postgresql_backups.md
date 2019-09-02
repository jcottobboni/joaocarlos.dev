---
date: 2019-09-02
title: 'How to Automate PostgreSQL Backups'
template: post
thumbnail: '../thumbnails/postgresql.png'
slug: how_to_automate_postgresql_bakcups
categories:
  - Tutorials
  - PostgreSQL
  - Bash
tags:
  - linux
  - postgresql
  - bash
---

## Required reading
[How to provide password for your postgresql scripts](https://joaocarlos.dev/how_to_provide_password_for_your_postgresql_scripts/)

[How to send messages to slack in bash script](https://joaocarlos.dev/how-to-send-messages-slack-in-bash-scripts/)

## Let's go then
Recently i need to build some bash scripts to implement a automated backups for my production enviroment with PostgreSQL. I develop a script for backup database in production enviroment and save the backup on staging server for later restore it. Using cronjob you habe an automation of backups an restores.
The scripts produces to formats of backups:

- Plain Backup: This produces a gzipepd version of SQL script
- Custom Backup: This produces a compressed custom-format archive suitable for input into pg_restore.

```bash
#!/bin/bash

##############################
## POSTGRESQL BACKUP CONFIG ##
##############################

# Optional hostname to adhere to pg_hba policies.  Will default to "localhost" if none specified.
HOSTNAME=localhost

# Optional username to connect to database as.  Will default to "postgres" if none specified.
USERNAME=postgres

# This dir will be created if it doesn't exist.  This must be writable by the user the script is
# running as.
BACKUP_DIR=/home/jcottobboni/backups/database/postgresql/
SUFFIX="-daily"
FINAL_BACKUP_DIR=$BACKUP_DIR"`date +\%Y-\%m-\%d`$SUFFIX/"

# Database name to backup
DATABASE=db_name

# Will produce a custom-format backup if set to "yes"
ENABLE_CUSTOM_BACKUPS=yes

# Will produce a gzipped plain-format backup if set to "yes"
ENABLE_PLAIN_BACKUPS=yes

#### SETTINGS FOR ROTATED BACKUPS ####

# Number of days to keep daily backups
DAYS_TO_KEEP=15

#### SETTINGS FOR COPY BACKUPS ####
STAGING_ADDRESS='user@ip'

STAGING_FOLDER="$FINAL_BACKUP_DIR"


###########################
### INITIALISE DEFAULTS ###
###########################

if [ ! $HOSTNAME ]; then
  HOSTNAME="localhost"
fi;

if [ ! $USERNAME ]; then
  USERNAME="postgres"
fi;


###########################
#### START THE BACKUPS ####
###########################

function perform_backups()
{
  ./slack-cli chat send "Starting backup to database ${DATABASE}" '##slack-channel-name'
  echo "Making backup directory in $FINAL_BACKUP_DIR"

  if ! mkdir -p $FINAL_BACKUP_DIR; then
    echo "Cannot create backup directory in $FINAL_BACKUP_DIR. Go and fix it!" 1>&2
    exit 1;
  fi;

  echo -e "\n\nPerforming full backup of $DATABASE"
  echo -e "--------------------------------------------\n"

    if [ $ENABLE_PLAIN_BACKUPS = "yes" ]
    then
      echo "Plain backup of $DATABASE"

      if ! pg_dump -Fp -h $HOSTNAME -U $USERNAME $DATABASE | gzip > $FINAL_BACKUP_DIR$DATABASE.sql.gz.in_progress; then
        echo "[!!ERROR!!] Failed to produce plain backup database $DATABASE" 1>&2
      else
        mv $FINAL_BACKUP_DIR$DATABASE.sql.gz.in_progress $FINAL_BACKUP_DIR$DATABASE.sql.gz
      fi
    fi

    if [ $ENABLE_CUSTOM_BACKUPS = "yes" ]
    then
      echo "Custom backup of $DATABASE"

      if ! pg_dump -Fc -h $HOSTNAME -U $USERNAME $DATABASE -f $FINAL_BACKUP_DIR$DATABASE.custom.in_progress; then
        echo "[!!ERROR!!] Failed to produce custom backup database $DATABASE"
      else
        mv $FINAL_BACKUP_DIR$DATABASE.custom.in_progress $FINAL_BACKUP_DIR$DATABASE.custom
      fi
    fi
  ./slack-cli chat send "Finishing Backup Produção for database: ${DATABASE}" '#slack-channel-name'
  echo -e "\nDatabase backup complete!"
}

function copy_backups_to_staging_server()
{
  echo "Making backup directory in $FINAL_BACKUP_DIR on Staging Server"

  if ! ssh $STAGING_ADDRESS "mkdir -p $FINAL_BACKUP_DIR"; then
    echo "Cannot create backup directory in $FINAL_BACKUP_DIR. Go and fix it!" 1>&2
    exit 1;
  fi;
  scp $FINAL_BACKUP_DIR$DATABASE.sql.gz $STAGING_ADDRESS:$STAGING_FOLDER
}

# DAILY BACKUPS

# Delete daily backups older than DAYS_TO_KEEP
find $BACKUP_DIR -maxdepth 1 -mtime +$DAYS_TO_KEEP -name "*-daily" -exec rm -rf '{}' ';'

perform_backups
copy_backups_to_staging_server

```

Save this content in file called pg_backup.sh, and give permission to execute


```terminal
chomd +x pg_backup.sh
```
The scp comands sends a copy from db to another server, in this sample i send to my staging server, but you can send for any machine you want, for this command works without ask a password you need to copy your ssh key to the server with this command:

```terminal
ssh-copy-id -i ~/.ssh/id_rsa.pub "user"@"server-address-or-ip"
```

To enable automate for you script open crontab

```terminal
crontab -e
```

and write like this:

```terminal
# PostgreSQL Backup
00 00 * * * /path/to/script/pg_backup.sh
```
