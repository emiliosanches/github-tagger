import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { AuthResponse } from "./types";
import { AuthContext } from "../../contexts/AuthContext";
import { LoginCallbackContainer } from "./styles";

export function LoginCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { dispatch: dispatchAuth } = useApi<AuthResponse>(
    {
      axiosOptions: {
        url: "/auth",
        method: "POST",
      },
      manual: true,
    },
    []
  );
  const { setToken } = useContext(AuthContext);

  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      return navigate("/login");
    }

    dispatchAuth({
      axiosOptions: {
        data: {
          code,
        },
      },
    }).then(({ data }) => {
      setToken(data.access_token);
      navigate("/repositories");
    });
  }, [navigate, code, setToken]);

  return (
    <LoginCallbackContainer>
      {code && <h1>Wait, we are loading your login information...</h1>}
    </LoginCallbackContainer>
  );
}
