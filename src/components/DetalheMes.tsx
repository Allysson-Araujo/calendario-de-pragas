
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
  const { pragas } = usePragas();
  
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
      
      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-3">Incidência de Pragas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pragasDoMes.map((item, index) => (
            item && (
              <div key={`detalhe-${mes.nome}-${item.praga.id}-${index}`} 
                className={cn(
                  "flex flex-col items-center p-3 border rounded-md",
                  item.incidenciaAlta ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50"
                )}
              >
                <div className="mb-2">
                  <IconePraga 
                    praga={item.praga} 
                    incidenciaAlta={item.incidenciaAlta} 
                    mesNome={mes.nome}
                    allowRemoveFromMonth={true}
                  />
                </div>
                <p className="text-sm font-medium text-center">{item.praga.nome}</p>
                <Badge className={cn("mt-2", item.incidenciaAlta ? "bg-red-500" : "bg-gray-500")}>
                  {item.incidenciaAlta ? "Alta Incidência" : "Incidência Média"}
                </Badge>
              </div>
            )
          ))}
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-1">Recomendações</h3>
        <p className="text-sm text-muted-foreground">
          Estas são as pragas monitorizadas neste período. Consulte um especialista para recomendações específicas 
          de tratamento e prevenção.
        </p>
      </div>
    </div>
  );
};

export default DetalheMes;
