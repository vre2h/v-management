start: 
	npx vue-cli-service serve

build:
	npx vue-cli-service build

lint:
	npx vue-cli-service lint

deploy: lint build
	npx gh-pages -d dist