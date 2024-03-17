import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { AuthResponse } from "./types";

export function LoginCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { dispatch: dispatchAuth } = useApi<AuthResponse>({
    url: "/auth",
    method: 'POST',
    manual: true,
  });

  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      return navigate("/login");
    }

    dispatchAuth({
      data: {
        code,
      },
    }).then(({ data }) => {
      console.log(data);
    });
  }, [navigate, dispatchAuth, code]);

  return <div>{code && <h1>Wait, you are logging in...</h1>}</div>;
}
