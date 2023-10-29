.PHONY: build run fmt prisma_studio kill_prisma_studio

build:
	npm run build

dev:
	npm run dev

fmt:
	npm run format

prisma_studio:
	./node_modules/dotenv-cli/cli.js -e .env.local -- npx prisma studio
