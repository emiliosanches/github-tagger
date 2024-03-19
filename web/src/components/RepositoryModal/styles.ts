import styled, { css } from "styled-components";

export const ModalWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  ${({ isOpen }) =>
    !isOpen &&
    css`
      display: none;
    `}
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(800px, 80vw);
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ccc;

  &:hover {
    color: #999;
  }
`;

export const RepositoryName = styled.h2``;

export const RepositoryOwnerName = styled.span`
  color: #555;
`;

export const DescriptionAndTagsContainer = styled.section`
  display: flex;
  gap: 1rem;

  margin-top: 2.5rem;
`;

export const StyledDescription = styled.div`
  flex: 0.5;
  height: fit-content;
`;

export const TagsContainer = styled.div`
  flex: 0.5;
`;

export const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
`;

export const RepositoryTag = styled.div`
  background: #f14070;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
`;

export const AddTagForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;
