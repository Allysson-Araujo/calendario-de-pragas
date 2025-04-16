
import { useState } from "react";
import { pragas as todasPragas } from "@/data/pragas";
import IconePraga from "./IconePraga";
import { Button } from "@/components/ui/button";

const IconEditor = () => {
  const [pragas, setPragas] = useState(todasPragas);
  const [editMode, setEditMode] = useState(false);
  
  const handleIconUpdate = (pragaId: string, novoIcone: string) => {
    setPragas(prevPragas => 
      prevPragas.map(praga => 
        praga.id === pragaId ? { ...praga, icone: novoIcone } : praga
      )
    );
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Editor de Ícones</h2>
        <Button
          variant={editMode ? "destructive" : "outline"}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Finalizar Edição" : "Editar Ícones"}
        </Button>
      </div>
      
      <div className="grid grid-cols-6 gap-4">
        {pragas.map(praga => (
          <div key={praga.id} className="flex flex-col items-center">
            <IconePraga 
              praga={praga} 
              incidenciaAlta={false} 
              onIconUpdate={handleIconUpdate}
              editMode={editMode}
            />
            <span className="text-xs mt-1">{praga.nome}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconEditor;
