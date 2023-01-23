# Fora Design System

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Linting

We're using ESLint for linting with many presets similar to the Airbnb standard.

## Unit testing

We use Vitest and Testing Library to do unit and component testing. See the [Vue testing page](https://vuejs.org/guide/scaling-up/testing.html) for more information on testing. We're following a similar philosophy for dividing our unit and component tests.

## The Kitchen Sink

Within the `client` directory is a kitchen sink where the components will be represented in various states. Each major component should have its own page where as many as possible of the possible states are shown. Mock data should be used where needed to represent an accurate picture of what the final component will look like.

## Icon library

Fora uses the [Heroicons](https://github.com/tailwindlabs/heroicons) icon library as the default icon set available within the project. However, if using an alternate icon set, the icon helper component `FdIcon` can still be used, it's simple a wrapper component that provides some helpful styling to standardize the icon sizes and usage.
