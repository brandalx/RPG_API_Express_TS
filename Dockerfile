FROM node:14-alpine

#set the working directory in the docker container
WORKDIR /usr/src/app

#copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# install dependencies including dev deps
RUN npm install

# copy the rest of your application
COPY . .

# build the project (transpile Typescript)
RUN npm run build

# expose the port the app runs on
EXPOSE ${PORT}

# command to run the app
CMD ["npm", "start"]