FROM node:20-alpine as build
RUN npm install -g @angular/cli
#RUN npm install -g npm@8.5.3
RUN npm install -g npm@10.8.2
WORKDIR /usr/src/app
ARG config=staging
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --configuration ${config}
FROM nginx:stable AS final
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/share-holder-front-end/browser /usr/share/nginx/html

