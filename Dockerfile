FROM nginx:1.11.1

COPY nginx.conf /etc/nginx/nginx.conf
COPY src /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]