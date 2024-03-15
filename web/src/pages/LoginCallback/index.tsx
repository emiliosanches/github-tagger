import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function LoginCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      return navigate("/login");
    }

    console.log(code);
  }, [navigate, code]);

  return <div>{code && <h1>You are logged in!</h1>}</div>;
}
