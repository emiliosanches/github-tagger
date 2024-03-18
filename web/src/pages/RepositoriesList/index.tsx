import { useContext, useEffect } from "react";
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

export function RepositoriesList() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: repositories, error } = useApi<Repository[]>(
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

  useEffect(() => {
    if (error) {
      alert("There was an error when trying to list your starred repos");
      navigate("/");
    }
  }, [error]);

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
              <RepositoryListItem>
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
    </Container>
  );
}
