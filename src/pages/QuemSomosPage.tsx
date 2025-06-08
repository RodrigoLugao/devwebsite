import logo from "../assets/images/simasautologofull.png";
import Breadcrumbs from "../components/Breadcrumbs";

const QuemSomosPage = () => {
  return (
    <div className="container mb-4 pt-5" style={{ marginTop: "94px" }}>
      <Breadcrumbs anteriores={[{nome: "Início", link:"/"}]} atual={"Quem Somos"}></Breadcrumbs>

      <p className="mb-4 h3">Quem Somos</p>
      <hr />
      <p className="h4">Simas Auto: Seu parceiro na estrada para o futuro.</p>

      <div className="mt-5 mb-5">
        <img
          src={logo}
          alt="Logo da Simas Auto"
          className="float-start me-3 mb-3"
          style={{ width: "300px", height: "auto" }}
        />
        <p>
          Desde 1995, a Simas Auto é sinônimo de qualidade, confiança e inovação
          no mercado automotivo. Fundada com o propósito de oferecer aos nossos
          clientes as melhores soluções em mobilidade, nos tornamos uma
          referência ao reunir uma ampla variedade de carros e motos que
          combinam desempenho, segurança e tecnologia de ponta. Ao longo de
          nossa trajetória, construímos uma reputação sólida baseada em nosso
          compromisso com a excelência. Cada veículo em nosso portfólio reflete
          nosso cuidado em atender às necessidades de nossos clientes, sejam
          elas relacionadas ao conforto, eficiência ou sustentabilidade.
          Valorizamos cada detalhe para garantir que você esteja dirigindo o que
          há de melhor no mercado. Nosso diferencial está em nossa equipe
          altamente capacitada e em nossa paixão por inovação. Trabalhamos
          constantemente para trazer novidades que entreguem mais do que apenas
          um meio de transporte, mas uma experiência completa que conecta você
          ao futuro da mobilidade. Além disso, acreditamos que nosso papel vai
          além das vendas. Estamos comprometidos com a construção de uma relação
          de confiança e duradoura com nossos clientes, oferecendo suporte
          contínuo por meio de serviços de manutenção, revisão e fornecimento de
          peças originais. É nossa missão garantir que cada momento com um
          veículo da Simas Auto seja marcado pela segurança e tranquilidade.
          Como parte de nossa visão, buscamos também promover um impacto
          positivo em nossa comunidade. Valorizamos práticas sustentáveis,
          responsabilidade social e investimos em iniciativas que ajudam a
          construir um futuro mais limpo e acessível para todos. Simas Auto:
          mais do que uma concessionária, uma parceira confiável na sua jornada
          automotiva.
        </p>
      </div>

      <div className="bg-light p-4 rounded">
        <blockquote className="blockquote">
          <p className="mb-0" style={{ fontStyle: "italic" }}>
            Quem diria que a <strong>Simas Auto</strong> me ajudaria a reviver
            as melhores aventuras da minha vida? Quando vi o
            <strong> DeLorean</strong> na loja, foi como ser transportado de
            volta a 1985. O pessoal lá entendeu exatamente o que eu precisava:
            um carro icônico, com estilo futurista e pronto para qualquer
            viagem, seja no tempo ou no espaço.
          </p>
          <p style={{ fontStyle: "italic" }}>
            O <strong>DeLorean</strong> que comprei é perfeito – parece até que
            o Doc mesmo deu uma revisada! A pintura prateada brilha mais que o
            capacitor de fluxo quando está em pleno funcionamento. Só faltou o
            painel com a data digital e o cronômetro, mas isso já é detalhe!
            Confesso que, dirigindo ele, ouço mentalmente o som de
            <em> The Power of Love</em> enquanto imagino a trilha sonora da
            minha nova história.
          </p>
          <p style={{ fontStyle: "italic" }}>
            Agora, é como o Doc sempre disse:
            <q> O futuro não está escrito, é o que você faz dele</q> – e a
            <strong> Simas Auto</strong> me ajudou a começar o meu da melhor
            forma possível. Obrigado, pessoal!
          </p>
          <footer className="blockquote-footer">Marty McFly</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default QuemSomosPage;
