
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Praga, MesCalendario } from '@/data/pragas';

export const useSupabasePragas = () => {
  const [pragas, setPragas] = useState<Praga[]>([]);
  const [calendario, setCalendario] = useState<MesCalendario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // Fetch pragas
      const { data: pragasData, error: pragasError } = await supabase
        .from('pragas')
        .select('*');

      if (pragasError) throw pragasError;

      // Fetch calendario
      const { data: calendarioData, error: calendarioError } = await supabase
        .from('calendario')
        .select('*')
        .order('id');

      if (calendarioError) throw calendarioError;

      setPragas(pragasData);
      setCalendario(calendarioData.map(item => ({
        ...item,
        pragas: JSON.parse(item.pragas as string)
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const atualizarPraga = async (pragaId: string, updates: Partial<Praga>) => {
    try {
      const { error } = await supabase
        .from('pragas')
        .update(updates)
        .eq('id', pragaId);

      if (error) throw error;
      
      // Update local state
      setPragas(prev => prev.map(praga => 
        praga.id === pragaId ? { ...praga, ...updates } : praga
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const atualizarImagemUrl = async (pragaId: string, imageFile: File) => {
    try {
      const filePath = `${pragaId}-${Date.now()}`;
      const { error: uploadError, data } = await supabase.storage
        .from('pest-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      if (data) {
        const { data: { publicUrl } } = supabase.storage
          .from('pest-images')
          .getPublicUrl(data.path);

        await atualizarPraga(pragaId, { imagemUrl: publicUrl });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const atualizarIncidencia = async (mesNome: string, pragaId: string, incidenciaAlta: boolean) => {
    try {
      const mes = calendario.find(m => m.nome === mesNome);
      if (!mes) return;

      const novasPragas = mes.pragas.map(p => 
        p.pragaId === pragaId ? { ...p, incidenciaAlta } : p
      );

      const { error } = await supabase
        .from('calendario')
        .update({ pragas: JSON.stringify(novasPragas) })
        .eq('mes', mesNome);

      if (error) throw error;

      setCalendario(prev => prev.map(m => 
        m.nome === mesNome ? { ...m, pragas: novasPragas } : m
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    pragas,
    calendario,
    loading,
    error,
    atualizarPraga,
    atualizarImagemUrl,
    atualizarIncidencia
  };
};
