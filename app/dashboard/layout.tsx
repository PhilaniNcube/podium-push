import Container from "@/components/Layout/Container";
import { ReactNode } from "react";

const layout = async ({children}:{children:ReactNode}) => {
  return (
  <main>
    <Container>
      <h1>Dashboard</h1>
      {children}
    </Container>
  </main>
  )
};
export default layout;
