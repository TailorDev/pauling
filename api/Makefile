# Assets
CSS_DIR           = static/css
JS_DIR            = static/js
SASS_INCLUDE_PATH = node_modules/bulma/
# Python
VENV_NAME = venv
VENV_PATH = $(shell pwd)/$(VENV_NAME)
PIP       = $(VENV_PATH)/bin/pip
PYTHON    = $(VENV_PATH)/bin/python
# Flask
RUN_FLASK = . $(VENV_PATH)/bin/activate && \
			FLASK_DEBUG=True \
			FLASK_APP=server.py \
			DATABASE_URL=postgres://pauling:paulingpassword@127.0.0.1:15432/pauling \
			flask

default: help

bootstrap: venv ## install the project dependencies
	@$(PIP) install -r requirements-dev.txt
	@if [ -z "$$CI" ]; then yarn install --dev; fi
.PHONY: bootstrap

venv:  ## create the python virtual env
	@python3 -m venv $(VENV_NAME)

copy-js: ## copy JS dependencies to JS_DIR
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

test: ## run the test suite
	@. $(VENV_PATH)/bin/activate && py.test
.PHONY: test

test-ci: ## run the test suite on Circle CI
	@. $(VENV_PATH)/bin/activate && py.test --junitxml=/reports/pytest/pytest-report.xml
.PHONY: test-ci

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help
