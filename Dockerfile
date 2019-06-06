FROM desyatkov/e2e-test:0.1
EXPOSE 8888

WORKDIR /usr/src/app

COPY . .

CMD ["yarn", "test"]
