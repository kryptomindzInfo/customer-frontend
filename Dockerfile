FROM node:12
ADD /package.json /tmp/package.json
WORKDIR /tmp
ADD . /tmp/
RUN npm install
EXPOSE 5001
ENTRYPOINT npm start --port 5001
