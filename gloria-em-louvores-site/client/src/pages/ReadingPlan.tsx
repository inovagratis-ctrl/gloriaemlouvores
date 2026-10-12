import { useState, useEffect, useMemo } from 'react';
import { Link } from 'wouter';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Printer,
  Download,
  RotateCcw,
  BookOpen,
  Sparkles,
  ChevronRight,
  Home,
  Award,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import AffiliateBox from '@/components/AffiliateBox';
import AdSlot from '@/components/AdSlot';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { trackConversionEvent } from '@/lib/analytics';

interface ReadingDay {
  day: number;
  title: string;
  reference: string;
  keyVerse: string;
  reflection: string;
  prayerPrompt: string;
}

const PLAN_30_DAYS: ReadingDay[] = [
  { day: 1, title: 'A Criação e a Palavra de Vida', reference: 'Gênesis 1:1-31; João 1:1-5', keyVerse: '"No princípio, criou Deus os céus e a terra." (Gênesis 1:1)', reflection: 'Deus traz ordem, luz e propósito onde havia vazio. Cristo é o Verbo Eterno pelo qual tudo foi feito.', prayerPrompt: 'Agradeça a Deus pelo dom da vida e peça que a luz de Cristo governe sua mente hoje.' },
  { day: 2, title: 'O Cuidado de Deus na Queda e a Promessa', reference: 'Gênesis 3:1-24', keyVerse: '"E chamou o Senhor Deus a Adão e disse-lhe: Onde estás?" (Gênesis 3:9)', reflection: 'Mesmo quando o ser humano falha e se esconde, Deus toma a iniciativa de buscar e anunciar a redenção.', prayerPrompt: 'Confesse suas falhas ao Pai sem se esconder, confiando na graça prometida em Cristo.' },
  { day: 3, title: 'O Chamado da Fé: Abraão', reference: 'Gênesis 12:1-9; 15:1-6', keyVerse: '"E creu ele no Senhor, e foi-lhe imputado isto por justiça." (Gênesis 15:6)', reflection: 'A caminhada com Deus começa ao confiarmos na Sua promessa mesmo sem enxergar todo o mapa à frente.', prayerPrompt: 'Entregue a Deus as decisões e áreas do seu futuro que geram incerteza.' },
  { day: 4, title: 'A Providência de Deus na História de José', reference: 'Gênesis 50:15-21', keyVerse: '"Vós bem intentastes mal contra mim, porém Deus o tornou em bem." (Gênesis 50:20)', reflection: 'A soberania de Deus é capaz de transformar estações dolorosas em instrumentos de preservação e graça.', prayerPrompt: 'Peça um coração livre de amargura e capaz de perdoar como José perdoou.' },
  { day: 5, title: 'Libertação e Cuidado no Deserto', reference: 'Êxodo 14:10-31', keyVerse: '"O Senhor pelejará por vós, e vós vos calareis." (Êxodo 14:14)', reflection: 'Quando nos vemos cercados por circunstâncias impossíveis, o Senhor abre caminhos e sustenta Seu povo.', prayerPrompt: 'Apresente ao Senhor a maior causa ou dificuldade que sua família enfrenta hoje.' },
  { day: 6, title: 'Os Dez Mandamentos e o Amor no Lar', reference: 'Êxodo 20:1-17; Deuteronômio 6:4-9', keyVerse: '"Amarás, pois, o Senhor, teu Deus, de todo o teu coração." (Deuteronômio 6:5)', reflection: 'A lei de Deus não é uma prisão, mas o caminho da liberdade para amarmos a Deus acima de tudo e ao próximo com justiça.', prayerPrompt: 'Ore para que sua casa seja um lugar onde a Palavra de Deus é vivida com amor.' },
  { day: 7, title: 'Coragem e Meditação na Palavra', reference: 'Josué 1:1-9; Salmo 1', keyVerse: '"Esforça-te e tem bom ânimo; não pasmes, nem te espantes." (Josué 1:9)', reflection: 'A verdadeira coragem espiritual nasce da certeza da presença de Deus e da meditação diária nas Escrituras.', prayerPrompt: 'Peça constância para não se desviar da Palavra nem para a direita nem para a esquerda.' },
  { day: 8, title: 'O Bom Pastor que Restaura a Alma', reference: 'Salmo 23; Salmo 27', keyVerse: '"O Senhor é o meu pastor; nada me faltará." (Salmo 23:1)', reflection: 'Tanto nos pastos verdejantes quanto no vale da sombra da morte, a presença do Pastor é nossa segurança.', prayerPrompt: 'Ore por refrigério na alma e descanso em meio ao cansaço da rotina.' },
  { day: 9, title: 'Arrependimento Sincero e Coração Puro', reference: 'Salmo 51; Salmo 32', keyVerse: '"Cria em mim, ó Deus, um coração puro e renova em mim um espírito reto." (Salmo 51:10)', reflection: 'Deus não rejeita um coração quebrantado e contrito; no perdão divino encontramos verdadeira alegria.', prayerPrompt: 'Peça ao Senhor que purifique suas motivações e renove a alegria da salvação.' },
  { day: 10, title: 'Refúgio e Socorro nas Tempestades', reference: 'Salmo 46; Salmo 91', keyVerse: '"Aquietai-vos e sabei que eu sou Deus." (Salmo 46:10)', reflection: 'Ainda que o mundo ao redor pareça abalado, Deus é o nosso refúgio e fortaleza bem presente na angústia.', prayerPrompt: 'Aquieta seu coração diante de Deus e entregue seus medos ao cuidado do Pai.' },
  { day: 11, title: 'Gratidão pelas Misericórdias do Senhor', reference: 'Salmo 103; Salmo 121', keyVerse: '"Bendize, ó minha alma, ao Senhor, e não te esqueças de nenhum de seus benefícios." (Salmo 103:2)', reflection: 'A memória agradecida cura a murmuração. O guarda de Israel não dorme nem toscaneja.', prayerPrompt: 'Liste três bênçãos recebidas nesta semana e agradeça nominalmente ao Senhor.' },
  { day: 12, title: 'Sabedoria Prática para as Decisões', reference: 'Provérbios 3:1-18; Tiago 1:5', keyVerse: '"Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento." (Provérbios 3:5)', reflection: 'O temor do Senhor é o princípio da sabedoria. Reconhecer a Deus em todos os caminhos endireita nossas veredas.', prayerPrompt: 'Peça sabedoria do alto para suas escolhas profissionais, financeiras e familiares.' },
  { day: 13, title: 'Consolo e Força para os Cansados', reference: 'Isaías 40:25-31; 41:10', keyVerse: '"Mas os que esperam no Senhor renovarão as suas forças." (Isaías 40:31)', reflection: 'O Deus eterno não se cansa nem se fatiga; Ele dá vigor ao cansado e multiplica as forças ao que não tem nenhum vigor.', prayerPrompt: 'Interceda por pessoas enfermas ou emocionalmente exaustas que você conhece.' },
  { day: 14, title: 'O Servo Sofredor que Levou Nossas Dores', reference: 'Isaías 53:1-12', keyVerse: '"O castigo que nos traz a paz estava sobre ele." (Isaías 53:5)', reflection: 'Séculos antes da cruz, Isaías profetizou o sacrifício substitutivo do Messias que nos reconciliou com Deus.', prayerPrompt: 'Adore a Jesus Cristo pela obra consumada na cruz em nosso favor.' },
  { day: 15, title: 'Novidade de Vida e Esperança no Choro', reference: 'Lamentações 3:21-26; Ezequiel 36:25-27', keyVerse: '"As misericórdias do Senhor são a causa de não sermos consumidos." (Lamentações 3:22)', reflection: 'Deus promete trocar o coração de pedra por um coração de carne e renovar Suas misericórdias a cada manhã.', prayerPrompt: 'Peça sensibilidade espiritual à voz do Espírito Santo.' },
  { day: 16, title: 'As Bem-Aventuranças do Reino', reference: 'Mateus 5:1-16', keyVerse: '"Vós sois o sal da terra e a luz do mundo." (Mateus 5:13-14)', reflection: 'O caráter do discípulo de Cristo é marcado por humildade, mansidão, fome de justiça, misericórdia e promoção da paz.', prayerPrompt: 'Peça graça para ser pacificador e luz no seu ambiente de trabalho e no lar.' },
  { day: 17, title: 'A Oração do Pai Nosso e a Provisão Diária', reference: 'Mateus 6:5-34', keyVerse: '"Buscai primeiro o Reino de Deus, e a sua justiça." (Mateus 6:33)', reflection: 'Jesus nos ensina a chamar Deus de Pai e a substituir a ansiedade pelo amanhã pela confiança no cuidado paterno.', prayerPrompt: 'Ore pausadamente o Pai Nosso, meditando em cada petição.' },
  { day: 18, title: 'Descanso para os Sobrecarregados', reference: 'Mateus 11:25-30; Marcos 4:35-41', keyVerse: '"Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei." (Mateus 11:28)', reflection: 'Jesus é manso e humilde de coração; Sua palavra acalma o vento e o mar e oferece verdadeiro descanso à alma.', prayerPrompt: 'Entregue a Jesus todo fardo de culpa, perfeccionismo ou sobrecarga.' },
  { day: 19, title: 'O Amor do Pai Pródigo em Graça', reference: 'Lucas 15:1-32', keyVerse: '"E, quando ainda estava longe, viu-o seu pai, e se moveu de íntima compaixão." (Lucas 15:20)', reflection: 'O coração do Pai Celestial corre ao encontro do filho arrependido e convida o irmão mais velho a abandonar o orgulho.', prayerPrompt: 'Ore por familiares e amigos que estão distantes da comunhão com Deus.' },
  { day: 20, title: 'O Bom Pastor e a Ressurreição', reference: 'João 10:1-18; João 11:25-27', keyVerse: '"Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá." (João 11:25)', reflection: 'As ovelhas de Cristo ouvem a Sua voz e jamais perecerão. Nele temos vida abundante e eterna.', prayerPrompt: 'Agradeça pela segurança da salvação e pelo consolo da vida eterna.' },
  { day: 21, title: 'Permanecendo na Videira Verdadeira', reference: 'João 14:1-6, 27; João 15:1-17', keyVerse: '"Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá." (João 14:27)', reflection: 'Sem Cristo nada podemos fazer. Só produzimos fruto espiritual duradouro quando permanecemos em comunhão com Ele.', prayerPrompt: 'Peça que sua vida permaneça ligada a Cristo em amor e obediência.' },
  { day: 22, title: 'A Cruz, a Ressurreição e o Envio', reference: 'Lucas 24:13-35; Mateus 28:16-20', keyVerse: '"E eis que eu estou convosco todos os dias, até a consumação dos séculos." (Mateus 28:20)', reflection: 'O Cristo ressurreto caminha conosco na estrada de Emaús, abre nosso entendimento nas Escrituras e aquece o nosso coração.', prayerPrompt: 'Peça que seu coração arda ao ler a Bíblia e compartilhar o Evangelho.' },
  { day: 23, title: 'A Igreja Primitiva e a Comunhão nas Casas', reference: 'Atos 2:1-47', keyVerse: '"Perseveravam na doutrina dos apóstolos, e na comunhão, e no partir do pão, e nas orações." (Atos 2:42)', reflection: 'A vida cristã não foi desenhada para o isolamento, mas para a comunhão fraterna, generosidade e oração comunitária.', prayerPrompt: 'Ore pela sua igreja local, seus pastores, líderes e pequenos grupos.' },
  { day: 24, title: 'Justificados pela Fé e Seguros no Amor de Deus', reference: 'Romanos 5:1-11; Romanos 8:1-39', keyVerse: '"Nenhuma condenação há para os que estão em Cristo Jesus." (Romanos 8:1)', reflection: 'Nada em toda a criação — nem tribulação, nem angústia, nem morte, nem vida — poderá nos separar do amor de Deus em Cristo.', prayerPrompt: 'Louve a Deus pela certeza do Seu amor inseparável e fiel.' },
  { day: 25, title: 'Culto Racional e Renovação da Mente', reference: 'Romanos 12:1-21', keyVerse: '"Transformai-vos pela renovação do vosso entendimento." (Romanos 12:2)', reflection: 'A verdadeira adoração envolve oferecer nossa vida diária a Deus, amando sem hipocrisia e vencendo o mal com o bem.', prayerPrompt: 'Peça que Deus renove seus pensamentos e atitudes no convívio diário.' },
  { day: 26, title: 'A Supremacia do Amor Cristão', reference: '1 Coríntios 13:1-13', keyVerse: '"O amor é sofredor, é benigno; o amor não é invejoso." (1 Coríntios 13:4)', reflection: 'Conhecimento, dons e eloquência sem amor prático nada aproveitam. A maturidade espiritual mede-se pelo amor paciente.', prayerPrompt: 'Peça paciência e benignidade para tratar as pessoas mais próximas de você.' },
  { day: 27, title: 'O Fruto do Espírito e a Armadura de Deus', reference: 'Gálatas 5:16-25; Efésios 6:10-18', keyVerse: '"Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança." (Gálatas 5:22-23)', reflection: 'Revestidos da verdade, da justiça, da fé e da Palavra, caminhamos em vitória contra as ciladas espirituais.', prayerPrompt: 'Ore vestindo espiritualmente cada peça da armadura de Deus em Efésios 6.' },
  { day: 28, title: 'Humildade de Cristo e Paz que Guarda a Mente', reference: 'Filipenses 2:1-11; Filipenses 4:4-13', keyVerse: '"E a paz de Deus, que excede todo o entendimento, guardará os vossos corações." (Filipenses 4:7)', reflection: 'Tendo o mesmo sentimento de humildade de Jesus, levamos toda inquietação em oração com ações de graças.', prayerPrompt: 'Substitua hoje cada preocupação por uma petição específica com gratidão.' },
  { day: 29, title: 'A Nuvem de Testemunhas e os Olhos em Jesus', reference: 'Hebreus 11:1-6; Hebreus 12:1-3', keyVerse: '"Olhando para Jesus, autor e consumador da fé." (Hebreus 12:2)', reflection: 'Corremos com paciência a carreira que nos está proposta, desembaraçando-nos de todo peso e fixando os olhos em Cristo.', prayerPrompt: 'Peça perseverança para continuar firme na fé em todas as estações da vida.' },
  { day: 30, title: 'Fé Viva em Obras e a Esperança da Nova Jerusalém', reference: 'Tiago 1:19-27; Apocalipse 21:1-7', keyVerse: '"E sede cumpridores da palavra, e não somente ouvintes." (Tiago 1:22)', reflection: 'Concluímos estes 30 dias certos de que Aquele que começou a boa obra em nós a aperfeiçoará até o dia de Cristo.', prayerPrompt: 'Consagre os próximos meses de leitura bíblica e celebre a fidelidade de Deus!' },
];

interface AnnualMonthPlan {
  month: number;
  name: string;
  theme: string;
  books: string;
  keyChapters: string[];
}

const ANNUAL_12_MONTHS: AnnualMonthPlan[] = [
  { month: 1, name: 'Mês 1 — Origens e Aliança', theme: 'Da Criação à formação do povo de Israel', books: 'Gênesis, Êxodo e Salmos 1–15', keyChapters: ['Sem. 1: Gênesis 1–25', 'Sem. 2: Gênesis 26–50', 'Sem. 3: Êxodo 1–20', 'Sem. 4: Êxodo 21–40 + Salmos 1–15'] },
  { month: 2, name: 'Mês 2 — Santidade e Caminhada no Deserto', theme: 'O Tabernáculo, a Lei e a fidelidade de Deus', books: 'Levítico, Números e Deuteronômio', keyChapters: ['Sem. 1: Levítico 1–27', 'Sem. 2: Números 1–20', 'Sem. 3: Números 21–36 + Deut. 1–11', 'Sem. 4: Deuteronômio 12–34'] },
  { month: 3, name: 'Mês 3 — Terra Prometida e Juízes', theme: 'Coragem, conquista e redenção em Rute', books: 'Josué, Juízes, Rute e Salmos 16–35', keyChapters: ['Sem. 1: Josué 1–24', 'Sem. 2: Juízes 1–12', 'Sem. 3: Juízes 13–21 + Rute 1–4', 'Sem. 4: Salmos 16–35'] },
  { month: 4, name: 'Mês 4 — O Reino de Israel e Davi', theme: 'O coração segundo Deus e a aliança davídica', books: '1 Samuel, 2 Samuel e Salmos 36–60', keyChapters: ['Sem. 1: 1 Samuel 1–16', 'Sem. 2: 1 Samuel 17–31', 'Sem. 3: 2 Samuel 1–24', 'Sem. 4: Salmos 36–60'] },
  { month: 5, name: 'Mês 5 — Literatura de Sabedoria e Adoração', theme: 'Temor do Senhor, sofrimento e louvor', books: 'Jó, Provérbios, Eclesiastes e Cantares', keyChapters: ['Sem. 1: Jó 1–42', 'Sem. 2: Provérbios 1–16', 'Sem. 3: Provérbios 17–31', 'Sem. 4: Eclesiastes 1–12 + Cantares'] },
  { month: 6, name: 'Mês 6 — Reis, Crônicas e Reforma', theme: 'História dos reis, exílio e retorno a Jerusalém', books: '1 e 2 Reis, 1 e 2 Crônicas, Esdras, Neemias e Ester', keyChapters: ['Sem. 1: 1 e 2 Reis', 'Sem. 2: 1 e 2 Crônicas (seleção)', 'Sem. 3: Esdras 1–10 + Neemias 1–13', 'Sem. 4: Ester 1–10 + Salmos 61–90'] },
  { month: 7, name: 'Mês 7 — Os Profetas Maiores (Parte 1)', theme: 'Santidade, consolo messiânico e esperança', books: 'Isaías, Jeremias e Lamentações', keyChapters: ['Sem. 1: Isaías 1–39', 'Sem. 2: Isaías 40–66', 'Sem. 3: Jeremias 1–29', 'Sem. 4: Jeremias 30–52 + Lamentações'] },
  { month: 8, name: 'Mês 8 — Profetas Maiores (Parte 2) e Menores', theme: 'Visões da glória de Deus e fidelidade no exílio', books: 'Ezequiel, Daniel e Oseias a Malaquias', keyChapters: ['Sem. 1: Ezequiel 1–48', 'Sem. 2: Daniel 1–12 + Oseias a Amós', 'Sem. 3: Obadias a Habacuque', 'Sem. 4: Sofonias a Malaquias + Salmos 91–150'] },
  { month: 9, name: 'Mês 9 — Os Evangelhos Sinóticos', theme: 'A vida, os milagres, o ensino e a cruz de Jesus', books: 'Mateus, Marcos e Lucas', keyChapters: ['Sem. 1: Mateus 1–14', 'Sem. 2: Mateus 15–28', 'Sem. 3: Marcos 1–16', 'Sem. 4: Lucas 1–24'] },
  { month: 10, name: 'Mês 10 — O Evangelho de João e Atos', theme: 'O Verbo encarnado e a expansão da Igreja pelo Espírito', books: 'João e Atos dos Apóstolos', keyChapters: ['Sem. 1: João 1–11', 'Sem. 2: João 12–21', 'Sem. 3: Atos 1–14', 'Sem. 4: Atos 15–28'] },
  { month: 11, name: 'Mês 11 — As Epístolas de Paulo', theme: 'Justificação pela fé, igreja local e vida no Espírito', books: 'Romanos a Filemom', keyChapters: ['Sem. 1: Romanos 1–16', 'Sem. 2: 1 e 2 Coríntios', 'Sem. 3: Gálatas, Efésios, Filipenses e Colossenses', 'Sem. 4: 1 e 2 Tess., 1 e 2 Timóteo, Tito e Filemom'] },
  { month: 12, name: 'Mês 12 — Epístolas Gerais e Apocalipse', theme: 'Perseverança na fé e a vitória final do Cordeiro', books: 'Hebreus, Tiago, 1 e 2 Pedro, 1, 2 e 3 João, Judas e Apocalipse', keyChapters: ['Sem. 1: Hebreus 1–13', 'Sem. 2: Tiago + 1 e 2 Pedro', 'Sem. 3: 1, 2 e 3 João + Judas', 'Sem. 4: Apocalipse 1–22'] },
];

const STORAGE_30_KEY = 'gloria_reading_plan_30_v1';
const STORAGE_ANNUAL_KEY = 'gloria_reading_plan_annual_v1';

export default function ReadingPlan() {
  const [activeTab, setActiveTab] = useState<'30dias' | 'anual'>('30dias');
  const [completed30, setCompleted30] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_30_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [completedAnnual, setCompletedAnnual] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_ANNUAL_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_30_KEY, JSON.stringify(completed30));
    } catch {
      // ignore
    }
  }, [completed30]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ANNUAL_KEY, JSON.stringify(completedAnnual));
    } catch {
      // ignore
    }
  }, [completedAnnual]);

  const toggleDay30 = (day: number) => {
    setCompleted30(prev => {
      const exists = prev.includes(day);
      const next = exists ? prev.filter(d => d !== day) : [...prev, day];
      if (!exists) {
        trackConversionEvent('reading_plan_check', {
          label: `Dia ${day}`,
          category: 'plano_30_dias',
          value: next.length,
        });
      }
      return next;
    });
  };

  const toggleAnnualWeek = (weekKey: string) => {
    setCompletedAnnual(prev => {
      const exists = prev.includes(weekKey);
      const next = exists ? prev.filter(k => k !== weekKey) : [...prev, weekKey];
      if (!exists) {
        trackConversionEvent('reading_plan_check', {
          label: weekKey,
          category: 'plano_anual',
          value: next.length,
        });
      }
      return next;
    });
  };

  const progress30Percent = useMemo(
    () => Math.round((completed30.length / 30) * 100),
    [completed30]
  );

  const progressAnnualPercent = useMemo(
    () => Math.round((completedAnnual.length / 48) * 100),
    [completedAnnual]
  );

  const handleDownloadTxt = () => {
    trackConversionEvent('download_devotional', {
      label: activeTab === '30dias' ? 'plano_leitura_30_dias_txt' : 'plano_leitura_anual_txt',
      category: 'reading_plan_export',
    });

    const lines: string[] = [
      '====================================================================',
      'GLÓRIA EM LOUVORES (gloriaemlouvores.com.br)',
      'PLANO DE LEITURA BÍBLICA DE 30 DIAS & ANUAL (ALMEIDA)',
      '====================================================================',
      '',
    ];

    PLAN_30_DAYS.forEach(d => {
      const status = completed30.includes(d.day) ? '[CONCLUÍDO]' : '[ PENDENTE ]';
      lines.push(`DIA ${String(d.day).padStart(2, '0')} ${status} — ${d.title}`);
      lines.push(`Leitura Bíblica: ${d.reference}`);
      lines.push(`Versículo-Chave: ${d.keyVerse}`);
      lines.push(`Reflexão: ${d.reflection}`);
      lines.push(`Motivo de Oração: ${d.prayerPrompt}`);
      lines.push('--------------------------------------------------------------------');
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plano-de-leitura-biblica-gloria-em-louvores.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    trackConversionEvent('download_devotional', {
      label: 'plano_leitura_print_pdf',
      category: 'reading_plan_export',
    });
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      <SEOHead
        title="Plano de Leitura Bíblica de 30 Dias e Anual Interativo | Glória em Louvores"
        description="Ferramenta gratuita e interativa de Plano de Leitura Bíblica de 30 Dias e Anual com acompanhamento salvo no navegador, reflexões diárias e opção de imprimir."
        keywords="plano de leitura bíblica, plano de leitura bíblica 30 dias, plano de leitura bíblica anual, ler a bíblia em 1 ano, devocional diário"
        canonicalPath="/plano-de-leitura"
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Plano de Leitura Bíblica', path: '/plano-de-leitura' },
        ]}
      />
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-[#1a1f3a] via-[#1a1f3a] to-[#0f1325] text-white">
        <div className="container max-w-6xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/70 mb-6">
            <Link href="/" className="hover:text-[#D4AF37] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Início
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#D4AF37] font-semibold">Plano de Leitura Bíblica</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full px-3.5 py-1 text-xs font-semibold text-[#D4AF37] mb-4">
                <Calendar className="w-3.5 h-3.5" />
                Ferramenta Interativa • Progresso Salvo Automaticamente
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Plano de Leitura Bíblica: Jornada de 30 Dias e Plano Anual
              </h1>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                Marque cada leitura concluída diretamente no seu navegador, medite nos versículos em domínio público (Almeida) e baixe ou imprima seu guia devocional.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Button
                onClick={handlePrint}
                variant="outline"
                className="border-white/25 bg-white/10 text-white hover:bg-white/20 gap-2"
              >
                <Printer className="w-4 h-4 text-[#D4AF37]" />
                Imprimir / PDF
              </Button>
              <Button
                onClick={handleDownloadTxt}
                className="bg-[#D4AF37] hover:bg-[#B8942E] text-[#111528] font-bold gap-2"
              >
                <Download className="w-4 h-4" />
                Baixar Guia (.TXT)
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="container max-w-6xl mx-auto px-4 py-10 flex-1">
        {/* Mode Switcher & Progress Bar */}
        <div className="bg-white rounded-2xl border border-[#E8E4E0] p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('30dias')}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === '30dias'
                    ? 'bg-[#1a1f3a] text-[#D4AF37] shadow-sm'
                    : 'bg-[#F9F7F4] text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Jornada de 30 Dias (Essencial)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('anual')}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'anual'
                    ? 'bg-[#1a1f3a] text-[#D4AF37] shadow-sm'
                    : 'bg-[#F9F7F4] text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Plano Anual (12 Meses / Toda a Bíblia)
              </button>
            </div>

            <div className="flex items-center gap-3">
              {activeTab === '30dias' ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm('Deseja reiniciar a marcação dos 30 dias?')) setCompleted30([]);
                  }}
                  className="text-xs text-gray-500 hover:text-red-600 gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reiniciar 30 Dias
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm('Deseja reiniciar a marcação do Plano Anual?'))
                      setCompletedAnnual([]);
                  }}
                  className="text-xs text-gray-500 hover:text-red-600 gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reiniciar Plano Anual
                </Button>
              )}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="bg-[#F9F7F4] rounded-xl p-4 border border-[#E8E4E0]">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#1a1f3a] mb-2">
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                {activeTab === '30dias'
                  ? `Progresso nos 30 Dias: ${completed30.length} de 30 leituras concluídas`
                  : `Progresso Anual: ${completedAnnual.length} de 48 semanas concluídas`}
              </span>
              <span className="text-[#D4AF37]">
                {activeTab === '30dias' ? `${progress30Percent}%` : `${progressAnnualPercent}%`}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#1a1f3a] to-[#D4AF37] transition-all duration-500"
                style={{
                  width: `${
                    activeTab === '30dias' ? progress30Percent : progressAnnualPercent
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* 30 Days View */}
        {activeTab === '30dias' ? (
          <div className="grid md:grid-cols-2 gap-5">
            {PLAN_30_DAYS.map(item => {
              const isDone = completed30.includes(item.day);
              return (
                <Card
                  key={item.day}
                  className={`border transition-all ${
                    isDone
                      ? 'border-emerald-500/50 bg-emerald-50/30'
                      : 'border-[#E8E4E0] bg-white hover:border-[#D4AF37]'
                  }`}
                >
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                          Dia {item.day} de 30 • {item.reference}
                        </span>
                        <h2 className="text-lg font-bold text-[#1a1f3a]">{item.title}</h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleDay30(item.day)}
                        aria-label={`Marcar dia ${item.day} como concluído`}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#F9F7F4] text-gray-700 hover:bg-[#D4AF37]/20'
                        }`}
                      >
                        {isDone ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> Concluído
                          </>
                        ) : (
                          <>
                            <Circle className="w-4 h-4" /> Marcar
                          </>
                        )}
                      </button>
                    </div>

                    <blockquote className="text-xs sm:text-sm italic text-[#1a1f3a] bg-[#F9F7F4] border-l-3 border-[#D4AF37] pl-3 py-2 rounded-r-lg mb-3">
                      {item.keyVerse}
                    </blockquote>

                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                      <strong>Meditação:</strong> {item.reflection}
                    </p>
                    <p className="text-xs text-gray-600 bg-amber-50/70 border border-amber-200/60 p-2.5 rounded-lg">
                      <strong className="text-[#1a1f3a]">Oração do Dia:</strong> {item.prayerPrompt}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Annual 12-Month View */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ANNUAL_12_MONTHS.map(m => (
              <Card key={m.month} className="bg-white border border-[#E8E4E0] shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      {m.books}
                    </span>
                    <h2 className="text-lg font-bold text-[#1a1f3a] mt-1">{m.name}</h2>
                    <p className="text-xs text-gray-600 mt-1">{m.theme}</p>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    {m.keyChapters.map((wk, idx) => {
                      const wkKey = `m${m.month}-w${idx + 1}`;
                      const checked = completedAnnual.includes(wkKey);
                      return (
                        <button
                          key={wkKey}
                          type="button"
                          onClick={() => toggleAnnualWeek(wkKey)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                            checked
                              ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                              : 'bg-[#F9F7F4] text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span>{wk}</span>
                          {checked ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Supporting Study Link & Affiliate Recommendation */}
        <div className="mt-12 bg-white rounded-2xl border border-[#E8E4E0] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-[#1a1f3a] mb-2">
              Quer dicas para não desistir da leitura bíblica?
            </h3>
            <p className="text-sm text-gray-600 max-w-xl">
              Leia nosso estudo completo sobre como manter a constância diária e aplicar o método de Observação, Interpretação e Aplicação.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/blog/plano-de-leitura-biblica-30-dias-constancia">
              <Button className="bg-[#1a1f3a] hover:bg-[#2d3561] text-white">
                Guia de Constância nos 30 Dias
              </Button>
            </Link>
            <Link href="/blog/como-estudar-texto-biblico-metodo-observacao-interpretacao-aplicacao">
              <Button variant="outline">Método de Estudo Bíblico</Button>
            </Link>
          </div>
        </div>

        <AffiliateBox affiliateId="biblia-estudo-almeida-naa" />
        <AdSlot slotId="reading-plan-bottom" />
      </main>

      <Footer />
    </div>
  );
}
