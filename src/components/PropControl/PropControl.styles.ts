import { Badge } from "storybook/internal/components";
import { styled, typography } from "storybook/theming";

export const StyledDetails = styled.details`
  border: 1px solid
    ${({ theme }) =>
      theme.base === "dark" ? theme.color.dark : theme.color.border};
  margin-bottom: ${({ theme }) => theme.layoutMargin}px;
  background: ${({ theme }) => theme.color.lightest};
`;

export const StyledSummary = styled.summary`
  padding: ${({ theme }) => theme.layoutMargin}px;
  cursor: pointer;
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.s2}px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.color.defaultText};
  background: ${({ theme }) => theme.background.content};

  &:hover {
    background: ${({ theme }) =>
      theme.base === "dark" ? theme.color.darker : theme.color.lighter};
  }

  &::marker {
    display: none;
  }

  &::-webkit-details-marker {
    display: none;
  }

  &::before {
    content: "▶";
    margin-right: ${({ theme }) => theme.layoutMargin}px;
    transition: transform 0.2s;
    color: ${({ theme }) =>
      theme.base === "dark" ? theme.color.mediumlight : theme.color.mediumdark};
  }

  details[open] > &::before {
    transform: rotate(90deg);
  }
`;

export const DetailsContent = styled.div`
  padding: ${({ theme }) => theme.layoutMargin}px;
  background: ${({ theme }) => theme.background.content};
  color: ${({ theme }) => theme.color.defaultText};
  font-size: ${typography.size.s2}px;
`;

export const SummaryContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
`;

export const SummaryTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const TypeLabel = styled.span`
  font-size: ${typography.size.s1}px;
  color: ${({ theme }) =>
    theme.base === "dark" ? theme.color.mediumlight : theme.color.mediumdark};
  margin-left: ${({ theme }) => theme.layoutMargin / 2}px;
`;

export const SummaryBadge = styled(Badge)`
  margin-left: auto;
`;

export const DisplayLimitContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.layoutMargin}px;
  padding: ${({ theme }) => theme.layoutMargin}px;
  background: ${({ theme }) =>
    theme.base === "dark" ? theme.color.darker : theme.color.lighter};
  border-radius: ${({ theme }) => theme.input.borderRadius}px;
`;

export const DisplayLimitLabel = styled.label`
  font-size: ${typography.size.s1}px;
  margin-right: ${({ theme }) => theme.layoutMargin / 2}px;
  color: ${({ theme }) =>
    theme.base === "dark" ? theme.color.mediumlight : theme.color.mediumdark};
`;

export const DisplayLimitInput = styled.input`
  font-size: ${typography.size.s1}px;
  border: 1px solid
    ${({ theme }) =>
      theme.base === "dark" ? theme.color.dark : theme.color.border};
  border-radius: ${({ theme }) => theme.input.borderRadius}px;
  background: ${({ theme }) => theme.background.content};
  color: ${({ theme }) => theme.color.defaultText};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.secondary};
  }
`;

export const DisplayLimitInfo = styled.span`
  font-size: ${typography.size.s1}px;
  margin-left: ${({ theme }) => theme.layoutMargin / 2}px;
  color: ${({ theme }) =>
    theme.base === "dark" ? theme.color.mediumlight : theme.color.mediumdark};
`;

export const DirectEditContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const DirectEditInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.layoutMargin / 2}px;
  font-size: ${typography.size.s2}px;
  border: 1px solid
    ${({ theme }) =>
      theme.base === "dark" ? theme.color.dark : theme.color.border};
  border-radius: ${({ theme }) => theme.input.borderRadius}px;
  background: ${({ theme }) => theme.background.content};
  color: ${({ theme }) => theme.color.defaultText};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.secondary};
  }
`;

export const MultiSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layoutMargin / 2}px;
`;

export const MultiSelectOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.layoutMargin / 2}px;
  padding: ${({ theme }) => theme.layoutMargin / 2}px;
  border-radius: ${({ theme }) => theme.input.borderRadius}px;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) =>
      theme.base === "dark" ? theme.color.darker : theme.color.lighter};
  }
`;

export const MultiSelectCheckbox = styled.input`
  margin-right: ${({ theme }) => theme.layoutMargin / 2}px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.color.secondary};
`;

export const MultiSelectLabel = styled.label`
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.size.s2}px;
  color: ${({ theme }) => theme.color.defaultText};
  user-select: none;
  flex: 1;
`;

export const RangeInput = styled.input`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.layoutMargin}px;
`;

export const DeleteButton = styled.button`
  background: ${({ theme }) => theme.color.negative};
  color: ${({ theme }) => theme.color.lightest};
  cursor: pointer;
  border: transparent;

  &::before {
    content: "×";
    font-size: ${typography.size.s2}px;
    font-weight: bold;
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
