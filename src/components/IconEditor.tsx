
import { useState } from "react";
import { pragas as todasPragas, Praga } from "@/data/pragas";
import IconePraga from "./IconePraga";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const IconEditor = () => {
  const [pragas, setPragas] = useState<Praga[]>(todasPragas);
  const [editMode, setEditMode] = useState(false);
  
  const handleIconUpdate = (pragaId: string, novoIcone: string) => {
    setPragas(prevPragas => 
      prevPragas.map(praga => 
        praga.id === pragaId ? { ...praga, icone: novoIcone } : praga
      )
    );
    toast.success("Ícone atualizado com sucesso");
  };
  
  const handleImageUpdate = (pragaId: string, imageFile: File) => {
    // Verificar o tamanho do arquivo (opcional)
    if (imageFile.size > 5 * 1024 * 1024) { // 5MB limite
      toast.error("Imagem muito grande. Máximo de 5MB permitido.");
      return;
    }
    
    // Criar um objeto URL para a imagem
    const reader = new FileReader();
    
    reader.onload = (e) => {
      // Criar um elemento de imagem para verificar as dimensões
      const img = new Image();
      img.onload = () => {
        // Redimensionar para 150x150 usando canvas
        const canvas = document.createElement("canvas");
        canvas.width = 150;
        canvas.height = 150;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
          // Desenhar a imagem redimensionada
          ctx.drawImage(img, 0, 0, 150, 150);
          
          // Converter para URL de dados
          const resizedImageUrl = canvas.toDataURL("image/png");
          
          // Atualizar o estado
          setPragas(prevPragas => 
            prevPragas.map(praga => 
              praga.id === pragaId ? { ...praga, imagemUrl: resizedImageUrl } : praga
            )
          );
          
          toast.success("Imagem carregada com sucesso");
        }
      };
      
      img.src = e.target?.result as string;
    };
    
    reader.readAsDataURL(imageFile);
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
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {pragas.map(praga => (
          <div key={praga.id} className="flex flex-col items-center">
            <IconePraga 
              praga={praga} 
              incidenciaAlta={false} 
              onIconUpdate={handleIconUpdate}
              onImageUpdate={handleImageUpdate}
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
