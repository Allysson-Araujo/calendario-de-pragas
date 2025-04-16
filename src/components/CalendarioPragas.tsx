
import MesCard from "./MesCard";
import Legenda from "./Legenda";
import { usePragas } from "@/contexts/PragasContext";

const CalendarioPragas = () => {
  const { calendario } = usePragas();
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-[#006E41]">
        Calendário de pragas
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {calendario.map((mes) => (
          <MesCard key={mes.nome} mes={mes} />
        ))}
      </div>

      <Legenda />
    </div>
  );
};

export default CalendarioPragas;
