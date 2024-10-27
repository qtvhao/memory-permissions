# Use the official Node.js image as a base
FROM node:20

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files
COPY ./app/package.json ./app/yarn.lock ./

# Install app dependencies using yarn
RUN yarn install

# Run end-to-end tests
RUN yarn run test:e2e

# Copy the rest of the app's source code to the container
COPY ./app/ .

# Expose the port that your app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["yarn", "start"]
