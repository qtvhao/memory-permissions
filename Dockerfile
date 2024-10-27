# Use the official Node.js image as a base
FROM node:20

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files
COPY ./app/package.json ./app/yarn.lock ./

# Install app dependencies using yarn
RUN yarn install

# Copy the rest of the app's source code to the container
COPY ./app/ .

# Run end-to-end tests
RUN yarn run test:e2e

# Build the app
RUN yarn build

FROM node:20

# Get nest CLI
RUN yarn global add @nestjs/cli

WORKDIR /app
COPY ./app/package.json ./app/yarn.lock ./

# Copy the built app from the previous stage
COPY --from=0 /app/dist/ ./

# Expose the port that your app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["yarn", "start"]
