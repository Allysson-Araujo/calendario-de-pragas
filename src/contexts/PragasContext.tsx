
import React, { createContext, useContext } from "react";
import { Praga, MesCalendario } from "@/data/pragas";
import { useSupabasePragas } from "@/hooks/useSupabasePragas";

interface PragasContextType {
  pragas: Praga[];
  calendario: MesCalendario[];
  atualizarPraga: (pragaId: string, updates: Partial<Praga>) => Promise<void>;
  atualizarImagemUrl: (pragaId: string, imageFile: File) => Promise<void>;
  atualizarIncidencia: (mesNome: string, pragaId: string, incidenciaAlta: boolean) => Promise<void>;
}

const PragasContext = createContext<PragasContextType | undefined>(undefined);

export const PragasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    pragas, 
    calendario, 
    atualizarPraga, 
    atualizarImagemUrl, 
    atualizarIncidencia 
  } = useSupabasePragas();

  return (
    <PragasContext.Provider value={{ 
      pragas, 
      calendario, 
      atualizarPraga,
      atualizarImagemUrl,
      atualizarIncidencia
    }}>
      {children}
    </PragasContext.Provider>
  );
};

export const usePragas = () => {
  const context = useContext(PragasContext);
  if (!context) {
    throw new Error("usePragas deve ser usado dentro de um PragasProvider");
  }
  return context;
};
