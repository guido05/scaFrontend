FROM node:12-alpine as build
RUN mkdir -p /app
WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm install
ADD . /app

# Made for angular production environment deployment fix.
RUN rm src/environments/environment.ts
RUN cp src/environments/environment.prod.ts src/environments/environment.ts

# Build the app.
RUN npm run build --prod


FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY compose/production/site.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]