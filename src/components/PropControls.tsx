import React, { memo, useCallback, useState, useEffect } from "react";
import { styled } from "storybook/theming";
import type { PropConfig, PropConfigs } from "../types";

interface PropControlsProps {
  args: Record<string, any>;
  propConfigs: PropConfigs;
  onArgsChange: (newArgs: Record<string, any>) => void;
}

const Container = styled.div({
  padding: "16px",
  maxHeight: "400px",
  overflowY: "auto",
});

const PropGroup = styled.div({
  marginBottom: "16px",
  border: "1px solid #e0e0e0",
  borderRadius: "4px",
  padding: "12px",
});

const PropLabel = styled.label({
  display: "block",
  fontWeight: "bold",
  marginBottom: "8px",
  color: "#333",
});

const PropValue = styled.div({
  fontSize: "12px",
  color: "#666",
  marginBottom: "8px",
});

const RangeInput = styled.input({
  width: "100%",
  marginBottom: "8px",
});

const NestedContainer = styled.div({
  marginLeft: "16px",
  borderLeft: "2px solid #e0e0e0",
  paddingLeft: "12px",
});

const PropControl: React.FC<{
  propKey: string;
  value: any;
  config: PropConfig | PropConfigs;
  onValueChange: (newValue: any) => void;
  level?: number;
}> = memo(({ propKey, value, config, onValueChange, level = 0 }) => {
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

  // If config is PropConfigs (nested object), render nested controls
  if (typeof config === "object" && !("type" in config)) {
    if (typeof value !== "object" || value === null) {
      return (
        <PropGroup>
          <PropLabel>{propKey}</PropLabel>
          <PropValue>Invalid object value</PropValue>
        </PropGroup>
      );
    }

    return (
      <PropGroup>
        <PropLabel>{propKey}</PropLabel>
        <NestedContainer>
          {Object.entries(config).map(([nestedKey, nestedConfig]) => (
            <PropControl
              key={nestedKey}
              propKey={nestedKey}
              value={value[nestedKey]}
              config={nestedConfig}
              onValueChange={(newNestedValue) => {
                const newValue = { ...value, [nestedKey]: newNestedValue };
                handleChange(newValue);
              }}
              level={level + 1}
            />
          ))}
        </NestedContainer>
      </PropGroup>
    );
  }

  // Handle primitive prop controls
  const propConfig = config as PropConfig;

  const renderControl = () => {
    switch (propConfig.type) {
      case "string":
        if (propConfig.length) {
          return (
            <>
              <RangeInput
                type="range"
                min="1"
                max={propConfig.length * 2}
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
              <div>Length: {String(localValue).length}</div>
            </>
          );
        }
        return (
          <input
            type="text"
            value={String(localValue)}
            onChange={(e) => handleChange(e.target.value)}
            style={{ width: "100%" }}
          />
        );

      case "number":
        const min = propConfig.min || 0;
        const max = propConfig.max || 100;
        const step = propConfig.step || 1;
        return (
          <>
            <RangeInput
              type="range"
              min={min}
              max={max}
              step={step}
              value={Number(localValue) || min}
              onChange={(e) => handleChange(Number(e.target.value))}
            />
            <div>Value: {localValue}</div>
          </>
        );

      case "boolean":
        return (
          <input
            type="checkbox"
            checked={Boolean(localValue)}
            onChange={(e) => handleChange(e.target.checked)}
          />
        );

      case "array":
        if (Array.isArray(localValue)) {
          return (
            <>
              {propConfig.length && (
                <>
                  <RangeInput
                    type="range"
                    min="0"
                    max={propConfig.length * 2}
                    value={localValue.length}
                    onChange={(e) => {
                      const targetLength = parseInt(e.target.value);
                      const newArray = Array.isArray(localValue)
                        ? [...localValue]
                        : [];
                      if (targetLength > newArray.length) {
                        for (let i = newArray.length; i < targetLength; i++) {
                          // Try to preserve the structure of existing items
                          if (newArray.length > 0) {
                            const sampleItem = newArray[0];
                            if (
                              typeof sampleItem === "object" &&
                              sampleItem !== null
                            ) {
                              // Handle Card-like objects
                              if ("id" in sampleItem && "title" in sampleItem) {
                                newArray.push({
                                  ...sampleItem,
                                  id: `item-${i + 1}`,
                                  title: `Generated Card ${i + 1}`,
                                  description: `Generated description for item ${i + 1}`,
                                  tags: Array.isArray(sampleItem.tags)
                                    ? [
                                        ...sampleItem.tags.slice(0, 2),
                                        `Gen${i}`,
                                      ]
                                    : [`Tag${i}`],
                                  rating:
                                    Math.round((Math.random() * 4 + 1) * 10) /
                                    10,
                                });
                              } else {
                                newArray.push({
                                  ...sampleItem,
                                  id: `item-${i + 1}`,
                                });
                              }
                            } else {
                              newArray.push(`Item ${i + 1}`);
                            }
                          } else {
                            newArray.push(`Item ${i + 1}`);
                          }
                        }
                      } else {
                        newArray.splice(targetLength);
                      }
                      handleChange(newArray);
                    }}
                  />
                  <div>Length: {localValue.length}</div>
                </>
              )}
              <div
                style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}
              >
                Array with {localValue.length} items
              </div>

              {/* Show individual array item controls if items config is provided */}
              {propConfig.items && localValue.length > 0 && (
                <NestedContainer>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    Edit Individual Items:
                  </div>
                  {localValue
                    .slice(0, Math.min(5, localValue.length))
                    .map((item, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: "12px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          padding: "8px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            marginBottom: "4px",
                          }}
                        >
                          Item {index + 1}
                        </div>
                        {Object.entries(propConfig.items!).map(
                          ([itemKey, itemConfig]) => (
                            <PropControl
                              key={`${index}-${itemKey}`}
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
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        fontStyle: "italic",
                      }}
                    >
                      Showing first 5 items. Total: {localValue.length}
                    </div>
                  )}
                </NestedContainer>
              )}
            </>
          );
        } else {
          return (
            <>
              <div>Invalid array value - resetting</div>
              <button
                onClick={() => handleChange([])}
                style={{
                  padding: "4px 8px",
                  fontSize: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Reset to empty array
              </button>
            </>
          );
        }

      default:
        return <div>Unsupported type: {propConfig.type}</div>;
    }
  };

  return (
    <PropGroup>
      <PropLabel>{propKey}</PropLabel>
      <PropValue>Type: {propConfig.type}</PropValue>
      {renderControl()}
    </PropGroup>
  );
});

export const PropControls: React.FC<PropControlsProps> = memo(
  ({ args, propConfigs, onArgsChange }) => {
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
