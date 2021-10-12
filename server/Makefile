run:
	docker run -d -p 3000:4200 --env-file ./config/.env --name ng_portfolio ng_portfolio:env

dev:
	docker run -d -p 3000:4200 -v :/app -v /app/node_modules -v logs:app/data --rm --env-file ./config/.env --name ng_portfolio ng_portfolio:env

stop: 
	docker stop ng_portfolio
