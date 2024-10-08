'use client'

import { useState } from 'react'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

const packages = [
  {
    id: 'basic',
    title: 'Básico',
    description: 'Perfeito para iniciantes e projetos pessoais',
    monthly: 29.9,
    yearly: 299,
    features: [
      'Acesso a todos os produtos',
      'Editor básico de design',
      'Suporte por e-mail',
    ],
  },
  {
    id: 'professional',
    title: 'Profissional',
    description: 'Ideal para empreendedores e designers',
    monthly: 59.9,
    yearly: 599,
    features: [
      'Todos os recursos do plano Básico',
      'Editor avançado de design',
      'Prioridade no suporte',
      'Descontos em pedidos em massa',
    ],
    highlight: true,
  },
  {
    id: 'enterprise',
    title: 'Empresarial',
    description: 'Para empresas que buscam soluções personalizadas',
    monthly: 99.9,
    yearly: 999,
    features: [
      'Todos os recursos do plano Profissional',
      'API de integração',
      'Gerente de conta dedicado',
      'Personalização de marca',
    ],
  },
]

const PricingCard = ({ plan, isYearly, isPopular }) => {
  const { mutateAsync: createPaymentLink } =
    Api.billing.createPaymentLink.useMutation()

  const handleClick = async () => {
    const { url } = await createPaymentLink({ productId: plan.id })
    window.open(url, '_blank')
  }

  const price = isYearly ? plan.yearly : plan.monthly

  return (
    <div className="relative">
      {isPopular && (
        <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Mais Popular
        </span>
      )}
      <div className={`flex flex-col p-6 mx-auto max-w-lg text-center ${isPopular ? 'bg-gray-900 text-white' : 'bg-gray-800 text-gray-300'} rounded-lg border ${isPopular ? 'border-orange-500' : 'border-gray-700'} shadow xl:p-8`}>
        <h3 className="mb-4 text-2xl font-semibold">{plan.title}</h3>
        <p className="font-light text-gray-400 sm:text-lg">{plan.description}</p>
        <div className="flex justify-center items-baseline my-8">
          <span className="mr-2 text-5xl font-extrabold">R${price.toFixed(1)}</span>
          <span className="text-gray-400">/mês</span>
        </div>
        <ul role="list" className="mb-8 space-y-4 text-left">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <button onClick={handleClick} className={`w-full ${isPopular ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'} focus:ring-4 focus:ring-blue-200 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
          Começar Agora
        </button>
      </div>
    </div>
  )
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <PageLayout isCentered>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">Invista no seu sucesso com nossos planos flexíveis</h2>
          <p className="mb-5 font-light text-gray-400 sm:text-xl">Escolha o plano perfeito para suas necessidades e comece a criar hoje mesmo</p>
        </div>
        <div className="flex justify-center mb-8">
          <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-300">{isYearly ? 'Anual' : 'Mensal'}</span>
          </label>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {packages.map(plan => (
            <PricingCard key={plan.id} plan={plan} isYearly={isYearly} isPopular={plan.id === 'professional'} />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
