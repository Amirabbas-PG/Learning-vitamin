FROM ghcr.io/cwm360/wordpress:php8.3-apache

COPY ./libs/* /usr/local/lib/php/extensions/no-debug-non-zts-20220829 

COPY ./ini/* /usr/local/etc/php/conf.d/


