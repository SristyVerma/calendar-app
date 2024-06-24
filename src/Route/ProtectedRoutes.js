import React, { useMemo } from "react";
import { routes } from "../Route/routes";
import { Route, Routes } from "react-router-dom";

const ProtectedRoutes = () => {
  const processedRoutes = useMemo(() => {
    if (routes && routes?.length) {
      return routes?.map((ele, i) =>
        ele?.protected ? (
          <Route key={i} path={ele?.path} element={ele?.component} />
        ) : !ele?.protected ? (
          <Route key={i} path={ele?.path} element={ele?.component} />
        ) : null
      );
    }
  }, []);

  return <Routes>{processedRoutes}</Routes>;
};

export default ProtectedRoutes;
