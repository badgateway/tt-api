SOURCE_FILES:=$(shell find src/ -type f -name '*.ts')
MIGRATION_FILES:=$(shell find src/migrations -type f -name '*.ts')

all: build

build: src/db-types.ts dist/build package-lock.json

test:
	node_modules/.bin/nyc node_modules/.bin/mocha

lint:
	node_modules/.bin/eslint --quiet 'src/*.ts'

lint-fix: fix

fix:
	node_modules/.bin/eslint --quiet 'src/**/*.ts' --fix

watch:
	node_modules/.bin/tsc --watch

start: build
	node dist/index.js

start-dev:
	npm run start:watch

knex-migrate:
	cd src; npx knex migrate:latest

knex-make-migration:
	cd src; npx knex migrate:make migration_name -x ts

src/db-types.ts: ${MIGRATION_FILES}
	node bin/generate-db-types.mjs

dist/build: $(SOURCE_FILES)
	node_modules/.bin/tsc
	@# Creating a small file to keep track of the last build time
	touch dist/build

package-lock.json: package.json
	npm i

clean:
	rm -r dist

.PHONY:all build test lint lint-fix fix watch start knex-migrate docker-build clean
