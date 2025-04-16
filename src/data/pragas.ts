
export interface Praga {
  id: string;
  nome: string;
  icone: string;
}

export interface IncidenciaPraga {
  pragaId: string;
  incidenciaAlta: boolean;
}

export interface MesCalendario {
  nome: string;
  estacao: 'verao' | 'outono' | 'inverno' | 'primavera';
  pragas: IncidenciaPraga[];
}

// Definição das pragas
export const pragas: Praga[] = [
  { id: 'barata', nome: 'Barata', icone: '🪳' },
  { id: 'cupim', nome: 'Cupim', icone: '🐜' },
  { id: 'formiga', nome: 'Formiga', icone: '🐜' },
  { id: 'lesma', nome: 'Lesma', icone: '🐌' },
  { id: 'pombo', nome: 'Pombo', icone: '🕊️' },
  { id: 'caruncho', nome: 'Caruncho', icone: '🐞' },
  { id: 'percevejo', nome: 'Percevejo', icone: '🐜' },
  { id: 'barbeiro', nome: 'Barbeiro', icone: '🦟' },
  { id: 'escorpiao', nome: 'Escorpião', icone: '🦂' },
  { id: 'mosca', nome: 'Mosca', icone: '🪰' },
  { id: 'mosquito', nome: 'Mosquito', icone: '🦟' },
  { id: 'pulga', nome: 'Pulga', icone: '🐜' },
  { id: 'rato', nome: 'Rato', icone: '🐀' },
  { id: 'morcego', nome: 'Morcego', icone: '🦇' },
  { id: 'aranha', nome: 'Aranha', icone: '🕷️' },
  { id: 'carrapato', nome: 'Carrapato', icone: '🐜' },
  { id: 'traca', nome: 'Traça', icone: '🦋' },
  { id: 'cascudinho', nome: 'Cascudinho', icone: '🐞' },
];

// Calendário de pragas por mês
export const calendario: MesCalendario[] = [
  {
    nome: 'JANEIRO',
    estacao: 'verao',
    pragas: [
      { pragaId: 'barata', incidenciaAlta: true },
      { pragaId: 'cupim', incidenciaAlta: true },
      { pragaId: 'formiga', incidenciaAlta: true },
      { pragaId: 'lesma', incidenciaAlta: false },
      { pragaId: 'mosca', incidenciaAlta: true },
      { pragaId: 'mosquito', incidenciaAlta: true },
      { pragaId: 'pulga', incidenciaAlta: true },
      { pragaId: 'caruncho', incidenciaAlta: false },
      { pragaId: 'escorpiao', incidenciaAlta: true },
      { pragaId: 'rato', incidenciaAlta: false },
      { pragaId: 'aranha', incidenciaAlta: true },
      { pragaId: 'cascudinho', incidenciaAlta: false },
      { pragaId: 'morcego', incidenciaAlta: false },
      { pragaId: 'pombo', incidenciaAlta: false },
    ]
  },
  {
    nome: 'FEVEREIRO',
    estacao: 'verao',
    pragas: [
      { pragaId: 'barata', incidenciaAlta: true },
      { pragaId: 'cupim', incidenciaAlta: true },
      { pragaId: 'formiga', incidenciaAlta: true },
      { pragaId: 'lesma', incidenciaAlta: false },
      { pragaId: 'mosca', incidenciaAlta: true },
      { pragaId: 'mosquito', incidenciaAlta: true },
      { pragaId: 'pulga', incidenciaAlta: true },
      { pragaId: 'caruncho', incidenciaAlta: false },
      { pragaId: 'escorpiao', incidenciaAlta: true },
      { pragaId: 'rato', incidenciaAlta: false },
      { pragaId: 'aranha', incidenciaAlta: true },
      { pragaId: 'cascudinho', incidenciaAlta: false },
      { pragaId: 'morcego', incidenciaAlta: false },
      { pragaId: 'pombo', incidenciaAlta: false },
    ]
  },
  {
    nome: 'MARÇO',
    estacao: 'primavera',
    pragas: [
      { pragaId: 'barata', incidenciaAlta: false },
      { pragaId: 'cupim', incidenciaAlta: false },
      { pragaId: 'formiga', incidenciaAlta: false },
      { pragaId: 'barbeiro', incidenciaAlta: false },
      { pragaId: 'escorpiao', incidenciaAlta: false },
      { pragaId: 'mosca', incidenciaAlta: true },
      { pragaId: 'rato', incidenciaAlta: false },
      { pragaId: 'pulga', incidenciaAlta: true },
      { pragaId: 'traca', incidenciaAlta: false },
      { pragaId: 'aranha', incidenciaAlta: false },
    ]
  },
  {
    nome: 'ABRIL',
    estacao: 'primavera',
    pragas: [
      { pragaId: 'barata', incidenciaAlta: false },
      { pragaId: 'cupim', incidenciaAlta: false },
      { pragaId: 'barbeiro', incidenciaAlta: false },
      { pragaId: 'mosca', incidenciaAlta: true },
      { pragaId: 'rato', incidenciaAlta: false },
      { pragaId: 'traca', incidenciaAlta: false },
      { pragaId: 'aranha', incidenciaAlta: true },
      { pragaId: 'cascudinho', incidenciaAlta: false },
    ]
  },
  {
    nome: 'MAIO',
    estacao: 'primavera',
    pragas: [
      { pragaId: 'barata', incidenciaAlta: false },
      { pragaId: 'cupim', incidenciaAlta: false },
      { pragaId: 'barbeiro', incidenciaAlta: false },
      { pragaId: 'mosca', incidenciaAlta: true },
      { pragaId: 'rato', incidenciaAlta: false },
      { pragaId: 'traca', incidenciaAlta: false },
      { pragaId: 'cascudinho', incidenciaAlta: false },
    ]
  },
  {
    nome: 'JUNHO',
    estacao: 'inverno',
    pragas: [
      { pragaId: 'barata', incidenciaAlta: false },
      { pragaId: 'rato', incidenciaAlta: true },
      { pragaId: 'mosquito', incidenciaAlta: true },
      { pragaId: 'traca', incidenciaAlta: false },
      { pragaId: 'carrapato', incidenciaAlta: false },
      { pragaId: 'cascudinho', incidenciaAlta: false },
      { pragaId: 'percevejo', incidenciaAlta: true },
    ]
  },
  {
    nome: 'JULHO',
    estacao: 'inverno',
    pragas: [
      { pragaId: 'barata', incidenciaAlta: false },
      { pragaId: 'rato', incidenciaAlta: true },
      { pragaId: 'mosquito', incidenciaAlta: true },
      { pragaId: 'traca', incidenciaAlta: false },
      { pragaId: 'carrapato', incidenciaAlta: false },
      { pragaId: 'cascudinho', incidenciaAlta: false },
      { pragaId: 'percevejo', incidenciaAlta: true },
    ]
  },
  {
    nome: 'AGOSTO',
    estacao: 'inverno',
    pragas: [
      { pragaId: 'barata', incidenciaAlta: false },
      { pragaId: 'rato', incidenciaAlta: true },
      { pragaId: 'mosquito', incidenciaAlta: true },
      { pragaId: 'traca', incidenciaAlta: false },
      { pragaId: 'carrapato', incidenciaAlta: false },
      { pragaId: 'cascudinho', incidenciaAlta: false },
      { pragaId: 'percevejo', incidenciaAlta: true },
    ]
  },
  {
    nome: 'SETEMBRO',
    estacao: 'outono',
    pragas: [
      { pragaId: 'barata', incidenciaAlta: false },
      { pragaId: 'cupim', incidenciaAlta: false },
      { pragaId: 'rato', incidenciaAlta: false },
      { pragaId: 'cascudinho', incidenciaAlta: true },
      { pragaId: 'mosca', incidenciaAlta: true },
      { pragaId: 'mosquito', incidenciaAlta: false },
      { pragaId: 'barbeiro', incidenciaAlta: false },
      { pragaId: 'percevejo', incidenciaAlta: false },
      { pragaId: 'pulga', incidenciaAlta: false },
      { pragaId: 'traca', incidenciaAlta: false },
      { pragaId: 'carrapato', incidenciaAlta: false },
    ]
  },
  {
    nome: 'OUTUBRO',
    estacao: 'outono',
    pragas: [
      { pragaId: 'barata', incidenciaAlta: false },
      { pragaId: 'cupim', incidenciaAlta: false },
      { pragaId: 'formiga', incidenciaAlta: false },
      { pragaId: 'traca', incidenciaAlta: false },
      { pragaId: 'mosca', incidenciaAlta: true },
      { pragaId: 'mosquito', incidenciaAlta: true },
      { pragaId: 'pulga', incidenciaAlta: true },
      { pragaId: 'escorpiao', incidenciaAlta: false },
      { pragaId: 'carrapato', incidenciaAlta: false },
      { pragaId: 'barbeiro', incidenciaAlta: false },
      { pragaId: 'rato', incidenciaAlta: false },
      { pragaId: 'aranha', incidenciaAlta: false },
      { pragaId: 'percevejo', incidenciaAlta: false },
      { pragaId: 'morcego', incidenciaAlta: false },
    ]
  },
  {
    nome: 'NOVEMBRO',
    estacao: 'outono',
    pragas: [
      { pragaId: 'barata', incidenciaAlta: false },
      { pragaId: 'cupim', incidenciaAlta: false },
      { pragaId: 'formiga', incidenciaAlta: true },
      { pragaId: 'lesma', incidenciaAlta: false },
      { pragaId: 'barbeiro', incidenciaAlta: false },
      { pragaId: 'mosca', incidenciaAlta: true },
      { pragaId: 'mosquito', incidenciaAlta: false },
      { pragaId: 'pulga', incidenciaAlta: true },
      { pragaId: 'rato', incidenciaAlta: false },
      { pragaId: 'morcego', incidenciaAlta: false },
      { pragaId: 'aranha', incidenciaAlta: false },
      { pragaId: 'traca', incidenciaAlta: false },
      { pragaId: 'escorpiao', incidenciaAlta: false },
    ]
  },
  {
    nome: 'DEZEMBRO',
    estacao: 'verao',
    pragas: [
      { pragaId: 'barata', incidenciaAlta: true },
      { pragaId: 'cupim', incidenciaAlta: true },
      { pragaId: 'formiga', incidenciaAlta: true },
      { pragaId: 'lesma', incidenciaAlta: false },
      { pragaId: 'mosca', incidenciaAlta: true },
      { pragaId: 'mosquito', incidenciaAlta: true },
      { pragaId: 'pulga', incidenciaAlta: true },
      { pragaId: 'caruncho', incidenciaAlta: false },
      { pragaId: 'escorpiao', incidenciaAlta: true },
      { pragaId: 'rato', incidenciaAlta: false },
      { pragaId: 'aranha', incidenciaAlta: true },
      { pragaId: 'cascudinho', incidenciaAlta: false },
      { pragaId: 'morcego', incidenciaAlta: false },
      { pragaId: 'pombo', incidenciaAlta: false },
    ]
  },
];

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
