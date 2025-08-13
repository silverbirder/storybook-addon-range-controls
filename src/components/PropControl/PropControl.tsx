import React, { memo } from "react";
import { Badge } from "storybook/internal/components";
import type { PropConfig, PropConfigs } from "../../types";
import {
  StyledDetails,
  StyledSummary,
  DetailsContent,
} from "./PropControl.styles";
import { usePropControl } from "./PropControl.hooks";

type Props = {
  propKey: string;
  value: any;
  config: PropConfig | PropConfigs;
  onValueChange: (newValue: any) => void;
  level?: number;
};

export const PropControl = memo(
  ({ propKey, value, config, onValueChange, level = 0 }: Props) => {
    const { isObjectConfig, localValue, handleChange } = usePropControl({
      value,
      config,
      onValueChange,
    });

    if (isObjectConfig) {
      return (
        <StyledDetails>
          <StyledSummary>
            <span>{propKey}</span>
            <Badge status="neutral">{Object.keys(config).length} keys</Badge>
          </StyledSummary>
          <DetailsContent>
            {Object.entries(config).map(([itemKey, itemConfig]) => (
              <PropControl
                key={itemKey}
                propKey={itemKey}
                value={value?.[itemKey]}
                config={itemConfig}
                onValueChange={(newValue) =>
                  handleChange({ ...value, [itemKey]: newValue })
                }
                level={level + 1}
              />
            ))}
          </DetailsContent>
        </StyledDetails>
      );
    }
    const propConfig = config as PropConfig;

    switch (propConfig.type) {
      case "string": {
        const min = propConfig.min ?? 0;
        const max = propConfig.max ?? 100;
        const step = propConfig.step ?? 1;
        return (
          <StyledDetails>
            <StyledSummary>
              <span>{propKey}</span>
              <Badge status="neutral">{String(localValue).length} chars</Badge>
            </StyledSummary>
            <DetailsContent>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={String(localValue).length}
                onChange={(e) => {
                  const targetLength = parseInt(e.target.value);
                  const newValue =
                    targetLength > String(localValue).length
                      ? String(localValue).padEnd(targetLength, "x")
                      : String(localValue).slice(0, targetLength);
                  handleChange(newValue);
                }}
              />
            </DetailsContent>
          </StyledDetails>
        );
      }
      case "number": {
        const min = propConfig.min ?? 0;
        const max = propConfig.max ?? 100;
        const step = propConfig.step ?? 1;
        return (
          <StyledDetails>
            <StyledSummary>
              <span>{propKey}</span>
              <Badge status="neutral">{Number(localValue) ?? min}</Badge>
            </StyledSummary>
            <DetailsContent>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={Number(localValue) ?? min}
                onChange={(e) => handleChange(Number(e.target.value))}
              />
            </DetailsContent>
          </StyledDetails>
        );
      }
      case "boolean":
        return (
          <StyledDetails>
            <StyledSummary>
              <span>{propKey}</span>
              <Badge status="neutral">
                {Boolean(localValue) ? "true" : "false"}
              </Badge>
            </StyledSummary>
            <DetailsContent>
              <input
                type="checkbox"
                checked={Boolean(localValue)}
                onChange={(e) => handleChange(e.target.checked)}
              />
            </DetailsContent>
          </StyledDetails>
        );
      case "array": {
        const currentArray = Array.isArray(localValue) ? localValue : [];
        const defaultItem = propConfig.default;
        const min = propConfig.min ?? 0;
        const max = propConfig.max ?? 10;
        const step = propConfig.step ?? 1;
        return (
          <StyledDetails>
            <StyledSummary>
              <span>{propKey}</span>
              <Badge status="neutral">{currentArray.length} items</Badge>
            </StyledSummary>
            <DetailsContent>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={currentArray.length}
                onChange={(e) => {
                  const targetLength = parseInt(e.target.value);
                  let newArray = [...currentArray];
                  if (targetLength > currentArray.length) {
                    const itemsToAdd = targetLength - currentArray.length;
                    for (let i = 0; i < itemsToAdd; i++) {
                      const newIndex = currentArray.length + i;
                      let newItem;
                      if (defaultItem && typeof defaultItem === "function") {
                        newItem = defaultItem(newIndex);
                      } else if (defaultItem) {
                        newItem = defaultItem;
                      } else if (currentArray.length > 0) {
                        newItem = JSON.parse(
                          JSON.stringify(currentArray[currentArray.length - 1]),
                        );
                      } else {
                        newItem = {};
                      }
                      newArray.push(newItem);
                    }
                  } else if (targetLength < currentArray.length) {
                    newArray = newArray.slice(0, targetLength);
                  }
                  handleChange(newArray);
                }}
              />
              {propConfig.items && localValue && localValue.length > 0 && (
                <div>
                  {localValue.map((item: any, index: number) => (
                    <StyledDetails key={index}>
                      <StyledSummary>
                        <span>Item #{index}</span>
                      </StyledSummary>
                      <DetailsContent>
                        {Object.entries(propConfig.items!).map(
                          ([itemKey, itemConfig]) => (
                            <PropControl
                              key={itemKey}
                              propKey={itemKey}
                              value={item?.[itemKey]}
                              config={itemConfig}
                              onValueChange={(newItemValue) => {
                                const newArray = [...localValue];
                                newArray[index] = {
                                  ...newArray[index],
                                  [itemKey]: newItemValue,
                                };
                                handleChange(newArray);
                              }}
                              level={level + 1}
                            />
                          ),
                        )}
                      </DetailsContent>
                    </StyledDetails>
                  ))}
                </div>
              )}
            </DetailsContent>
          </StyledDetails>
        );
      }
    }

    return null;
  },
);
