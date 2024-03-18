import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
`;

export const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 1.6rem;
  border-bottom: 2px solid black;
`;

export const ListingContainer = styled.main`
  padding: 0 4rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const SearchContainer = styled.section`
  display: flex;
  gap: 1.2rem;
  padding: 3.2rem;
  position: sticky;
  top: 0;
  background: white;
`;

export const RepositoryList = styled.ul`
  list-style-type: none;
  border: 2px solid black;
  border-radius: 20px;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  flex: 1;
`;

export const RepositoryListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 2rem;

  &:not(:last-child) {
    border-bottom: 2px solid black;
  }
`;

export const RepositoryInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const RepositoryName = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

export const RepositoryOwnerName = styled.span`
  font-size: 1rem;
  color: #d2d2d2;
`;

export const RepositoryTagsContainer = styled.section`
  display: flex;
  gap: 0.5rem;
`;

export const RepositoryTag = styled.div`
  background: #f14070;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
`;
