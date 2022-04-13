import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { authoriseUser } from "../../Services/api";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
}

function LoginPage() {
 
  return (
    <div style={{ paddingTop: "100px" }}>
      {<LoginButton />}
    </div>
  );
}
export default LoginPage;
