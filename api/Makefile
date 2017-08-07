default: help

dev: ## start the API in development mode
	@FLASK_APP=server.py FLASK_DEBUG=1 flask run
.PHONY: dev

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help
