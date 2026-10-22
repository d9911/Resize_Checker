# Package scripts are the single source of build commands.
.PHONY: all build build-ts build-scss build-standalone build-single preview watch watch-ts watch-scss clean dev serve lint lint-fix format protect

all: build-single

build build-ts build-scss build-standalone build-single preview watch watch-ts watch-scss clean dev serve lint lint-fix format:
	npm run $(subst -,:,$@)

# Optional legacy copy restrictions; excluded from normal builds.
protect: build
	node protect-html.js dist/index.html
