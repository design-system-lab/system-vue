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

## Variable Naming Schema

Fora uses a consistent naming schema across both the design and development libraries:

`[component]` `_` `[heirarchy]` `_` `[sub-component/element]` `_` `[semantics]` `_` `[property]` `--` `[modifier]`

For example:
`input-field_primary_error_border--hover`
`table_table-header_bg--focus`

- Component: Optional (doesn't apply to global variables), this is a hyphen separated component name, for example: `input-field`
- Heirarchy: Describes how the component relates to alternate versions of the component, for example: `primary` or `xs`
- Sub-Component/Element: When variables are needed for a sub-component or child element. This could go before or after semanitics depending on if the semantics describe the component or sub-component/element.
- Semantics: This is the current state of the component, for example: `error` or `readonly`
- Property: Typically a keyword correlated to the CSS property using the variable, for example: `bg` or `border`
- Modifier: This describes ephemeral states, for example: `hover` or `focus`

To reduce confusion and maintain parity between developers and designers, the system uses the same variable names in both Figma and the development kit.

# Z-Index Chart
All items with a z-index should be listed here for reference:

| Component | z-index | Description |
| --------- | ------- | ----------- |
| FdGroup   | 1       | z-index of 1 given to the current item in focus, so that the focus ring will appear above it's siblings |
| Form Inputs | 1     | z-index given to form inputs so that error states will transition behind them |
| FdMenu    | 10      | menu z-index, needs to sit above all other indexs so that it can appear above them when set to global |