run:
	npm run start:debug

migration-create:
	typeorm migration:create ./src/database/migration/${FILE_NAME}

migration-run:
	npx typeorm-ts-node-commonjs migration:run -d src/database/migration/*.ts

build:
	docker build --platform=linux/amd64 -t lotter-system-lottery-draw-service:${TAG} .
