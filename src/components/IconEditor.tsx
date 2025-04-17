import { useState } from "react";
import IconePraga from "./IconePraga";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePragas } from "@/contexts/PragasContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const IconEditor = () => {
  const { pragas, atualizarPraga, excluirPraga, atualizarIncidencia } = usePragas();
  const [editMode, setEditMode] = useState(false);
  
  const handleIconUpdate = (pragaId: string, novoIcone: string) => {
    atualizarPraga(pragaId, { icone: novoIcone });
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

  const handleIncidenciaChange = (pragaId: string, incidenciaAlta: boolean) => {
    const praga = pragas.find(p => p.id === pragaId);
    if (praga) {
      atualizarPraga(pragaId, { incidenciaAlta });
      toast.success(`Incidência atualizada para ${incidenciaAlta ? 'alta' : 'média'}`);
    }
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
              incidenciaAlta={praga.incidenciaAlta || false}
              onIconUpdate={handleIconUpdate}
              onImageUpdate={handleImageUpdate}
              onDelete={handleDelete}
              editMode={editMode}
            />
            <span className="text-xs mt-1">{praga.nome}</span>
            
            {editMode && (
              <RadioGroup
                defaultValue={praga.incidenciaAlta ? "alta" : "media"}
                onValueChange={(value) => handleIncidenciaChange(praga.id, value === "alta")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="alta" id={`alta-${praga.id}`} />
                  <Label htmlFor={`alta-${praga.id}`} className="text-xs">Alta</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="media" id={`media-${praga.id}`} />
                  <Label htmlFor={`media-${praga.id}`} className="text-xs">Média</Label>
                </div>
              </RadioGroup>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconEditor;
