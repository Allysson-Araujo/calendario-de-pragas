import React, { createContext, useState, useContext, useEffect } from "react";
import { Praga, pragas as pragasIniciais, calendario as calendarioInicial, MesCalendario } from "@/data/pragas";

interface PragasContextType {
  pragas: Praga[];
  calendario: MesCalendario[];
  atualizarPraga: (pragaId: string, updates: Partial<Praga>) => void;
  atualizarImagemUrl: (pragaId: string, imageUrl: string) => void;
  excluirPraga: (pragaId: string) => void;
  removerPragaDoMes: (mesNome: string, pragaId: string) => void;
  atualizarIncidencia: (mesNome: string, pragaId: string, incidenciaAlta: boolean) => void;
}

const PragasContext = createContext<PragasContextType | undefined>(undefined);

export const PragasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pragas, setPragas] = useState<Praga[]>(pragasIniciais);
  const [calendario, setCalendario] = useState<MesCalendario[]>(calendarioInicial);

  const atualizarPraga = (pragaId: string, updates: Partial<Praga>) => {
    setPragas(prevPragas => 
      prevPragas.map(praga => 
        praga.id === pragaId ? { ...praga, ...updates } : praga
      )
    );
  };

  const atualizarImagemUrl = (pragaId: string, imageUrl: string) => {
    setPragas(prevPragas => 
      prevPragas.map(praga => 
        praga.id === pragaId ? { ...praga, imagemUrl: imageUrl } : praga
      )
    );
  };

  const excluirPraga = (pragaId: string) => {
    setPragas(prevPragas => prevPragas.filter(praga => praga.id !== pragaId));
    
    setCalendario(prevCalendario => 
      prevCalendario.map(mes => ({
        ...mes,
        pragas: mes.pragas.filter(praga => praga.pragaId !== pragaId)
      }))
    );
  };

  const removerPragaDoMes = (mesNome: string, pragaId: string) => {
    setCalendario(prevCalendario => 
      prevCalendario.map(mes => 
        mes.nome === mesNome 
          ? { ...mes, pragas: mes.pragas.filter(praga => praga.pragaId !== pragaId) }
          : mes
      )
    );
  };

  const atualizarIncidencia = (mesNome: string, pragaId: string, incidenciaAlta: boolean) => {
    setCalendario(prevCalendario => 
      prevCalendario.map(mes => 
        mes.nome === mesNome 
          ? {
              ...mes,
              pragas: mes.pragas.map(praga => 
                praga.pragaId === pragaId 
                  ? { ...praga, incidenciaAlta }
                  : praga
              )
            }
          : mes
      )
    );
  };

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
      removerPragaDoMes,
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
