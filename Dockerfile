# Use official Playwright image with browsers
FROM mcr.microsoft.com/playwright:v1.55.0-jammy

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Install Playwright browsers (optional if not already installed)
RUN npx playwright install

# Default command to run tests
CMD ["npx", "playwright", "test", "--reporter=line,allure-playwright"]
