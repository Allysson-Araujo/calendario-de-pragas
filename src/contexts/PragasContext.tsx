
import React, { createContext, useState, useContext, useEffect } from "react";
import { Praga, pragas as pragasIniciais, calendario as calendarioInicial, MesCalendario } from "@/data/pragas";

interface PragasContextType {
  pragas: Praga[];
  calendario: MesCalendario[];
  atualizarPraga: (pragaId: string, updates: Partial<Praga>) => void;
  atualizarImagemUrl: (pragaId: string, imageUrl: string) => void;
  excluirPraga: (pragaId: string) => void;
  removerPragaDoMes: (mesNome: string, pragaId: string) => void;
}

// Criar contexto
const PragasContext = createContext<PragasContextType | undefined>(undefined);

// Provider component
export const PragasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pragas, setPragas] = useState<Praga[]>(pragasIniciais);
  const [calendario, setCalendario] = useState<MesCalendario[]>(calendarioInicial);

  // Função para atualizar uma praga
  const atualizarPraga = (pragaId: string, updates: Partial<Praga>) => {
    setPragas(prevPragas => 
      prevPragas.map(praga => 
        praga.id === pragaId ? { ...praga, ...updates } : praga
      )
    );
  };

  // Função para atualizar diretamente a URL da imagem
  const atualizarImagemUrl = (pragaId: string, imageUrl: string) => {
    setPragas(prevPragas => 
      prevPragas.map(praga => 
        praga.id === pragaId ? { ...praga, imagemUrl: imageUrl } : praga
      )
    );
  };

  // Função para excluir uma praga
  const excluirPraga = (pragaId: string) => {
    setPragas(prevPragas => prevPragas.filter(praga => praga.id !== pragaId));
    
    // Também remover a praga de todos os meses no calendário
    setCalendario(prevCalendario => 
      prevCalendario.map(mes => ({
        ...mes,
        pragas: mes.pragas.filter(praga => praga.pragaId !== pragaId)
      }))
    );
  };

  // Função para remover uma praga específica de um mês
  const removerPragaDoMes = (mesNome: string, pragaId: string) => {
    setCalendario(prevCalendario => 
      prevCalendario.map(mes => 
        mes.nome === mesNome 
          ? { ...mes, pragas: mes.pragas.filter(praga => praga.pragaId !== pragaId) }
          : mes
      )
    );
  };

  // Armazenar pragas e calendário no localStorage para persistência
  useEffect(() => {
    const pragasSalvas = localStorage.getItem('pragas');
    const calendarioSalvo = localStorage.getItem('calendario');
    
    if (pragasSalvas) {
      setPragas(JSON.parse(pragasSalvas));
    }
    
    if (calendarioSalvo) {
      setCalendario(JSON.parse(calendarioSalvo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pragas', JSON.stringify(pragas));
    localStorage.setItem('calendario', JSON.stringify(calendario));
  }, [pragas, calendario]);

  return (
    <PragasContext.Provider value={{ 
      pragas, 
      calendario, 
      atualizarPraga, 
      atualizarImagemUrl,
      excluirPraga,
      removerPragaDoMes
    }}>
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
