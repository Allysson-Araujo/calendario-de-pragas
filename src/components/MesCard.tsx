
import { MesCalendario, pragas as todasPragas } from "@/data/pragas";
import { cn } from "@/lib/utils";
import IconePraga from "./IconePraga";

interface MesCardProps {
  mes: MesCalendario;
}

const iconesEstacao: Record<string, string> = {
  verao: '☀️',
  outono: '🍂',
  inverno: '❄️',
  primavera: '🌸'
};

const MesCard = ({ mes }: MesCardProps) => {
  // Encontrar as pragas para este mês
  const pragasDoMes = mes.pragas.map((item) => {
    const praga = todasPragas.find(p => p.id === item.pragaId);
    if (!praga) return null;
    return { praga, incidenciaAlta: item.incidenciaAlta };
  }).filter(Boolean);

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden">
      <div className={cn("p-2 font-bold text-center relative", `${mes.estacao}-header`)}>
        <span className="absolute left-2 top-2">{iconesEstacao[mes.estacao]}</span>
        {mes.nome}
        <span className="absolute right-2 top-2">{iconesEstacao[mes.estacao]}</span>
      </div>
      <div className={cn("flex-1 p-4 grid grid-cols-4 gap-2", mes.estacao)}>
        {pragasDoMes.map((item, index) => (
          item && (
            <IconePraga 
              key={`${mes.nome}-${item.praga.id}-${index}`} 
              praga={item.praga} 
              incidenciaAlta={item.incidenciaAlta} 
            />
          )
        ))}
      </div>
    </div>
  );
};

export default MesCard;
