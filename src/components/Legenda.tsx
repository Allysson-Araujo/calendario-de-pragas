
import { incidencias, estacoes } from "@/data/pragas";
import { cn } from "@/lib/utils";
import IconePraga from "./IconePraga";
import { usePragas } from "@/contexts/PragasContext";

const Legenda = () => {
  const { pragas } = usePragas();
  
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md">
      <h3 className="text-center font-bold mb-4">LEGENDA:</h3>
      <div className="grid grid-cols-9 gap-4 mb-4 justify-items-center">
        {pragas.slice(0, 9).map((praga) => (
          <div key={praga.id} className="flex flex-col items-center">
            <IconePraga praga={praga} incidenciaAlta={false} />
            <span className="text-xs mt-1">{praga.nome}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-9 gap-4 mb-6 justify-items-center">
        {pragas.slice(9, 18).map((praga) => (
          <div key={praga.id} className="flex flex-col items-center">
            <IconePraga praga={praga} incidenciaAlta={false} />
            <span className="text-xs mt-1">{praga.nome}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        {estacoes.map((estacao) => (
          <div key={estacao.id} className="flex items-center mx-2">
            <div className={cn("rounded-full w-6 h-6 flex items-center justify-center text-white", {
              "bg-blue-800": estacao.id === "inverno",
              "bg-yellow-400": estacao.id === "verao",
              "bg-emerald-400": estacao.id === "outono",
              "bg-orange-400": estacao.id === "primavera",
            })}>
              {estacao.icone}
            </div>
            <span className="text-xs ml-1">{estacao.nome}</span>
          </div>
        ))}
        {incidencias.map((incidencia) => (
          <div key={incidencia.id} className="flex items-center mx-2">
            <div className={cn("rounded-full px-3 py-1 text-xs", incidencia.cor)}>
              {incidencia.nome}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legenda;
