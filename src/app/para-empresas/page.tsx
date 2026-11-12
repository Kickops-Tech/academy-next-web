import { SiteFooter } from "@core/components/site-footer";
import { WireframeGlobeBand } from "@core/components/wireframe-globe-band";
import { ContentsMain } from "@features/contents/components/contents-main";
import { CompanyContactSection } from "@features/contact/components/company-contact-section";
import { FormatsMain } from "@features/formats/components/formats-main";
import { MomentsMain } from "@features/moments/components/moments-main";
import { HeroMain } from "@features/hero/components/hero-main";
import { PeopleMain } from "@features/people/components/people-main";
import { OutcomesMain } from "@features/outcomes/components/outcomes-main";
import { TrainingsHeader } from "@features/trainings/components/trainings-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treinamento em IA para lideranças | Kickops Academy",
  description:
    "Capacite sua liderança para decidir com IA. Treinamento sob medida para os desafios da sua empresa, presencial ou online, com sessão de acompanhamento.",
};

export default function ParaEmpresasPage() {
  return (
    <>
      <main>
        <HeroMain>
          <TrainingsHeader current="empresas" />
        </HeroMain>
        <OutcomesMain />
        <WireframeGlobeBand>
          <ContentsMain />
          <MomentsMain />
          {/* Formats and People share the brain artwork and its gray band. */}
          <div
            data-brain-hover-root=""
            data-globe-section="formats"
            className="relative flex flex-col overflow-clip"
          >
            <FormatsMain />
            <div id="quem-conduz" className="relative z-[1] flex flex-col">
              <PeopleMain />
            </div>
          </div>
        </WireframeGlobeBand>
        <CompanyContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
