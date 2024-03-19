import { FaX } from "react-icons/fa6";
import {
  AddTagForm,
  CloseButton,
  DescriptionAndTagsContainer,
  ModalContent,
  ModalWrapper,
  RepositoryName,
  RepositoryOwnerName,
  RepositoryTag,
  StyledDescription,
  TagsContainer,
  TagsList,
} from "./styles";
import { Repository } from "../../pages/RepositoriesList/types";
import { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { FaPlus } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  repo?: Repository;
  onAddTag: (repositoryId: number, text: string) => void;
  onDeleteTag: (repositoryId: number, text: string) => void;
}

export function Modal({ isOpen, onClose, repo, onAddTag, onDeleteTag }: ModalProps) {
  const [tagText, setTagText] = useState("");

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <FaX />
        </CloseButton>
        <RepositoryName>{repo?.name}</RepositoryName>
        <RepositoryOwnerName>{repo?.owner.login}</RepositoryOwnerName>

        <DescriptionAndTagsContainer>
          <StyledDescription>{repo?.description}</StyledDescription>

          <TagsContainer>
            <TagsList>
              {repo?.tags?.map((tag) => (
                <RepositoryTag key={tag.id}>
                  <span>{tag.text}</span>
                  <button onClick={() => onDeleteTag(repo!.id, tag.text)}>
                    <FaX />
                  </button>
                </RepositoryTag>
              ))}
            </TagsList>

            <AddTagForm
              onSubmit={(e) => {
                e.preventDefault();
                onAddTag(repo!.id, tagText);
                setTagText("");
              }}
            >
              <Input
                value={tagText}
                onChange={(e) => {
                  setTagText(e.target.value);
                }}
              />
              <Button type="submit">
                <FaPlus />
              </Button>
            </AddTagForm>
          </TagsContainer>
        </DescriptionAndTagsContainer>
      </ModalContent>
    </ModalWrapper>
  );
}

export default Modal;
