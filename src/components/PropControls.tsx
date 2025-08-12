import React, { memo, useCallback, useEffect, useState } from "react";
import { styled } from "storybook/theming";
import { Badge, Button } from "storybook/internal/components";
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

    const handleApplyToAll = useCallback(
      (sourceIndex: number, propKey: string) => {
        const currentArray = Array.isArray(args[propKey]) ? args[propKey] : [];
        if (sourceIndex >= 0 && sourceIndex < currentArray.length) {
          const template = deepClone(currentArray[sourceIndex]);
          const newArray = Array.from({ length: currentArray.length }, () =>
            deepClone(template),
          );
          handlePropChange(propKey, newArray);
        }
      },
      [args, handlePropChange],
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
            handleApplyToAll={handleApplyToAll}
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

const StyledDetails = styled.details`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const StyledSummary = styled.summary`
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 500;
  border-radius: 4px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &::marker {
    display: none;
  }

  &::-webkit-details-marker {
    display: none;
  }

  &::before {
    content: "▶";
    margin-right: 8px;
    transition: transform 0.2s;
  }

  details[open] &::before {
    transform: rotate(90deg);
  }
`;

const DetailsContent = styled.div`
  padding: 12px;
`;

const deepClone = (obj: any): any => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map((item) => deepClone(item));
  if (typeof obj === "object") {
    const cloned: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  return obj;
};

type PropControlProps = {
  propKey: string;
  value: any;
  config: PropConfig | PropConfigs;
  onValueChange: (newValue: any) => void;
  level?: number;
  handleApplyToAll?: (sourceIndex: number, propKey: string) => void;
};

const PropControl = memo(
  ({
    propKey,
    value,
    config,
    onValueChange,
    level = 0,
    handleApplyToAll,
  }: PropControlProps) => {
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
        <StyledDetails open={level === 0}>
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
      case "string":
        return (
          <StyledDetails open={level === 0}>
            <StyledSummary>
              <span>{propKey}</span>
              <Badge status="neutral">len: {String(localValue).length}</Badge>
            </StyledSummary>
            <DetailsContent>
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
            </DetailsContent>
          </StyledDetails>
        );
      case "number":
        const min = propConfig.min ?? 0;
        const max = propConfig.max ?? 100;
        const step = propConfig.step ?? 1;
        return (
          <StyledDetails open={level === 0}>
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
      case "boolean":
        return (
          <StyledDetails open={level === 0}>
            <StyledSummary>
              <span>{propKey}</span>
              <Badge status={Boolean(localValue) ? "positive" : "neutral"}>
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
      case "array":
        const currentArray = Array.isArray(localValue) ? localValue : [];
        const defaultItem = propConfig.defaultItem;
        return (
          <StyledDetails open={level === 0}>
            <StyledSummary>
              <span>{propKey}</span>
              <Badge status="neutral">length: {currentArray.length}</Badge>
            </StyledSummary>
            <DetailsContent>
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
              {propConfig.items && localValue && localValue.length > 0 && (
                <div>
                  {localValue
                    .slice(0, Math.min(5, localValue.length))
                    .map((item: any, index: number) => (
                      <StyledDetails key={index}>
                        <StyledSummary>
                          <span>Item #{index}</span>
                          <div>
                            {handleApplyToAll && (
                              <Button
                                size="small"
                                variant="outline"
                                onClick={() => handleApplyToAll(index, propKey)}
                              >
                                全てに適用
                              </Button>
                            )}
                          </div>
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
                  {localValue.length > 5 && (
                    <Badge status="warning">
                      Showing first 5 items. Total: {localValue.length}
                    </Badge>
                  )}
                </div>
              )}
            </DetailsContent>
          </StyledDetails>
        );
    }

    return (
      <StyledDetails>
        <StyledSummary>
          <span>{propKey}</span>
        </StyledSummary>
        <DetailsContent></DetailsContent>
      </StyledDetails>
    );
  },
);
