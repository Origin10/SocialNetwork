# SocialNetwork

works pretty similar to a well known social network,
but you can host it on your very own infrastructure or intranet.

## Demo
http://social.codejungle.org/   //master branch (not recommended anymore -> react/own php framework)
http://dev.codejungle.org/   //dev branch (current development -> vue/laravel)


## Development 
I will rewrite the hole project in laravel and vue (please see dev branch for current development) 
If you need to use this project right now, please bare in mind that the master branch will be orphaned in the near future. 

## Donate
Bitcoins: 1GqMSGseij18JnAoB9f3LHJRozNr1QeHkh

Ethereum: 0x6788024D1D36641DDE7832ce9B0300eBbD7C4832

## API Documentation

https://social.codejungle.org/help/

## Features

* Share (Websites, Images, Videos, SourceCode)
* Like / Dislike / Comments
* #hash tag search (orderd by popularity)
* @user mentions and notifications via websockets
* REST API
* Oauth2 (Facebook, Github)
* Backend with Dashboard

## Side Projects

* [Telegram Chat Bot](https://github.com/andreas83/SocialNetwork-TelegramBot/)
* [Android and IOS Hybrid APP (ionic)](https://github.com/andreas83/SocialNetwork-ionic/)
* [Google Chrome extension](https://chrome.google.com/webstore/detail/das-merken-die-nie/nkmpdbbmbddilkkjcodddbffmjjcdcna?utm_source=chrome-app-launcher-info-dialog) [Sourcecode](https://github.com/andreas83/SocialNetwork-ChromeExtension)

## Requirement

* Webserver (Apache2 or Nginx)
* PHP


# Installation

## Download Sourcecode

Via GIT:
```
git clone https://github.com/andreas83/SocialNetwork.git
```
Via direct Download:

https://github.com/andreas83/SocialNetwork/archive/andrea.zip

## Install dependencies

We use [composer](https://getcomposer.org/) for our PHP dependencies.
To install necessary dependencies like phpmailer, oauth2 libs, altorouter etc just run following cmd

```
cd SocialNetwork
composer install
```


## Configuration

you can adjust the db credentials in app/config/main.cfg
```
db_name="dmdn"
db_user="user"
db_pass="pass"
```
You will find the [database.sql](https://raw.githubusercontent.com/andreas83/SocialNetwork/andrea/database.sql) file in repro.

Also you should adopt following configuration parameter
```
address="http://www.yourdomain.com"
dir="/var/www/vhost";
```

the upload_address is useful for large installation, if you plan to host your images on
a server optimitzed for static content delivery,
```
# Upload path & address
upload_path="/public/upload/"
upload_address="http://static.youdomain.com/"
```

For security reasons please don`t forget to change the salat to some other random string
```
salat="KJMnmnNUU&/§N(JH/h80h87fnunu43h8u7"
```

If you like to use the Facebook or Google login, following settings are required:
```
# Facebook Auth
facebook_auth=true; //set to false if you dont like fb login
facebook_app_id="";
facebook_app_secret="";

# Google Auth
google_auth=true;
google_app_id="";
google_app_secret="";
```

##Permissions

Please make sure that following directories are writeable by webserver
```
public/css/scss/
public/upload
```

via
```
sudo chown www-data:www-data public/css/scss
sudo chown www-data:www-data public/upload
```


## Webserver

If you run Apache, you need also activate mod_rewirte

```
a2enmod rewrite
```

## Sample nginx configuration

```
server {
  listen 217.11.57.227:80;
  listen [2a00:1828:2000:148::3]:80;

  server_name .dasmerkendienie.com;

  access_log /var/log/nginx/www.dasmerkendienie.com.access.log;
  error_log /var/log/nginx/www.dasmerkendienie.com.error.log info;

  root /home/dasmerkendienie/www/dasmerkendienie.com;
  index index.php;

  location ^~ /(css|img|js|upload|bootstrap) {
    # enable CORS (http://enable-cors.org/server_nginx.html)
    if ($http_origin ~ (https?://.*\.dasmerkendienie\.com(:[0-9]+)?)) {
      add_header "Access-Control-Allow-Origin" $http_origin;
    }
    root /home/dasmerkendienie/www/dasmerkendienie.com;
    expires 1d;
  }
  location /public/upload {
    deny all;
  }
  location /app/config {
    deny all;
  }
  location / {

    try_files $uri /index.php?$args;

    location ~ .php$ {
      try_files $uri $uri/ =404;
      fastcgi_index index.php;
      fastcgi_read_timeout 1800s;
      fastcgi_send_timeout 1800s;
      fastcgi_pass phpcgi;
      include fastcgi_params;
      fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
      fastcgi_param SCRIPT_NAME $fastcgi_script_name;
    }

    # deny access to apache .htaccess files
    location ~ /\. {
      deny all;
    }
  }
}
```


## Notification Server (experimental)

You can start the websocket server by following command:

```
php app/server/runnotificationServer.php
```

Also you need to change following configuration parameter in main.cfg:

```
notification_server="ws://127.0.0.1:9000/notification";
```


## Optional toolchain for development

```
npm install
bower install
gulp
```
