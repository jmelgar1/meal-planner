FROM node:18

WORKDIR /app

# Copy package.json and yarn.lock first for caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the remaining files
COPY . .

EXPOSE 3000
CMD ["yarn", "start"]
