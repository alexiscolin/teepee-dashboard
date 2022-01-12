FROM node:lts-alpine

# Create app directory
RUN mkdir -p /usr/app/app/
WORKDIR /usr/app/app/

# Install app dependencies
COPY package*.json /usr/app/app/
RUN npm install

# Bundle app source
COPY . /usr/app/app/

# Set the command when container start running
CMD [ "npm", "run dev" ]