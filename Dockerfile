# Копируем package files
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Переменные окружения
ENV NEXT_PUBLIC_API_URL=https://api.floricraft.ru
ENV NEXT_PUBLIC_STRAPI_URL=https://admin.floricraft.ru/api
ENV NEXT_PUBLIC_STRAPI_BASE_URL=https://admin.floricraft.ru
ENV AUTH_BASE=/custom_auth
ENV NEXT_PUBLIC_YMAPS_API_KEY=7352c14d-7618-4e39-857a-137134cfc500
ENV NEXT_PUBLIC_YGEO_API_URL=https://geocode-maps.yandex.ru/1.x

# Запускаем в dev режиме
CMD ["npm", "run", "start"]

