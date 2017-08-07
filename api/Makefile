CSS_DIR=static/css
SASS_INCLUDE_PATH=node_modules/bulma/

default: help

watch-css: ## continuously build CSS
	@nodemon -e scss -x 'make build-css'
.PHONY: watch-css

build-css: ## build CSS with Sass, Autoprefixer, etc.
	@node-sass --output-style compressed --include-path $(SASS_INCLUDE_PATH) scss/main.scss $(CSS_DIR)/main.css
	@postcss $(CSS_DIR)/*.css -r --use autoprefixer
.PHONY: build-css

dev: ; ${MAKE} -j2 watch-css run-dev
.PHONY: dev

run-dev: ## start the API in development mode
	@FLASK_APP=server.py FLASK_DEBUG=1 flask run
.PHONY: run-dev

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help
