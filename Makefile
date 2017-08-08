default: help

deploy-api: ## deploy the API to heroku
	@echo "\033[92m=> Deploy api\033[0m"
	git subtree split --prefix api -b deploy
	git push heroku deploy:master -f
	git branch -D deploy
.PHONY: deploy-api

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help
