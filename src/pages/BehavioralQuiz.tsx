import React, { useState, useCallback } from "react";
import useUtmNavigator from "../hooks/useUtmNavigator";
import { usePixelTracking } from "../hooks/usePixelTracking";

type Answers = {
  1: string | null;
  2: string | null;
  3: string | null;
  4: string | null;
};

const TOTAL_STEPS = 4;

// Mapeamento para o resumo final (opcional, caso queira mostrar o resultado antes de navegar)
const labels: Record<number, Record<string, string>> = {
  1: {
    prioridade: "Estabilidade é prioridade",
    objetivo: "Estabilidade faz parte dos objetivos",
    baixa: "Estabilidade não é prioridade no momento",
  },
  2: {
    atencao: "Focado em seguir orientações",
    pratica: "Prefere aprender na prática",
    anota: "Metódico e organizado",
  },
  3: {
    disponivel: "Total disponibilidade para treinar",
    depende: "Disponibilidade condicional",
    direto: "Prefere início imediato",
  },
  4: {
    equipe: "Adaptável ao trabalho em equipe",
    comunicacao: "Foco em comunicação clara",
    receio: "Necessita de apoio na adaptação",
  },
};

const BehavioralQuiz: React.FC = () => {
  usePixelTracking();
  const navigate = useUtmNavigator();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({ 1: null, 2: null, 3: null, 4: null });

  const pct = Math.round((currentStep / TOTAL_STEPS) * 100);

  const selectAnswer = useCallback((step: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [step]: value }));
  }, []);

  const nextStep = useCallback((next: number) => {
    if (next > TOTAL_STEPS) {
      // Quando termina o quiz, envia para a inscrição
      navigate("/inscricao");
      return;
    }
    setCurrentStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  // Componente de Botão de Opção reutilizável
  const OptionButton = ({
    value,
    label,
    sublabel,
    step,
  }: {
    value: string;
    label: string;
    sublabel: string;
    step: number;
  }) => {
    const selected = answers[step as keyof Answers] === value;
    return (
      <button
        onClick={() => selectAnswer(step, value)}
        className={`flex items-center justify-between gap-3.5 border-2 rounded-[7px] py-3.5 px-[18px] cursor-pointer transition-all text-[15px] font-semibold text-left w-full ${
          selected
            ? "border-[#1351B4] bg-[#e8f0fe]"
            : "border-[#dde3ef] bg-white hover:border-[#1351B4] hover:bg-[#f0f5ff]"
        }`}
      >
        <div className="flex-1">
          <span className="text-[#071d41]">{label}</span>
          <small className="block text-xs text-[#5a6275] font-normal mt-0.5">{sublabel}</small>
        </div>
        <div
          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 relative transition-all ${
            selected ? "border-[#1351B4] bg-[#1351B4]" : "border-[#dde3ef]"
          }`}
        >
          {selected && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[7px] h-[7px] bg-white rounded-full" />
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f6fb]">
      {/* Header */}
      <div className="bg-white border-b border-[#dde3ef] py-4 px-6">
        <h1 className="text-[17px] font-bold text-[#071d41]">Programa Agente Escola</h1>
        <p className="text-[13px] text-[#5a6275] mt-0.5">
          Avaliação de Perfil Comportamental
        </p>
      </div>

      {/* Quiz area */}
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="bg-white rounded-[10px] border border-[#dde3ef] shadow-[0_4px_24px_rgba(0,0,0,0.07)] w-full max-w-[580px] overflow-hidden">
          
          {/* Progress bar */}
          <div className="pt-[22px] px-7">
            <div className="flex justify-between items-center mb-2.5 text-[13px]">
              <span className="text-[#5a6275] font-semibold">
                Etapa {currentStep} de {TOTAL_STEPS}
              </span>
              <span className="text-[#1351B4] font-bold">{pct}%</span>
            </div>
            <div className="h-[5px] bg-[#f4f6fb] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1351B4] rounded-full transition-all duration-400"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Step 1: Estabilidade */}
          {currentStep === 1 && (
            <div className="p-7 pt-7 animate-[fadeUp_0.3s_ease_both]">
              <div className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#1351B4] mb-2">
                Etapa 1 · Carreira
              </div>
              <h2 className="text-[21px] font-bold text-[#071d41] leading-[1.3] mb-2">
                Qual é a importância da estabilidade profissional para você?
              </h2>
              <p className="text-sm text-[#5a6275] mb-6 leading-relaxed">
                Buscamos perfis que desejam crescer junto com o ambiente escolar a longo prazo.
              </p>

              <div className="flex flex-col gap-2.5">
                <OptionButton step={1} value="prioridade" label="Muito importante" sublabel="É uma prioridade absoluta na minha vida" />
                <OptionButton step={1} value="objetivo" label="Importante" sublabel="Faz parte dos meus planos atuais" />
                <OptionButton step={1} value="baixa" label="Pouco importante" sublabel="Não é meu foco principal no momento" />
              </div>
            </div>
          )}

          {/* Step 2: Instruções */}
          {currentStep === 2 && (
            <div className="p-7 pt-7 animate-[fadeUp_0.3s_ease_both]">
              <div className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#1351B4] mb-2">
                Etapa 2 · Execução
              </div>
              <h2 className="text-[21px] font-bold text-[#071d41] leading-[1.3] mb-2">
                Ao receber orientações sobre procedimentos da escola, você:
              </h2>
              <p className="text-sm text-[#5a6275] mb-6 leading-relaxed">
                As rotinas escolares exigem atenção a normas pedagógicas e administrativas.
              </p>

              <div className="flex flex-col gap-2.5">
                <OptionButton step={2} value="anota" label="Anota tudo e segue exatamente" sublabel="Sou metódico e prezo pela precisão" />
                <OptionButton step={2} value="atencao" label="Presta atenção e tira dúvidas" sublabel="Gosto de entender o motivo de cada ação" />
                <OptionButton step={2} value="pratica" label="Prefere aprender na prática" sublabel="Aprendo melhor executando as tarefas" />
              </div>
            </div>
          )}

          {/* Step 3: Treinamento */}
          {currentStep === 3 && (
            <div className="p-7 pt-7 animate-[fadeUp_0.3s_ease_both]">
              <div className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#1351B4] mb-2">
                Etapa 3 · Capacitação
              </div>
              <h2 className="text-[21px] font-bold text-[#071d41] leading-[1.3] mb-2">
                Você está disposta a passar pelo treinamento gratuito antes do início?
              </h2>
              <p className="text-sm text-[#5a6275] mb-6 leading-relaxed">
                O programa prepara você para atuar com segurança em atividades escolares.
              </p>

              <div className="flex flex-col gap-2.5">
                <OptionButton step={3} value="disponivel" label="Sim, com certeza" sublabel="Quero estar preparada antes de começar" />
                <OptionButton step={3} value="depende" label="Depende do horário" sublabel="Sim, desde que seja em horário acessível" />
                <OptionButton step={3} value="direto" label="Prefiro começar direto" sublabel="Acredito que aprendo melhor no dia a dia" />
              </div>
            </div>
          )}

          {/* Step 4: Adaptação */}
          {currentStep === 4 && (
            <div className="p-7 pt-7 animate-[fadeUp_0.3s_ease_both]">
              <div className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#1351B4] mb-2">
                Etapa 4 · Integração
              </div>
              <h2 className="text-[21px] font-bold text-[#071d41] leading-[1.3] mb-2">
                Você acredita que se adaptaria bem à rotina de uma escola pública?
              </h2>
              <p className="text-sm text-[#5a6275] mb-6 leading-relaxed">
                Trabalhamos em equipes multidisciplinares pelo futuro dos alunos.
              </p>

              <div className="flex flex-col gap-2.5">
                <OptionButton step={4} value="equipe" label="Sim, aprendo rápido" sublabel="Com orientação, me adapto a qualquer rotina" />
                <OptionButton step={4} value="comunicacao" label="Sim, com boa comunicação" sublabel="Valorizo o trabalho em equipe e clareza" />
                <OptionButton step={4} value="receio" label="Tenho alguns receios" sublabel="Mudanças me deixam um pouco insegura no início" />
              </div>
            </div>
          )}

          {/* Botão de Próximo / Concluir */}
          <div className="px-7 pb-7">
            <button
              onClick={() => nextStep(currentStep + 1)}
              disabled={!answers[currentStep as keyof Answers]}
              className={`mt-2 w-full rounded-[5px] py-[13px] text-[15px] font-bold text-white transition-colors ${
                answers[currentStep as keyof Answers]
                  ? "bg-[#1351B4] hover:bg-[#0d3f8f] cursor-pointer opacity-100"
                  : "bg-[#1351B4] opacity-35 pointer-events-none"
              }`}
            >
              {currentStep === TOTAL_STEPS ? "Concluir Avaliação" : "Próxima etapa"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BehavioralQuiz;
