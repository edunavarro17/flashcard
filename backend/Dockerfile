FROM php:8.2-cli

WORKDIR /var/www/html
COPY . .

RUN apt-get update \
 && apt-get install -y --no-install-recommends sqlite3 libsqlite3-dev unzip curl \
 && docker-php-ext-install pdo pdo_sqlite \
 && mkdir -p /var/www/html/database \
 && chown -R www-data:www-data /var/www/html \
 && chmod -R 775 /var/www/html/database \
 && rm -rf /var/lib/apt/lists/* \
 && curl -L https://phar.phpunit.de/phpunit-9.phar -o /usr/local/bin/phpunit \
 && chmod +x /usr/local/bin/phpunit
EXPOSE 80
CMD ["php", "-S", "0.0.0.0:80", "-t", "public"]
