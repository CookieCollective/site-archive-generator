# Site archive generator

The tool generates static pages from the site archives.

## Development

    node . -i path -e
    http-server

## Production

    node . -i path -o path

```yaml
version: "3.7"

services:
  archive-2016:
    image: pierrezemb/gostatic
    labels:
      - traefik.frontend.rule=Host:20xx.cookie.paris
      - traefik.docker.network=web
      - traefik.port=8043
    networks:
      - web
    volumes:
      - volume:/srv/http

networks:
  web:
    external: true
```
