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
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react, nextjs)
import type { StorybookConfig } from "@storybook/react";

const config: StorybookConfig = {
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

### Overview

`range` is an object that assigns a control configuration (PropConfig) to each arg key.

- Root: `parameters.range` is `{ [argKey]: PropConfig | PropConfigs }`
- Nesting: use `type: "object"` to define nested configs (PropConfigs)
- Arrays: `type: "array"` lets you change array length via a slider; `items` defines the element shape

### Common properties (PropConfig)

| Key  | Type      | Required | Applies to          | Description                                                                        |
| ---- | --------- | -------- | ------------------- | ---------------------------------------------------------------------------------- | -------- | ------- | --- | --- | ------------------------- |
| type | `"string" | "number" | "boolean"           | "array"                                                                            | "object" | "enum"` | Yes | All | The value kind to control |
| min  | `number`  | No       | string/number/array | Slider minimum. For string it means character count; for array it means item count |
| max  | `number`  | No       | string/number/array | Slider maximum. For string it means character count; for array it means item count |
| step | `number`  | No       | string/number/array | Slider step                                                                        |

### Type-specific properties

| type    | Property      | Type          | Required             | Description                                                                        |
| ------- | ------------- | ------------- | -------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| string  | —             | —             | —                    | Adjusts text length via slider (pads with `x` when increasing) + direct text input |
| number  | —             | —             | —                    | Adjusts number via slider and direct numeric input                                 |
| boolean | —             | —             | —                    | Checkbox toggle                                                                    |
| array   | items         | `PropConfigs` | No                   | Shape of each element (per-key PropConfig)                                         |
|         | defaultItem   | `any          | (index:number)=>any` | No                                                                                 | Default element when growing the array. If a function, gets the new index |
| object  | (nested keys) | `PropConfig`  | No                   | Put `type: "object"` and list child keys (the `type` key is treated specially)     |
| enum    | selection     | `"single"     | "multiple"`          | No (default: `single`)                                                             | Single or multiple selection                                              |
|         | options       | `Array<string | number               | {label:string; value:any}>`                                                        | No                                                                        | Choices. Object form uses `label` for UI and `value` for the stored value |

Notes:

- `min/max/step` are optional (native input range defaults apply). Specify as needed.
- For `object`, use `{ type: "object", foo: {...}, bar: {...} }`; keys other than `type` are treated as nested configs.

### Examples

```ts
// parameters: { range: { ... } }
range: {
  // Control string length from 0 to 120
  title: { type: "string", min: 0, max: 120, step: 1 },

  // Control a number from 0 to 100
  count: { type: "number", min: 0, max: 100, step: 1 },

  // Toggle boolean
  enabled: { type: "boolean" },

  // Control array length (0–20). Define element shape via `items`
  items: {
    type: "array",
    min: 0,
    max: 20,
    defaultItem: (i) => ({ id: i + 1, label: `Item ${i + 1}` }),
    items: {
      id: { type: "number", min: 1, max: 9999 },
      label: { type: "string", min: 0, max: 50 },
    },
  },

  // Nested object
  settings: {
    type: "object",
    threshold: { type: "number", min: 0, max: 10, step: 0.5 },
    flag: { type: "boolean" },
  },

  // enum single-select (label/value objects are supported)
  status: {
    type: "enum",
    selection: "single",
    options: [
      { label: "Draft", value: "draft" },
      { label: "Published", value: "published" },
      { label: "Archived", value: "archived" },
    ],
  },

  // enum multi-select
  features: {
    type: "enum",
    selection: "multiple",
    options: ["a", "b", "c"],
  },
}
```
