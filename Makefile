.PHONY: build run fmt ps pdp

build:
	npm run build

dev:
	npm run dev

fmt:
	npm run format

ps:
	./node_modules/dotenv-cli/cli.js -e .env.local -- npx prisma studio

pdp:
	./node_modules/dotenv-cli/cli.js -e .env.local -- npx prisma db push
