# Sử dụng hình ảnh Node.js cho build React
FROM node:18 AS build

# Làm việc trong thư mục /app
WORKDIR /app

# Sao chép các file vào container
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

# Sử dụng Nginx để serve ứng dụng
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
