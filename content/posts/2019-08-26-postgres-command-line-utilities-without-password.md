---
date: 2019-08-26
title: 'PostgreSql command line utilities without provide password'
template: post
thumbnail: '../thumbnails/postgresql.png'
slug: postgresql-command-line-utilities-without-provide-password
categories:
  - Tutorials
  - PostgreSQL
tags:
  - linux
  - postgresql
---

Sometimes you need to put comands from Postgres CLI in bash scripts, and the passwords can be a problem, no more:

## Provide password using the password file
### Create the config file

```terminal
$ touch ~/.pgpass
$ chmod 0600 ~/.pgpass
```

Every line in file defines a credential for access

```terminal
server:port:database:username:password
```

 The fields can be replaced with an asterisk to match anything like this way:

```terminal
localhost:5432:project_a_db:jcottobboni:0yRkckAF8lYB
192.168.1.50:5432:project_b_db:jack:mCtEtSd8F08P
10.2.50.150:*:*:alice:flx1me0cTUJV
```

This way you can use PostgreSQL utilities without provide password.

```terminal
pg_dump -U jcottobboni -h localhost -p 5432 -Fc project_a_db > /home/jcottobboni/backup_for_project_a_db
```

It is not mandatory to use the same path and file used in this example.
You can define your.

```terminal
export PGPASSFILE=~/.mycustomfile
```

#### The -w param
-w, --no-password
 Never issue a password prompt. If the server requires password authentication and a password is not available by other means such as a .pgpass file, the connection attempt will fail. This option can be useful in batch jobs and scripts where no user is present to enter a password.

## Provide password using environment variables

Other way is define de environmment variables, you can define PGHOST, PGPORT, PGDATABASE, PGUSER and PGPASSWORD and use it in your scripts

## References
[PostgreSQL 9.3.4 Documentation - libpq - The Password File](https://www.postgresql.org/docs/9.3/libpq-pgpass.html)

[PostgreSQL 9.3.4 Documentation - libpq - Environment Variables](https://www.postgresql.org/docs/9.3/libpq-envars.html)
