---
date: 2019-11-08
title: 'Install Metabase with Systemd on Ubuntu'
template: post
thumbnail: '../thumbnails/ubuntu.png'
slug: install_metabase_with_systemd_on_ubuntu
categories:
  - Tutorials
  - Ubuntu
tags:
  - tutorials
  - ubuntu
---

## Install Metabase with Systemd on Ubuntu

```terminal
mkdir metabase
wget https://downloads.metabase.com/v0.38.3/metabase.jar metabase/
```

```terminal
sudo apt -y install openjdk-11-jdk openjdk-11-jre
sudo groupadd -r metabase
sudo chown -R metabase:metabase metabase/
sudo touch /var/log/metabase.log
sudo touch /etc/default/metabase
sudo chmod 640 /etc/default/metabase
```

```terminal
nano /etc/systemd/system/metabase.service
```

```terminal
[Unit]
Description=Metabase server
After=syslog.target
After=network.target

[Service]
WorkingDirectory=/home/siedos/projects/
ExecStart=/usr/bin/java -jar /home/you_username/projects/metabase/metabase.jar
EnvironmentFile=/etc/default/metabase
User=metabase
Type=simple
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=metabase
SuccessExitStatus=143
TimeoutStopSec=120
Restart=always
```

```terminal
sudo service metabase status
```

```terminal
sudo touch /etc/rsyslog.d/metabase.conf
sudo nano /etc/rsyslog.d/metabase.conf
```

```terminal
if $programname == 'metabase' then /var/log/metabase.log
& stop
```

```terminal
sudo systemctl restart rsyslog.service
```

```terminal
 sudo systemctl daemon-reload
 sudo systemctl start metabase.service
 sudo systemctl enable metabase.service
```

Acess it on http://yourhost:3000
