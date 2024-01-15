# Select the image to use
FROM --platform=linux/amd64 node:20

## Install dependencies in the root of the Container
COPY package*.json ./
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN npm i

# Add project files to /app route in Container
ADD . ./src

# Set working dir to /src
WORKDIR /src

# expose port 9009
EXPOSE 9009
