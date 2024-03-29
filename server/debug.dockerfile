# Create image based off of the official 12.8-alpine
FROM node:16-alpine


# Change directory so that our commands run inside this new directory
WORKDIR /api

# Copy dependency definitions
COPY package*.json ./

RUN npm ci

RUN npm install -g nodemon

COPY . /api/

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD [ "npm", "run", "dev-server" ]
