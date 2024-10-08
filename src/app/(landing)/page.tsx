'use client'
import { LandingCTA } from '@/designSystem/landing/LandingCTA'
import { LandingContainer } from '@/designSystem/landing/LandingContainer'
import LandingFAQ from '@/designSystem/landing/LandingFAQ'
import { LandingFeatures } from '@/designSystem/landing/LandingFeatures'
import { LandingHero } from '@/designSystem/landing/LandingHero'
import { LandingHowItWorks } from '@/designSystem/landing/LandingHowItWorks'
import { LandingPainPoints } from '@/designSystem/landing/LandingPainPoints'
import { LandingPricing } from '@/designSystem/landing/LandingPricing'
import { LandingSocialProof } from '@/designSystem/landing/LandingSocialProof'
import { LandingSocialRating } from '@/designSystem/landing/LandingSocialRating'
import { LandingTestimonials } from '@/designSystem/landing/LandingTestimonials'
import {
  EditOutlined,
  ShoppingOutlined,
  RocketOutlined,
  HeartOutlined,
  TeamOutlined,
  DollarOutlined,
} from '@ant-design/icons'

export default function LandingPage() {
  const features = [
    {
      heading: `Design Sem Limites`,
      description: `Crie designs únicos com nossa ferramenta intuitiva de personalização.`,
      icon: <EditOutlined />,
    },
    {
      heading: `Variedade de Produtos`,
      description: `Escolha entre uma ampla gama de itens para personalizar, de camisetas a decoração.`,
      icon: <ShoppingOutlined />,
    },
    {
      heading: `Entrega Rápida`,
      description: `Receba seus produtos personalizados em tempo recorde, sem comprometer a qualidade.`,
      icon: <RocketOutlined />,
    },
    {
      heading: `Qualidade Garantida`,
      description: `Utilizamos materiais premium e técnicas de impressão de ponta para resultados excepcionais.`,
      icon: <HeartOutlined />,
    },
    {
      heading: `Suporte Dedicado`,
      description: `Nossa equipe está sempre pronta para ajudar em todas as etapas do processo.`,
      icon: <TeamOutlined />,
    },
    {
      heading: `Preços Competitivos`,
      description: `Oferecemos produtos personalizados de alta qualidade a preços acessíveis.`,
      icon: <DollarOutlined />,
    },
  ]

  const testimonials = [
    {
      name: `Ana Silva`,
      designation: `Empreendedora`,
      content: `O Creative Custom transformou meu negócio! Agora posso oferecer produtos únicos aos meus clientes com facilidade e qualidade impressionante.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Carlos Oliveira`,
      designation: `Designer Freelancer`,
      content: `Como designer, encontrei no Creative Custom a plataforma perfeita para dar vida às minhas criações. A qualidade de impressão é excepcional!`,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      name: `Mariana Santos`,
      designation: `Influenciadora Digital`,
      content: `Criar minha própria linha de produtos personalizados nunca foi tão fácil. Meus seguidores adoram a exclusividade!`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
    {
      name: `Pedro Almeida`,
      designation: `Gerente de Marketing`,
      content: `O Creative Custom nos ajudou a criar brindes corporativos incríveis. A equipe de suporte é fantástica e o processo é super simples.`,
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    {
      name: `Juliana Costa`,
      designation: `Artista Plástica`,
      content: `Encontrei no Creative Custom uma nova forma de expressar minha arte. A qualidade dos produtos e a facilidade de uso da plataforma são incomparáveis.`,
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    {
      name: `Rafael Mendes`,
      designation: `Dono de Loja Virtual`,
      content: `O Creative Custom revolucionou meu e-commerce. Agora ofereço produtos personalizados sem estoque, e meus clientes adoram!`,
      avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  ]

  const navItems = [
    {
      title: `Recursos`,
      link: `#features`,
    },
    {
      title: `Preços`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Básico`,
      description: `Perfeito para iniciantes e projetos pessoais`,
      monthly: 29.9,
      yearly: 299,
      features: [
        `Acesso a todos os produtos`,
        `Editor básico de design`,
        `Suporte por e-mail`,
      ],
    },
    {
      title: `Profissional`,
      description: `Ideal para empreendedores e designers`,
      monthly: 59.9,
      yearly: 599,
      features: [
        `Todos os recursos do plano Básico`,
        `Editor avançado de design`,
        `Prioridade no suporte`,
        `Descontos em pedidos em massa`,
      ],
      highlight: true,
    },
    {
      title: `Empresarial`,
      description: `Para empresas que buscam soluções personalizadas`,
      monthly: 99.9,
      yearly: 999,
      features: [
        `Todos os recursos do plano Profissional`,
        `API de integração`,
        `Gerente de conta dedicado`,
        `Personalização de marca`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `Quanto tempo leva para receber meus produtos personalizados?`,
      answer: `O tempo de entrega varia de acordo com o produto e sua localização, mas geralmente leva de 5 a 10 dias úteis após a aprovação do design.`,
    },
    {
      question: `Posso criar designs para vender em minha própria loja?`,
      answer: `Sim! Você pode criar designs e vender os produtos em sua própria loja. Oferecemos opções de dropshipping para facilitar seu negócio.`,
    },
    {
      question: `Quais são as opções de pagamento disponíveis?`,
      answer: `Aceitamos cartões de crédito, débito, boleto bancário e PIX para sua conveniência.`,
    },
    {
      question: `Vocês oferecem amostras antes de fazer um pedido grande?`,
      answer: `Sim, oferecemos a opção de solicitar amostras com desconto para que você possa verificar a qualidade antes de fazer um pedido maior.`,
    },
  ]

  const logos = [
    { url: 'https://i.imgur.com/afwBIFK.png', name: 'Logo 1' },
    { url: 'https://i.imgur.com/LlloOPa.png', name: 'Logo 2' },
    { url: 'https://i.imgur.com/j8jPb4H.png', name: 'Logo 3' },
    { url: 'https://i.imgur.com/mJ1sZFv.png', name: 'Logo 4' },
  ]

  const steps = [
    {
      heading: `Escolha seu Produto`,
      description: `Selecione entre nossa ampla gama de itens personalizáveis.`,
    },
    {
      heading: `Crie seu Design`,
      description: `Use nossa ferramenta intuitiva para criar um design único ou fazer upload do seu próprio.`,
    },
    {
      heading: `Visualize e Aprove`,
      description: `Veja uma prévia realista do seu produto antes de finalizar o pedido.`,
    },
    {
      heading: `Receba e Desfrute`,
      description: `Nós produzimos e entregamos seu produto personalizado diretamente na sua porta.`,
    },
  ]

  const painPoints = [
    {
      emoji: `😓`,
      title: `Frustração com opções limitadas de personalização`,
    },
    {
      emoji: `💸`,
      title: `Altos custos para pequenas quantidades`,
    },
    {
      emoji: `🕒`,
      title: `Processos demorados e complicados`,
    },
  ]

  const avatarItems = [
    {
      src: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Transforme suas ideias em produtos únicos`}
        subtitle={`Creative Custom: A plataforma brasileira de print on demand que torna a personalização acessível e fácil para todos.`}
        buttonText={`Comece a Criar`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/zmnNH5-creativecustom-yNWT`}
        socialProof={
          <LandingSocialRating
            avatarItems={avatarItems}
            numberOfUsers={1000}
            suffixText={`de criadores satisfeitos`}
          />
        }
      />
      <LandingSocialProof logos={logos} title={`Destaque em`} />
      <LandingPainPoints
        title={`78% dos brasileiros desejam produtos personalizados, mas 65% enfrentam dificuldades. Não seja mais um deles!`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Simples, rápido e intuitivo: Crie produtos únicos em 4 passos`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Desbloqueie seu potencial criativo com nossas ferramentas poderosas`}
        subtitle={`Descubra como o Creative Custom pode transformar suas ideias em realidade`}
        features={features}
      />
      <LandingTestimonials
        title={`Histórias de sucesso: Como o Creative Custom está mudando vidas`}
        subtitle={`Veja como nossos clientes estão realizando seus sonhos com produtos personalizados`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Invista no seu sucesso com nossos planos flexíveis`}
        subtitle={`Escolha o plano perfeito para suas necessidades e comece a criar hoje mesmo`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Dúvidas frequentes`}
        subtitle={`Encontre respostas para suas perguntas sobre o Creative Custom`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Pronto para dar vida às suas ideias?`}
        subtitle={`Junte-se a milhares de criadores brasileiros e comece a personalizar agora mesmo!`}
        buttonText={`Criar Minha Conta`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
