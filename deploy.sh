#!/bin/bash

# Pull new code
git pull

# Restart app server
forever restartall

# Move public directory to be served by nginx
sudo /bin/cp -a /home/app/cityTransport/public/* /usr/share/nginx/html/
sudo chown -R www-data:www-data /usr/share/nginx/html
sudo service nginx restart

