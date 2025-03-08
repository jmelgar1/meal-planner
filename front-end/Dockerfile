FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock (before copying everything)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the app's files
COPY . .

# Expose port 3000 for React
EXPOSE 3000

# Start the React app
CMD ["yarn", "start"]
