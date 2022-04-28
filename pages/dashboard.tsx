import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { setupApiClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";
import { useCan } from "../hooks/useCan";

export default function Dashboard() {
  const { user, isAuthenticated } = useContext(AuthContext);

  /**Validação de permissão de cargo no lado do browser */
  const userCanSeeMetrics = useCan({
    roles: ["administrator", "editor"],
  });

  useEffect(() => {
    api.get("/me").then((response) => console.log(response));
  }, []);

  return (
    <>
      <h1>Dashboard {user?.email}</h1>

      {userCanSeeMetrics && <div>Métricas</div>}
    </>
  );
}

/** Validação de token server side */
export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);

  const response = await apiClient.get("/me");
  console.log(response.data);

  return {
    props: {},
  };
});
