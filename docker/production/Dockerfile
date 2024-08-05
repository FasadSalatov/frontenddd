# Stage 1: Build the React app
FROM node:18 AS build-stage

# Create a system user and group
RUN addgroup --system react && adduser --system --ingroup react react

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

#RUN export NODE_OPTIONS=--max_old_space_size=2048
# Install the dependencies
RUN npm install --silent --unsafe-perm=true

# Copy the rest of the project files
COPY . .

# Build the React app
RUN npm run build
FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Copy the build output from the previous stage to the nginx html directory
#COPY --from=build-stage /app/build /usr/share/nginx/html