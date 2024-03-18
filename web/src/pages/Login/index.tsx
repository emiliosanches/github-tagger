// import { Container } from './styles';

const githubLoginURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${
  import.meta.env.VITE_CLIENT_ID
}&redirect_uri=${encodeURIComponent(
  import.meta.env.VITE_REDIRECT_URI
)}&scope=read:user,user:email`;

export function Login() {
  return (
    <div>
      <h1>Bem-vindo!</h1>
      <p>Entre no nosso sistema utilizando o GitHub</p>
      <a href={githubLoginURL}>Entrar com GitHub</a>
    </div>
  );
}
