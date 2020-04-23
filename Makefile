start: 
	npx vue-cli-service serve

build:
	npx vue-cli-service build

lint:
	npx vue-cli-service lint

deploy: lint
	git push heroku master

log:
	heroku logs --tail