
import React, { useState } from "react";
import { Praga } from "@/data/pragas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { usePragas } from "@/contexts/PragasContext";
import { X } from "lucide-react";

interface IconePragaProps {
  praga: Praga;
  incidenciaAlta: boolean;
  editMode?: boolean;
  onIconUpdate?: (pragaId: string, novoIcone: string) => void;
  onImageUpdate?: (pragaId: string, imageFile: File) => void;
  onDelete?: (pragaId: string) => void;
  mesNome?: string;
  allowRemoveFromMonth?: boolean;
}

const IconePraga = ({
  praga,
  incidenciaAlta,
  editMode = false,
  onIconUpdate,
  onImageUpdate,
  onDelete,
  mesNome,
  allowRemoveFromMonth = false,
}: IconePragaProps) => {
  const { atualizarImagemUrl, excluirPraga, removerPragaDoMes } = usePragas();
  const [showDialog, setShowDialog] = useState(false);
  const [novoIcone, setNovoIcone] = useState(praga.icone);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState(praga.imagemUrl || "");

  const handleIconClick = () => {
    if (editMode && onIconUpdate) {
      setShowDialog(true);
    }
  };

  const handleSave = () => {
    if (onIconUpdate) {
      onIconUpdate(praga.id, novoIcone);
      setShowDialog(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpdate) {
      onImageUpdate(praga.id, file);
      setShowImageUpload(false);
    }
  };

  const handleImageUrlSave = () => {
    if (imageUrl.trim()) {
      atualizarImagemUrl(praga.id, imageUrl);
      setShowImageUrlInput(false);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(praga.id);
    } else {
      excluirPraga(praga.id);
    }
  };

  const handleRemoveFromMonth = () => {
    if (mesNome) {
      removerPragaDoMes(mesNome, praga.id);
    }
  };

  const tooltipText = incidenciaAlta
    ? `${praga.nome} - Alta incidência`
    : `${praga.nome} - Incidência média`;

  // Se estiver em modo de edição, permite ações adicionais
  if (editMode) {
    return (
      <>
        <div className="flex flex-col items-center relative">
          <div
            onClick={handleIconClick}
            className={cn(
              "cursor-pointer p-2 rounded-md border-2 border-dashed border-gray-300 hover:border-blue-500 flex items-center justify-center w-16 h-16",
              incidenciaAlta ? "praga-alta" : "praga-media"
            )}
          >
            {praga.imagemUrl ? (
              <img
                src={praga.imagemUrl}
                alt={praga.nome}
                className="w-14 h-14 object-contain"
              />
            ) : (
              <span className="text-3xl">{praga.icone}</span>
            )}
          </div>

          <div className="mt-1 space-x-1">
            <button
              onClick={() => setShowImageUpload(true)}
              className="text-xs text-blue-500 hover:underline"
            >
              Upload
            </button>
            <span className="text-xs text-gray-400">|</span>
            <button
              onClick={() => setShowImageUrlInput(true)}
              className="text-xs text-blue-500 hover:underline"
            >
              URL
            </button>
            <span className="text-xs text-gray-400">|</span>
            <button
              onClick={() => setShowDialog(true)}
              className="text-xs text-blue-500 hover:underline"
            >
              Ícone
            </button>
            <span className="text-xs text-gray-400">|</span>
            <button
              onClick={handleDelete}
              className="text-xs text-red-500 hover:underline"
            >
              Excluir
            </button>
          </div>
        </div>

        {/* Dialog para editar ícone */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Ícone para {praga.nome}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                value={novoIcone}
                onChange={(e) => setNovoIcone(e.target.value)}
                placeholder="Digite um emoji ou caractere"
              />
              <div className="mt-4 text-center">
                <span className="text-5xl">{novoIcone}</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog para upload de imagem */}
        <Dialog open={showImageUpload} onOpenChange={setShowImageUpload}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Carregar Imagem para {praga.nome}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <p className="text-xs text-gray-500 mt-2">
                A imagem será redimensionada para 150x150 pixels
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog para input de URL de imagem */}
        <Dialog open={showImageUrlInput} onOpenChange={setShowImageUrlInput}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>URL da Imagem para {praga.nome}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Cole a URL da imagem aqui"
              />
              {imageUrl && (
                <div className="mt-4 text-center">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-w-full h-auto max-h-32 mx-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/150x150/eee/ccc?text=Erro";
                    }}
                  />
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Recomendado: imagem de 150x150 pixels
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowImageUrlInput(false)}>
                Cancelar
              </Button>
              <Button onClick={handleImageUrlSave}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="relative">
            <div
              className={cn(
                "w-10 h-10 flex items-center justify-center",
                incidenciaAlta ? "praga-alta" : "praga-media"
              )}
            >
              {praga.imagemUrl ? (
                <img
                  src={praga.imagemUrl}
                  alt={praga.nome}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="text-xl">{praga.icone}</span>
              )}
            </div>
            
            {allowRemoveFromMonth && mesNome && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFromMonth();
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default IconePraga;
