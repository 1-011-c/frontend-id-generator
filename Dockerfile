FROM nginx:alpine
COPY build* /usr/share/nginx/html/
# Custom execution script to make the URLs configurable
ADD start-testbefund-generator.sh /
RUN chmod +x /start-testbefund-generator.sh
CMD ["/start-testbefund-generator.sh"]
