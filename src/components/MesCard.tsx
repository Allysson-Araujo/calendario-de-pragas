
import { MesCalendario } from "@/data/pragas";
import { cn } from "@/lib/utils";
import IconePraga from "./IconePraga";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import DetalheMes from "./DetalheMes";
import { usePragas } from "@/contexts/PragasContext";

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
  const { pragas } = usePragas();
  
  // Encontrar as pragas para este mês
  const pragasDoMes = mes.pragas.map((item) => {
    const praga = pragas.find(p => p.id === item.pragaId);
    if (!praga) return null;
    return { praga, incidenciaAlta: item.incidenciaAlta };
  }).filter(Boolean);

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <div className="flex flex-col h-full border rounded-md overflow-hidden hover:shadow-md transition-shadow">
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
      </SheetTrigger>
      
      <SheetContent className={cn("w-full sm:max-w-md md:max-w-lg", mes.estacao)} side="right">
        <DetalheMes mes={mes} />
      </SheetContent>
    </Sheet>
  );
};

export default MesCard;
