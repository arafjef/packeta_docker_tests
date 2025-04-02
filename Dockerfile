############################## MULTISTAGE BUILD ##############################

# STAGE 1: BUILDER
FROM mcr.microsoft.com/playwright:v1.43.1-jammy AS builder

WORKDIR /app

# Závislosti aplikace (testy)
COPY package.json package-lock.json* ./

# Instalace Node.js závislostí
RUN npm ci

# Kopíruju zbytek testů a konfigurace
COPY . .


##############################################################################


# STAGE 2: RUNNER
FROM node:20-slim AS runner

WORKDIR /app

# Systémové knihovny potřebné pro Chromium
RUN apt-get update && \
    apt-get install -y \
    wget \
    libnss3 \
    libatk-bridge2.0-0 \
    libxss1 \
    libasound2 \
    libxcomposite1 \
    libxrandr2 \
    libgbm1 \
    libgtk-3-0 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    fonts-liberation \
    libappindicator3-1 \
    libu2f-udev && \
    rm -rf /var/lib/apt/lists/*

# Přenos nainstalovaných balíčků a testů
COPY --from=builder /app /app

# Non-root uživatel
RUN useradd -m appuser && chown -R appuser /app
USER appuser

# Instalace chromium
RUN npx playwright install chromium

# Výchozí příkaz
# CMD ["npx", "playwright", "test"]
CMD ["bash"]