import { ErrorFrame } from "@/components/Frames/ErrorFrame";

const custom500 = () => {
  return (
    <ErrorFrame
      code={500}
      title={"Erro Interno do Servidor"}
      description="Algo deu errado. Tente novamente mais tarde."
    />
  );
};

export default custom500;
