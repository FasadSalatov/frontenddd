FROM node:lts-gallium as build-stage

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_DOCKER=1

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json /app/

# build
RUN [ "npm", "install", "-g", "react-script" ]

RUN [ "npm", "install", "--force" ]

# copy app
COPY ./ ./

EXPOSE 3000

# start app
CMD ["npm", "start"]
