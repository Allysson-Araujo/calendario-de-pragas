
import { useState } from "react";
import IconePraga from "./IconePraga";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePragas } from "@/contexts/PragasContext";

const IconEditor = () => {
  const { pragas, atualizarPraga, excluirPraga } = usePragas();
  const [editMode, setEditMode] = useState(false);
  
  const handleIconUpdate = (pragaId: string, novoIcone: string) => {
    atualizarPraga(pragaId, { icone: novoIcone });
    toast.success("Ícone atualizado com sucesso");
  };
  
  const handleImageUpdate = (pragaId: string, imageFile: File) => {
    if (imageFile.size > 5 * 1024 * 1024) {
      toast.error("Imagem muito grande. Máximo de 5MB permitido.");
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 150;
        canvas.height = 150;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, 150, 150);
          const resizedImageUrl = canvas.toDataURL("image/png");
          atualizarPraga(pragaId, { imagemUrl: resizedImageUrl });
          toast.success("Imagem carregada com sucesso");
        }
      };
      
      img.src = e.target?.result as string;
    };
    
    reader.readAsDataURL(imageFile);
  };

  const handleDelete = (pragaId: string) => {
    excluirPraga(pragaId);
    toast.success("Praga excluída com sucesso");
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
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {pragas.map(praga => (
          <div key={praga.id} className="flex flex-col items-center space-y-2">
            <IconePraga 
              praga={praga}
              incidenciaAlta={false}
              onIconUpdate={handleIconUpdate}
              onImageUpdate={handleImageUpdate}
              onDelete={handleDelete}
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
