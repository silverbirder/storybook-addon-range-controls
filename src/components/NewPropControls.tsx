import React, { memo, useCallback, useEffect, useState } from "react";
import { styled } from "storybook/theming";
import type { PropConfig, PropConfigs } from "../types";

type Props = {
  args: Record<string, any>;
  propConfigs: PropConfigs;
  onArgsChange: (newArgs: Record<string, any>) => void;
};

export const PropControls = memo(
  ({ args, propConfigs, onArgsChange }: Props) => {
    const handlePropChange = useCallback(
      (propKey: string, newValue: any) => {
        const newArgs = { ...args, [propKey]: newValue };
        onArgsChange(newArgs);
      },
      [args, onArgsChange],
    );
    return (
      <Container>
        {Object.entries(propConfigs).map(([propKey, config]) => (
          <PropControl
            key={propKey}
            propKey={propKey}
            value={args[propKey]}
            config={config}
            onValueChange={(newValue) => handlePropChange(propKey, newValue)}
          />
        ))}
      </Container>
    );
  },
);

const spacing = 12;
const Container = styled.div`
  padding: ${spacing}px;
`;
const NestedContainer = styled.div`
  margin-left: ${spacing}px;
  border-left: 2px solid #e0e0e0;
  padding-left: ${spacing}px;
`;

type PropControlProps = {
  propKey: string;
  value: any;
  config: PropConfig | PropConfigs;
  onValueChange: (newValue: any) => void;
  level?: number;
};

const PropControl = memo(
  ({ propKey, value, config, onValueChange, level = 0 }: PropControlProps) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleChange = useCallback(
      (newValue: any) => {
        setLocalValue(newValue);
        onValueChange(newValue);
      },
      [onValueChange],
    );
    if (typeof config === "object" && !("type" in config)) {
      return (
        <Container>
          <strong>{propKey}</strong>
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
        </Container>
      );
    }
    const propConfig = config as PropConfig;

    switch (propConfig.type) {
      case "string":
        return (
          <Container>
            <strong>{propKey}</strong>
            <input
              type="range"
              max={propConfig.length}
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
          </Container>
        );
      case "number":
        const min = propConfig.min ?? 0;
        const max = propConfig.max ?? 100;
        const step = propConfig.step ?? 1;
        return (
          <Container>
            <strong>{propKey}</strong>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={Number(localValue) ?? min}
              onChange={(e) => handleChange(Number(e.target.value))}
            />
          </Container>
        );
      case "boolean":
        return (
          <Container>
            <strong>{propKey}</strong>
            <input
              type="checkbox"
              checked={Boolean(localValue)}
              onChange={(e) => handleChange(e.target.checked)}
            />
          </Container>
        );
      case "array":
        const currentArray = Array.isArray(localValue) ? localValue : [];
        const defaultItem = propConfig.defaultItem;
        return (
          <Container>
            <strong>{propKey}</strong>
            <input
              type="range"
              max={propConfig.length}
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
            {propConfig.items && localValue.length > 0 && (
              <NestedContainer>
                {localValue
                  .slice(0, Math.min(5, localValue.length))
                  .reverse()
                  .map((item: any, index: number) => (
                    <div key={index}>
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
                    </div>
                  ))}
                {localValue.length > 5 && (
                  <span>Showing first 5 items. Total: {localValue.length}</span>
                )}
              </NestedContainer>
            )}
          </Container>
        );
    }

    return <Container>{propKey}</Container>;
  },
);
