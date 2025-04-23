import { ErrorFrame } from "@/components/Frames/ErrorFrame";

const NotFoundPage = () => {
  return (
    <ErrorFrame
      code={404}
      title={"Página não encontrada"}
      description="Desculpe não conseguimos encontrar essa página clique no botão abaixo
          para voltar para a tela inicial"
    />
  );
};

export default NotFoundPage;
