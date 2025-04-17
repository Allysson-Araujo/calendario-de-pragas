
export interface Praga {
  id: string;
  nome: string;
  icone: string;
  imagemUrl?: string;
}

export interface IncidenciaPraga {
  pragaId: string;
  incidenciaAlta: boolean;
}

export interface MesCalendario {
  id: number;
  nome: string;
  estacao: 'verao' | 'outono' | 'inverno' | 'primavera';
  pragas: IncidenciaPraga[];
}

export const estacoes = [
  { id: 'verao', nome: 'Verão', icone: '☀️' },
  { id: 'outono', nome: 'Outono', icone: '🍂' },
  { id: 'inverno', nome: 'Inverno', icone: '❄️' },
  { id: 'primavera', nome: 'Primavera', icone: '🌸' },
];

export const incidencias = [
  { id: 'alta', nome: 'Incidência Alta', cor: 'bg-red-600 text-white' },
  { id: 'media', nome: 'Incidência Média', cor: 'bg-gray-800 text-white' },
];
