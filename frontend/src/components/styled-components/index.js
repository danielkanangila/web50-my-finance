import styled from "styled-components";

const css = String.raw;

export const Error = styled.span`
  ${() => css`
    display: block;
    margin-top: 5px;
    font-size: 0.8rem;
    color: #e04040;
    transition: all 0.3s ease;
    text-align: left;
    display: flex;
    flex-direction: column;
    i {
      position: relative;
      display: flex;
      align-items: center;
      &::before {
        display: block;
        content: "";
        width: 5px;
        height: 5px;
        border-radius: 50%;
        margin-right: 10px;
        background-color: #e04040;
      }
    }
  `}
`;

export const TextFieldWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  position: relative;

  input,
  textarea {
    outline: none;
    border: none;
    -webkit-appearance: none;
    appearance: none;
    font-size: 100%;
    transition: all 0.3s ease;
    /** Setting border & padding based on _style props **/
    ${(props) =>
      props._style &&
      css`
        ${props._style.borderBottom
          ? css`
              border-bottom: ${props._style.borderSize}px solid
                ${props._style.borderColor};
              padding: 15px 15px 15px 0px;
            `
          : css`
              border: ${props._style.borderSize}px solid
                ${props._style.borderColor};
              border-radius: ${props._style.borderRadius}px;
              padding: 15px;
            `}
        &:focus {
          border-color: ${props._style.colorPrimary};
          outline: 0;
        }
        &.error {
          border-color: ${props._style.errorColor};
          color: ${props._style.errorColor};
        }
      `}

    ${(props) =>
      (!props.isEmpty || props.focus) &&
      css`
        ${props._style.borderBottom
          ? css`
              padding: 22px 15px 8px 0px;
            `
          : css`
              padding: 22px 15px 8px 15px;
            `}
      `}
  &[type="password"] {
      padding-right: 40px;
    }
  }

  label {
    position: absolute;
    transition: all 0.3s ease;
    /** Setting left position and color **/
    ${(props) =>
      props._style &&
      css`
        color: ${props._style.colorDefault};
        ${props._style.borderBottom
          ? css`
              left: 0;
            `
          : css`
              left: 15px;
            `}
        &.error {
          color: ${props._style.errorColor};
        }
      `}
    /** Others **/
  ${(props) =>
      props.isEmpty &&
      css`
        top: 17px;
        font-size: 100%;
      `}
  ${(props) =>
      (!props.isEmpty || props.focus) &&
      css`
        top: ${props._style.focusedLabelTopPosition}px;
        font-size: 0.7rem;
        font-weight: bold;
        color: ${props._style.colorPrimary};
      `}
  ${(props) =>
      !props.focus &&
      !props.isEmpty &&
      css`
        color: ${props._style.labelFocusedColor};
      `}
  }

  input:focus::-webkit-input-placeholder {
    opacity: 1;
  }

  .pwd-visibility {
    position: absolute;
    top: 17px;
    right: 15px;
    cursor: pointer;
    ${({ _style }) => css`
      svg {
        transition: all 0.3s ease;
        fill: ${_style.colorPrimary};
      }
    `}

    &:hover svg {
      ${(props) =>
        props._style &&
        css`
          fill: "#10B981";
        `}
    }
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  position: relative;
  .box {
    display: block;
    position: absolute;
    width: 25px;
    height: 25px;
    transition: 0.3s;
    cursor: pointer;
    ${({ theme }) =>
      `border: solid 2px ${theme.borderColor};background-color: ${theme.notCheckedBg};color: ${theme.color};`};
    &:hover,
    &.checked {
      ${({ theme }) =>
        `background-color: ${theme.checkedBg}; border-color: ${theme.checkedBg};`};
    }
  }
  .checkmark {
    position: absolute;
    left: 10px;
    top: 4.5px;
    width: 5px;
    height: 10px;
    ${({ theme }) => `border solid ${theme.color}`};
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  label {
    margin: 0;
    padding: 0;
    margin-left: 35px;
  }
`;

export const HomeButtonWrapper = styled.div`
  position: absolute;
  height: fit-content;
  top: 10px;
  left: 15px;
  z-index: 10;
  a > * {
    color: #ffffff;
  }

  svg {
    z-index: 10;
    fill: #ffffff;
  }
`;
