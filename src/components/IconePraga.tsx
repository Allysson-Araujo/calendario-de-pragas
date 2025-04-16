import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Praga } from "@/data/pragas";
import {
  Bug, Mouse, Bird, Fish, BugOff, Bath, Shell, Rat, Skull, Snail
} from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

interface IconePragaProps {
  praga: Praga;
  incidenciaAlta: boolean;
  onIconUpdate?: (pragaId: string, novoIcone: string) => void;
  onImageUpdate?: (pragaId: string, imageFile: File) => void;
  editMode?: boolean;
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
  escorpiao: <Skull className="h-5 w-5" />,
  mosca: <Fish className="h-5 w-5" />,
  mosquito: <Bug className="h-5 w-5" />,
  pulga: <BugOff className="h-5 w-5" />,
  rato: <Mouse className="h-5 w-5" />,
  morcego: <Bath className="h-5 w-5" />,
  aranha: <Bug className="h-5 w-5" />,
  carrapato: <Bug className="h-5 w-5" />,
  traca: <BugOff className="h-5 w-5" />,
  cascudinho: <Bug className="h-5 w-5" />,
};

const IconePraga = ({ praga, incidenciaAlta, onIconUpdate, onImageUpdate, editMode = false }: IconePragaProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [novoIcone, setNovoIcone] = useState(praga.icone);
  
  const handleDoubleClick = () => {
    if (editMode) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (onIconUpdate) {
      onIconUpdate(praga.id, novoIcone);
    }
    setIsEditing(false);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onImageUpdate) {
      onImageUpdate(praga.id, e.target.files[0]);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex flex-col items-center space-y-2 p-2 border border-dashed border-gray-300 rounded">
        <Input
          type="text"
          value={novoIcone}
          onChange={(e) => setNovoIcone(e.target.value)}
          className="w-16 h-8 text-center"
          maxLength={2}
        />
        
        <label className="flex flex-col items-center text-xs text-blue-600 cursor-pointer">
          <span>Enviar imagem</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        
        <div className="flex justify-between w-full">
          <button
            onClick={() => setIsEditing(false)}
            className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            ✕
          </button>
          <button
            onClick={handleSave}
            className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
          >
            ✓
          </button>
        </div>
      </div>
    );
  }

  // Render uploaded image if available
  if (praga.imagemUrl) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "inline-flex items-center justify-center cursor-help",
                incidenciaAlta ? "praga-alta" : "praga-media",
                editMode ? "cursor-pointer border border-dashed border-gray-300" : ""
              )}
              onDoubleClick={handleDoubleClick}
            >
              <img 
                src={praga.imagemUrl} 
                alt={praga.nome}
                className="w-9 h-9 object-contain" 
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{praga.nome}</p>
            {editMode && <p className="text-xs text-gray-500">(Clique duplo para editar)</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Render default icon
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "inline-flex items-center justify-center p-1 cursor-help",
              incidenciaAlta ? "praga-alta" : "praga-media",
              editMode ? "cursor-pointer border border-dashed border-gray-300" : ""
            )}
            onDoubleClick={handleDoubleClick}
          >
            {iconMap[praga.id] || <span>{praga.icone}</span>}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{praga.nome}</p>
          {editMode && <p className="text-xs text-gray-500">(Clique duplo para editar)</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default IconePraga;
