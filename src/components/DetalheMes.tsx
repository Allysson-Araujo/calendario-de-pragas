
import { MesCalendario } from "@/data/pragas";
import { cn } from "@/lib/utils";
import IconePraga from "./IconePraga";
import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { usePragas } from "@/contexts/PragasContext";

interface DetalheMesProps {
  mes: MesCalendario;
}

const iconesEstacao: Record<string, string> = {
  verao: '☀️',
  outono: '🍂',
  inverno: '❄️',
  primavera: '🌸'
};

const nomeEstacao: Record<string, string> = {
  verao: 'Verão',
  outono: 'Outono',
  inverno: 'Inverno',
  primavera: 'Primavera'
};

const DetalheMes = ({ mes }: DetalheMesProps) => {
  const { pragas, calendario } = usePragas();
  
  // Encontrar as pragas para este mês
  const pragasDoMes = mes.pragas.map((item) => {
    const praga = pragas.find(p => p.id === item.pragaId);
    if (!praga) return null;
    return { praga, incidenciaAlta: item.incidenciaAlta };
  }).filter(Boolean);

  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle className={cn("text-2xl font-bold flex items-center justify-center gap-2", `text-${mes.estacao}-header`)}>
          {iconesEstacao[mes.estacao]} {mes.nome} {iconesEstacao[mes.estacao]}
        </SheetTitle>
        <SheetDescription className="text-center">
          <Badge variant="outline" className={cn("mt-2", `${mes.estacao}-header`)}>
            {nomeEstacao[mes.estacao]}
          </Badge>
        </SheetDescription>
      </SheetHeader>
      
      <div className="pt-4">
        <h3 className="text-lg font-medium mb-3">Pragas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pragasDoMes.map((item, index) => (
            item && (
              <div key={`detalhe-${mes.nome}-${item.praga.id}-${index}`} 
                className="flex items-center gap-2"
              >
                <IconePraga 
                  praga={item.praga} 
                  incidenciaAlta={item.incidenciaAlta}
                  mesNome={mes.nome}
                  allowRemoveFromMonth={false}
                />
                <span className="text-sm font-medium">{item.praga.nome}</span>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetalheMes;
