import React, { memo } from "react";
import type { PropConfig, PropConfigs } from "../../types";
import {
  StyledDetails,
  StyledSummary,
  DetailsContent,
  SummaryContent,
  SummaryTitle,
  SummaryBadge,
  TypeLabel,
  DisplayLimitContainer,
  DisplayLimitInput,
  DisplayLimitInfo,
  DisplayLimitLabel,
  DirectEditContainer,
  DirectEditInput,
  MultiSelectContainer,
  MultiSelectOption,
  MultiSelectCheckbox,
  MultiSelectLabel,
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
    const {
      isObjectConfig,
      localValue,
      handleChange,
      displayLimit,
      handleDisplayLimitChange,
    } = usePropControl({
      value,
      config,
      onValueChange,
    });

    if (isObjectConfig) {
      return (
        <StyledDetails>
          <StyledSummary>
            <SummaryContent>
              <SummaryTitle>
                {propKey}
                <TypeLabel>(object)</TypeLabel>
              </SummaryTitle>
              <SummaryBadge status="neutral">
                {Object.keys(config).length} keys
              </SummaryBadge>
            </SummaryContent>
          </StyledSummary>
          <DetailsContent>
            {Object.entries(config)
              .filter(([itemKey]) => itemKey !== "type")
              .map(([itemKey, itemConfig]) => (
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
    const min = propConfig.min;
    const max = propConfig.max;
    const step = propConfig.step;

    switch (propConfig.type) {
      case "string": {
        return (
          <StyledDetails>
            <StyledSummary>
              <SummaryContent>
                <SummaryTitle>
                  {propKey}
                  <TypeLabel>(string)</TypeLabel>
                </SummaryTitle>
                <SummaryBadge status="neutral">
                  {String(localValue).length} chars
                </SummaryBadge>
              </SummaryContent>
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
              <DirectEditContainer>
                <DirectEditInput
                  type="text"
                  value={localValue}
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                />
              </DirectEditContainer>
            </DetailsContent>
          </StyledDetails>
        );
      }
      case "number": {
        return (
          <StyledDetails>
            <StyledSummary>
              <SummaryContent>
                <SummaryTitle>
                  {propKey}
                  <TypeLabel>(number)</TypeLabel>
                </SummaryTitle>
                <SummaryBadge status="neutral">
                  {Number(localValue) ?? min}
                </SummaryBadge>
              </SummaryContent>
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
              <DirectEditContainer>
                <DirectEditInput
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  value={localValue}
                  onChange={(e) => {
                    handleChange(Number(e.target.value));
                  }}
                />
              </DirectEditContainer>
            </DetailsContent>
          </StyledDetails>
        );
      }
      case "boolean":
        return (
          <StyledDetails>
            <StyledSummary>
              <SummaryContent>
                <SummaryTitle>
                  {propKey}
                  <TypeLabel>(boolean)</TypeLabel>
                </SummaryTitle>
                <SummaryBadge status="neutral">
                  {Boolean(localValue) ? "true" : "false"}
                </SummaryBadge>
              </SummaryContent>
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
        const defaultItem = propConfig.defaultItem;
        return (
          <StyledDetails>
            <StyledSummary>
              <SummaryContent>
                <SummaryTitle>
                  {propKey}
                  <TypeLabel>(array)</TypeLabel>
                </SummaryTitle>
                <SummaryBadge status="neutral">
                  {currentArray.length} items
                </SummaryBadge>
              </SummaryContent>
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
                  <DisplayLimitContainer>
                    <DisplayLimitLabel>Showing</DisplayLimitLabel>
                    <DisplayLimitInput
                      type="number"
                      min={1}
                      max={localValue.length}
                      value={displayLimit}
                      onChange={(e) =>
                        handleDisplayLimitChange(parseInt(e.target.value))
                      }
                    />
                    <DisplayLimitInfo>
                      of {localValue.length} items
                    </DisplayLimitInfo>
                  </DisplayLimitContainer>
                  {localValue
                    .slice(0, displayLimit)
                    .map((item: any, index: number) => (
                      <StyledDetails key={index}>
                        <StyledSummary>
                          <SummaryContent>
                            <SummaryTitle>item #{index + 1}</SummaryTitle>
                          </SummaryContent>
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
      case "enum": {
        const options = propConfig.options || [];
        const selection = propConfig.selection || "single";
        if (selection === "single") {
          return (
            <StyledDetails>
              <StyledSummary>
                <SummaryContent>
                  <SummaryTitle>
                    {propKey}
                    <TypeLabel>(enum - single)</TypeLabel>
                  </SummaryTitle>
                  <SummaryBadge status="neutral">
                    {localValue || "none"}
                  </SummaryBadge>
                </SummaryContent>
              </StyledSummary>
              <DetailsContent>
                <select
                  value={localValue || ""}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    const option = options.find(
                      (opt) =>
                        typeof opt === "object" &&
                        "value" in opt &&
                        opt.value === selectedValue,
                    );
                    if (
                      option &&
                      typeof option === "object" &&
                      "value" in option
                    ) {
                      handleChange(option.value);
                    } else {
                      handleChange(selectedValue);
                    }
                  }}
                >
                  <option value="">-- Select option --</option>
                  {options.map((option, index) => {
                    if (
                      typeof option === "object" &&
                      "label" in option &&
                      "value" in option
                    ) {
                      return (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      );
                    } else {
                      return (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      );
                    }
                  })}
                </select>
              </DetailsContent>
            </StyledDetails>
          );
        } else {
          const selectedValues = Array.isArray(localValue) ? localValue : [];
          return (
            <StyledDetails>
              <StyledSummary>
                <SummaryContent>
                  <SummaryTitle>
                    {propKey}
                    <TypeLabel>(enum - multiple)</TypeLabel>
                  </SummaryTitle>
                  <SummaryBadge status="neutral">
                    {selectedValues.length} selected
                  </SummaryBadge>
                </SummaryContent>
              </StyledSummary>
              <DetailsContent>
                <MultiSelectContainer>
                  {options.map((option, index) => {
                    const optionValue =
                      typeof option === "object" && "value" in option
                        ? option.value
                        : option;
                    const optionLabel =
                      typeof option === "object" && "label" in option
                        ? option.label
                        : option;
                    const isChecked = selectedValues.includes(optionValue);
                    return (
                      <MultiSelectOption key={index}>
                        <MultiSelectCheckbox
                          type="checkbox"
                          id={`${propKey}-${index}`}
                          checked={isChecked}
                          onChange={(e) => {
                            let newValues;
                            if (e.target.checked) {
                              newValues = [...selectedValues, optionValue];
                            } else {
                              newValues = selectedValues.filter(
                                (v) => v !== optionValue,
                              );
                            }
                            handleChange(newValues);
                          }}
                        />
                        <MultiSelectLabel htmlFor={`${propKey}-${index}`}>
                          {optionLabel}
                        </MultiSelectLabel>
                      </MultiSelectOption>
                    );
                  })}
                </MultiSelectContainer>
              </DetailsContent>
            </StyledDetails>
          );
        }
      }
    }

    return null;
  },
);
