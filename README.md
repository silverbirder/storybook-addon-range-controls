[![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)](https://develop--689dd119bb72c220c0ddb738.chromatic.com/)

# Storybook Addon Range Controls

Range your story args to quickly probe layout breaks: scale text length, item counts, and numbers via sliders.

## [DEMO](https://develop--689dd119bb72c220c0ddb738.chromatic.com)

## Installation

```bash
npm install --save-dev storybook-addon-range-controls
```

Then, register it as an addon in `.storybook/main.js`.

```ts
// .storybook/main.js

// Replace your-framework with the framework you are using (e.g., react, nextjs)
import type { StorybookConfig } from "@storybook/react";

const config = {
  // ...rest of config
  addons: [
    "@storybook/addon-docs",
    "storybook-addon-range-controls", // 👈 register the addon here
  ],
};

export default config;
```

## Usage

The primary way to use this addon is to define the `range` parameter. You can do this the
component level, as below, to affect all stories in the file, or you can do it for a single story.

```ts
// Button.stories.ts

// Replace your-framework with the name of your framework
import type { Meta } from "@storybook/your-framework";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    range: {
      // See API section below for available parameters
    },
  },
};

export default meta;
```

## API

### Parameters

This addon contributes the following parameters to Storybook, under the `range` namespace:

| key  | value                                               | required |
| ---- | --------------------------------------------------- | -------- |
| type | `string` `number` `array` `boolean` `object` `enum` | true     |

### Types and additional options

| type      | description                                   | additional keys                              |
| --------- | --------------------------------------------- | -------------------------------------------- |
| `string`  | Adjust string length via a **range slider**   | `min`, `max`, `step`, `defaultChar`          |
| `number`  | Adjust a numeric value via a **range slider** | `min`, `max`, `step`                         |
| `array`   | Adjust array length via a **range slider**    | `min`, `max`, `step`, `items`, `defaultItem` |
| `enum`    | Enum with single/multiple selection           | `selection`, `options`                       |
| `boolean` | Toggle true/false                             | —                                            |
| `object`  | Object described by nested field configs      | Nest child fields with their own `type`      |

#### string / number / array

| key    | type     | default | description                |
| ------ | -------- | ------- | -------------------------- |
| `min`  | `number` | `0`     | Minimum value of the range |
| `max`  | `number` | `100`   | Maximum value of the range |
| `step` | `number` | `1`     | Step interval              |

For `string` only:

| key           | type     | default | description                                             |
| ------------- | -------- | ------- | ------------------------------------------------------- |
| `defaultChar` | `string` | `"x"`   | Character used to pad when increasing length via slider |

#### array

| key           | type                             | description                                                                                                                                                                      |
| ------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`       | `PropConfig`                     | Definition of element type. Must include `type`. For object elements: `{ items: { type: "object", name: { type: "string" } } }`. For primitives: `{ items: { type: "string" } }` |
| `defaultItem` | `any` , `(index: number) => any` | Default value for each element. Either a fixed value or a function that receives the index to generate a value.                                                                  |

#### enum

| key         | type                                                      | description                                           |
| ----------- | --------------------------------------------------------- | ----------------------------------------------------- |
| `selection` | `single`, `multiple`                                      | Single or multiple selection                          |
| `options`   | `string[]`, `number[]`, `{ label: string; value: any }[]` | List of options. Supports arrays of label/value pairs |

#### object

`object` is expressed by nesting fields, each with its own `type` definition.

```ts
{
  type: "object",
  name: {
    type: "string"
  },
  price: {
    type: "number"
  }
}
```

### Examples

```ts
// Button.stories.ts
import type { Meta } from "@storybook/your-framework";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    range: {
      // string: adjust length with a range slider
      title: { type: "string", min: 0, max: 50, step: 5 },
      // You can change the padding character when slider grows the string
      subtitle: { type: "string", min: 0, max: 30, step: 1, defaultChar: "·" },

      // number: adjust numeric value with a range slider
      count: { type: "number", min: 0, max: 20, step: 1 },

      // boolean: toggle
      enabled: { type: "boolean" },

      // array: control number of elements; generate defaultItem via function
      tags: {
        type: "array",
        min: 0,
        max: 5,
        step: 1,
        defaultItem: (i: number) => `tag-${i + 1}`,
      },

      // array + items: array of objects
      users: {
        type: "array",
        min: 1,
        max: 3,
        // items must declare a type
        items: {
          type: "object",
          name: { type: "string" },
          age: { type: "number", min: 0, max: 120, step: 1 },
        },
        // You can also provide a fixed defaultItem
        defaultItem: { name: "Alice", age: 20 },
      },

      // array of primitives (strings)
      tags: {
        type: "array",
        min: 0,
        max: 5,
        step: 1,
        items: { type: "string" },
        // optional: default item when growing array
        defaultItem: (i: number) => `tag-${i + 1}`,
      },

      // enum (single)
      size: {
        type: "enum",
        selection: "single",
        options: ["sm", "md", "lg"],
      },

      // enum (multiple) + label/value object array
      colors: {
        type: "enum",
        selection: "multiple",
        options: [
          { label: "Red", value: "#f00" },
          { label: "Green", value: "#0f0" },
          { label: "Blue", value: "#00f" },
        ],
      },

      // object: define fields with nested types
      product: {
        type: "object",
        name: { type: "string" },
        price: { type: "number", min: 0, max: 1000, step: 10 },
      },
    },
  },
};

export default meta;
```
