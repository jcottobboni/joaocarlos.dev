---
date: 2019-09-03
title: 'How to Automate PostgreSQL Restore'
template: post
thumbnail: '../thumbnails/postgresql.png'
slug: how_to_automate_postgresql_restore
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

Recently i need to build some bash scripts to implement a automated backups and restores for my production and staging enviroments with PostgreSQL. I develop a script for backup database in production enviroment and save the backup on staging server.
And now i developed one to take the uploaded files and restore the staging db.
Using cronjob you habe an automation of restores.


```bash
#!/bin/bash

##############################
## POSTGRESQL RESTORE CONFIG ##
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

# Number of days to keep daily backups
DAYS_TO_KEEP=15

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
#### START THE RESTORE ####
###########################

function perform_restore()
{
  ./slack-cli chat send "Starting restore to database: ${DATABASE}" '#slack-channel-name'
  echo "Making restore of files in directory $FINAL_BACKUP_DIR"

  echo -e "\n\nPerforming full Restore of $DATABASE"
  echo -e "--------------------------------------------\n"


  psql -U postgres -h localhost -c "drop database $DATABASE";
  psql -U postgres -h localhost -c "create database $DATABASE";
  gzip -d "$FINAL_BACKUP_DIR$DATABASE.sql.gz"
  /usr/bin/pg_restore --host $HOSTNAME --port 5432 --username $USERNAME --dbname $DATABASE "$FINAL_BACKUP_DIR$DATABASE.sql.gz"

  ./slack-cli chat send "Finishing Restore for database: ${DATABASE}" '#slack-channel-name'
  echo -e "\nDatabase restore complete!"
}

# DAILY RESTORES

# Delete daily restores older than DAYS_TO_KEEP
find $BACKUP_DIR -maxdepth 1 -mtime +$DAYS_TO_KEEP -name "*-daily" -exec rm -rf '{}' ';'

perform_restore

```
Save this content in file called pg_restore.sh, and give permission to execute


```terminal
chomd +x pg_restore.sh
```

To enable automate for you script open crontab

```terminal
crontab -e
```

and write like this:

```terminal
# PostgreSQL Backup
00 00 * * * /path/to/script/pg_restore.sh
```
