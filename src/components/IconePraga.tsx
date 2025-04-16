
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Praga } from "@/data/pragas";
import {
  Bug, Insect, Mouse, Bird, Fish, BugOff, Bath, Shell, Rat, Skull
} from "lucide-react";

interface IconePragaProps {
  praga: Praga;
  incidenciaAlta: boolean;
}

// Mapeamento de IDs para ícones do Lucide
const iconMap: Record<string, React.ReactNode> = {
  barata: <Bug className="h-5 w-5" />,
  cupim: <Insect className="h-5 w-5" />,
  formiga: <Insect className="h-5 w-5" />,
  lesma: <Shell className="h-5 w-5" />,
  pombo: <Bird className="h-5 w-5" />,
  caruncho: <Bug className="h-5 w-5" />,
  percevejo: <Bug className="h-5 w-5" />,
  barbeiro: <Insect className="h-5 w-5" />,
  escorpiao: <Skull className="h-5 w-5" />,
  mosca: <Fish className="h-5 w-5" />,  // Using Fish as alternative for Fly
  mosquito: <Bug className="h-5 w-5" />,
  pulga: <BugOff className="h-5 w-5" />,
  rato: <Mouse className="h-5 w-5" />,
  morcego: <Bath className="h-5 w-5" />,  // Using Bath as alternative for Bat
  aranha: <Insect className="h-5 w-5" />,  // Using Insect as alternative for Spider
  carrapato: <Bug className="h-5 w-5" />,
  traca: <BugOff className="h-5 w-5" />,
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
