
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

interface IconePragaProps {
  praga: Praga;
  incidenciaAlta: boolean;
  editMode?: boolean;
  onIconUpdate?: (pragaId: string, novoIcone: string) => void;
  onImageUpdate?: (pragaId: string, imageFile: File) => void;
}

const IconePraga = ({
  praga,
  incidenciaAlta,
  editMode = false,
  onIconUpdate,
  onImageUpdate,
}: IconePragaProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [novoIcone, setNovoIcone] = useState(praga.icone);
  const [showImageUpload, setShowImageUpload] = useState(false);

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

  const tooltipText = incidenciaAlta
    ? `${praga.nome} - Alta incidência`
    : `${praga.nome} - Incidência média`;

  // Se estiver em modo de edição, permite ações adicionais
  if (editMode) {
    return (
      <>
        <div className="flex flex-col items-center">
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
              Imagem
            </button>
            <span className="text-xs text-gray-400">|</span>
            <button
              onClick={() => setShowDialog(true)}
              className="text-xs text-blue-500 hover:underline"
            >
              Ícone
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
      </>
    );
  }

  if (praga.imagemUrl) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={cn(
                "w-10 h-10 flex items-center justify-center",
                incidenciaAlta ? "praga-alta" : "praga-media"
              )}
            >
              <img
                src={praga.imagemUrl}
                alt={praga.nome}
                className="w-8 h-8 object-contain"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={cn(
              "text-xl",
              incidenciaAlta ? "praga-alta" : "praga-media"
            )}
          >
            {praga.icone}
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
