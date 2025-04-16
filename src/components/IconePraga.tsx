
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Praga } from "@/data/pragas";
import {
  Bug, Spider, Rat, Bird, Fly, Mosquito, Bat, Snail, Scorpion
} from "lucide-react";

interface IconePragaProps {
  praga: Praga;
  incidenciaAlta: boolean;
}

// Mapeamento de IDs para ícones do Lucide
const iconMap: Record<string, React.ReactNode> = {
  barata: <Bug className="h-5 w-5" />,
  cupim: <Bug className="h-5 w-5" />,
  formiga: <Bug className="h-5 w-5" />,
  lesma: <Snail className="h-5 w-5" />,
  pombo: <Bird className="h-5 w-5" />,
  caruncho: <Bug className="h-5 w-5" />,
  percevejo: <Bug className="h-5 w-5" />,
  barbeiro: <Bug className="h-5 w-5" />,
  escorpiao: <Scorpion className="h-5 w-5" />,
  mosca: <Fly className="h-5 w-5" />,
  mosquito: <Mosquito className="h-5 w-5" />,
  pulga: <Bug className="h-5 w-5" />,
  rato: <Rat className="h-5 w-5" />,
  morcego: <Bat className="h-5 w-5" />,
  aranha: <Spider className="h-5 w-5" />,
  carrapato: <Bug className="h-5 w-5" />,
  traca: <Bug className="h-5 w-5" />,
  cascudinho: <Bug className="h-5 w-5" />,
};

const IconePraga = ({ praga, incidenciaAlta }: IconePragaProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "inline-flex items-center justify-center p-1 cursor-help",
              incidenciaAlta ? "praga-alta" : "praga-media"
            )}
          >
            {iconMap[praga.id] || <span>{praga.icone}</span>}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{praga.nome}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default IconePraga;
