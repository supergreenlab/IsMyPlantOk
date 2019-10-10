FROM node:10.16.3

RUN apt-get update && apt-get install -y git imagemagick libmagick++-dev node-gyp && \
    ln -s `ls /usr/lib/\`uname -m\`-linux-gnu/ImageMagick-*/bin-q16/Magick++-config | head -n 1` /usr/local/bin/

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm i

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
