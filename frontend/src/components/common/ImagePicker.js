import React, { useRef } from "react";
import styled from "styled-components";

const ImagePicker = ({
  image,
  onChange,
  label,
  borderColor,
  width,
  height,
}) => {
  const profilePictureRef = useRef();

  const openFileSelector = () => {
    profilePictureRef.current.click();
  };

  const handleChange = (e) => {
    handleFile(e.target.files);
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange({ asBase64: e.target.result, file });
    };
    reader.readAsDataURL(file[0]);
  };

  const handleDragAndDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files);
  };

  return (
    <Div borderColor={borderColor} width={width} height={height}>
      <Label>{label}</Label>
      <div
        onDragEnter={handleDragAndDrop}
        onDragLeave={handleDragAndDrop}
        onDragOver={handleDragAndDrop}
        onDrop={handleDragAndDrop}
        onClick={openFileSelector}
        className={image ? "drop-region has-image" : "drop-region"}
      >
        <div className={image ? "display-none" : "drop-message"}>
          Drag & Drop images or click to upload
          <input
            onChange={handleChange}
            ref={profilePictureRef}
            type="file"
            accept="image/*"
            multiple={false}
          />
        </div>
        <div className={image ? "drop-image-preview" : "display-none"}>
          <img
            className={image ? "show-image" : "display-none"}
            src={image?.asBase64 || image}
            alt="profile"
          />
        </div>
      </div>
    </Div>
  );
};

export const Label = styled.label`
  display: block;
  padding: 0px 0px 3px 5px;
  text-transform: uppercase;
  font-size: 0.7rem;
`;

const Div = styled.div`
  display: block;
  .drop-region {
    position: relative;
    display: table-cell;
    ${({ borderColor, width, height }) =>
      `width:${width};height:${height};border: 3px dashed ${borderColor};`}
    font-size: 0.8rem;
    vertical-align: middle;
    padding: 0 10px;
    text-align: center;
    overflow: hidden;
    cursor: move;
    input[type="file"] {
      display: none;
    }
    &.has-image {
      border: none;
      padding: 0;
    }
    .success-upload {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 160px;
      height: 160px;
      background-color: rgba(0, 0, 0, 0.7);
      font-size: 1.6rem;
      color: #00e676;
      transition: all 0.3s;
      display: block;
      span {
        display: block;
        color: #fff;
        font-size: 0.6rem;
        text-transform: uppercase;
        margin-top: 10px;
      }
    }
  }
  .drop-image-preview {
    ${({ width, height }) => `width:${width};height:${height};`};
    overflow-y: hidden;
  }
  .display-none {
    display: none;
  }
  .show-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default ImagePicker;
