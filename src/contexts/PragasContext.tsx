
import React, { createContext, useState, useContext, useEffect } from "react";
import { Praga, pragas as pragasIniciais } from "@/data/pragas";

interface PragasContextType {
  pragas: Praga[];
  atualizarPraga: (pragaId: string, updates: Partial<Praga>) => void;
}

// Criar contexto
const PragasContext = createContext<PragasContextType | undefined>(undefined);

// Provider component
export const PragasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pragas, setPragas] = useState<Praga[]>(pragasIniciais);

  // Função para atualizar uma praga
  const atualizarPraga = (pragaId: string, updates: Partial<Praga>) => {
    setPragas(prevPragas => 
      prevPragas.map(praga => 
        praga.id === pragaId ? { ...praga, ...updates } : praga
      )
    );
  };

  // Armazenar pragas no localStorage para persistência
  useEffect(() => {
    const pragasSalvas = localStorage.getItem('pragas');
    if (pragasSalvas) {
      setPragas(JSON.parse(pragasSalvas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pragas', JSON.stringify(pragas));
  }, [pragas]);

  return (
    <PragasContext.Provider value={{ pragas, atualizarPraga }}>
      {children}
    </PragasContext.Provider>
  );
};

// Hook para usar o contexto
export const usePragas = () => {
  const context = useContext(PragasContext);
  if (!context) {
    throw new Error("usePragas deve ser usado dentro de um PragasProvider");
  }
  return context;
};
