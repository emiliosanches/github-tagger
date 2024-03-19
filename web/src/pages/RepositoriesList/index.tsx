import { useContext, useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import incentivemeLogo from "../../assets/logo.svg";
import { useApi } from "../../hooks/useApi";
import { AuthContext } from "../../contexts/AuthContext";
import { Repository } from "./types";
import {
  Container,
  Header,
  ListingContainer,
  RepositoryInfoContainer,
  RepositoryList,
  RepositoryListItem,
  RepositoryName,
  RepositoryOwnerName,
  RepositoryTag,
  RepositoryTagsContainer,
  SearchContainer,
} from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/RepositoryModal";
import { AxiosError } from "axios";

export function RepositoriesList() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openRepoId, setOpenRepoId] = useState<number>();

  const {
    data: repositories,
    error,
    dispatch: refreshRepos,
  } = useApi<Repository[]>(
    {
      axiosOptions: {
        url: "/repositories",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
    []
  );

  const modalData = useMemo(() => {
    return repositories?.find((r) => r.id === openRepoId);
  }, [openRepoId, repositories]);

  const { dispatch: dispatchAddTag } = useApi(
    {
      axiosOptions: {
        url: "/repositories/:id/tags",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      manual: true,
    },
    []
  );

  const { dispatch: dispatchRemoveTag } = useApi(
    {
      axiosOptions: {
        url: "/repositories/:id/tags/:tagText",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      manual: true,
    },
    []
  );

  useEffect(() => {
    if (error) {
      alert("There was an error when trying to list your starred repos");
      navigate("/");
    }
  }, [error]);

  function handleOpenModal(repo: Repository) {
    setOpenRepoId(repo.id);
  }

  console.log(token);

  async function handleAddTag(repositoryId: number, text: string) {
    try {
      await dispatchAddTag({
        routeParams: {
          id: String(repositoryId),
        },
        axiosOptions: {
          data: {
            tagText: text,
          },
        },
      });

      await refreshRepos();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          alert("There is already a tag with this name in the repository.");
        }
      }

      alert("There was an error when trying to add this tag to the repository");
    }
  }

  async function handleDeleteTag(repositoryId: number, text: string) {
    try {
      await dispatchRemoveTag({
        routeParams: {
          id: String(repositoryId),
          tagText: text,
        },
      });

      await refreshRepos();
    } catch (error) {
      alert(
        "There was an error when trying to remove this tag from the repository"
      );
    }
  }

  return (
    <Container>
      <Header>
        <img src={incentivemeLogo} />
      </Header>
      <ListingContainer>
        <SearchContainer>
          <Input placeholder="Pesquisa por tags" />
          <Button>
            <FaSearch />
          </Button>
        </SearchContainer>
        <RepositoryList>
          {repositories &&
            repositories.map((repo) => (
              <RepositoryListItem
                key={repo.id}
                onClick={() => handleOpenModal(repo)}
              >
                <RepositoryInfoContainer>
                  <RepositoryName>{repo.name}</RepositoryName>
                  <RepositoryOwnerName>{repo.owner.login}</RepositoryOwnerName>
                </RepositoryInfoContainer>
                <RepositoryTagsContainer>
                  {repo.tags?.[0] && (
                    <RepositoryTag>{repo.tags[0].text}</RepositoryTag>
                  )}
                  {repo.tags?.[1] && (
                    <RepositoryTag>{repo.tags[0].text}</RepositoryTag>
                  )}
                  {repo.tags?.[2] && (
                    <RepositoryTag>+{repo.tags.length - 2}</RepositoryTag>
                  )}
                </RepositoryTagsContainer>
              </RepositoryListItem>
            ))}
        </RepositoryList>
      </ListingContainer>

      <Modal
        isOpen={!!modalData}
        onClose={() => setOpenRepoId(undefined)}
        repo={modalData}
        onAddTag={handleAddTag}
        onDeleteTag={handleDeleteTag}
      />
    </Container>
  );
}
