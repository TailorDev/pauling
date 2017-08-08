CSS_DIR=static/css
JS_DIR=static/js
SASS_INCLUDE_PATH=node_modules/bulma/
RUN_FLASK=FLASK_APP=server.py \
	  FLASK_DEBUG=1 \
	  SECRET_KEY=Secr3tK3yF0rD3v \
	  DATABASE_URL=postgres://pauling:paulingpassword@127.0.0.1:15432/pauling \
	  flask

default: help

copy-js:
	cp node_modules/clipboard/dist/clipboard.min.js $(JS_DIR)
.PHONY: copy-js

watch-css: ## continuously build CSS
	@nodemon -e scss -x 'make build-css'
.PHONY: watch-css

build-css: ## build CSS with Sass, Autoprefixer, etc.
	@node-sass --output-style compressed --include-path $(SASS_INCLUDE_PATH) scss/main.scss $(CSS_DIR)/main.css
	@postcss $(CSS_DIR)/*.css -r --use autoprefixer
.PHONY: build-css

dev: ; ${MAKE} -j2 watch-css run-dev ## start the dev environment
.PHONY: dev

run-dev: ## start the API in development mode
	@docker-compose up -d
	@$(RUN_FLASK) run
.PHONY: run-dev

flask-db-init: ## run flask db init
	@$(RUN_FLASK) db init
.PHONY: flask-db-init

flask-db-migrate: ## run flask db migrate
	@$(RUN_FLASK) db migrate
.PHONY: flask-db-migrate

flask-db-upgrade: ## run flask db upgrade
	@$(RUN_FLASK) db upgrade
.PHONY: flask-db-upgrade

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help
