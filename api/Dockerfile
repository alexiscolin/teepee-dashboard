
FROM node:lts-alpine

# Create app directory
RUN mkdir -p /usr/app/api/
WORKDIR /usr/app/api/

# Install app dependencies
COPY package*.json /usr/app/api/
COPY .env.local /usr/app/api/
RUN npm install

# Bundle app source
COPY . /usr/app/api/

# Set the command when container start running
CMD npm start
