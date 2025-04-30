FROM node:22-bullseye AS build
WORKDIR /src
COPY webpack.config.js package.json /src
COPY assets /src/assets
RUN npm install . && NODE_ENV=production npm run build

FROM debian:bookworm as release
RUN apt-get update && apt-get install --no-install-recommends -y python3-pip tini redis-server
WORKDIR /app
COPY requirements.txt /app
RUN PIP_BREAK_SYSTEM_PACKAGES=1 pip3 install -r requirements.txt
COPY docker-entrypoint.sh manage.py /app
COPY goldsprint /app/goldsprint
COPY templates /app/templates
RUN python3 manage.py migrate
COPY --from=build /src/assets /app/assets
EXPOSE 8000
ENTRYPOINT ["/usr/bin/tini", "--", "/app/docker-entrypoint.sh"]
