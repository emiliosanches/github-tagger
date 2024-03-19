import logoImg from "../../assets/logo.svg";
import githubLogo from "../../assets/github.svg";

import { GithubLoginLink, LoginPageContainer } from "./styles";

const githubLoginURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${
  import.meta.env.VITE_CLIENT_ID
}&redirect_uri=${encodeURIComponent(
  import.meta.env.VITE_REDIRECT_URI
)}&scope=read:user,user:email`;

export function Login() {
  return (
    <LoginPageContainer>
      <img src={logoImg} />
      <GithubLoginLink href={githubLoginURL}>
        <img src={githubLogo} />
        Login with GitHub
      </GithubLoginLink>
    </LoginPageContainer>
  );
}
