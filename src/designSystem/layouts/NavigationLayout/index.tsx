import { useUserContext } from '@/core/context'
import { Flex } from 'antd'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Mobilebar } from './components/Mobilebar'
import { Topbar } from './components/Topbar'
import { NavigationItem } from './types'

interface Props {
  children: ReactNode
  isAdmin: boolean
}

export const NavigationLayout: React.FC<Props> = ({ children, isAdmin }) => {
  const router = useRouter()
  const pathname = usePathname()
  const params: Record<string, string> = useParams()
  const { user } = useUserContext()

  const goTo = (url: string) => {
    router.push(url)
  }

  const items: NavigationItem[] = [
    {
      key: '/home',
      label: 'Home Page',
      position: 'topbar',

      onClick: () => goTo('/home'),
    },

    {
      key: '/cart',
      label: 'Shopping Cart Page',
      position: 'topbar',

      onClick: () => goTo('/cart'),
    },

    {
      key: '/checkout',
      label: 'Checkout Page',
      position: 'topbar',

      onClick: () => goTo('/checkout'),
    },

    {
      key: '/my-account',
      label: 'My Account Page',
      position: 'topbar',

      onClick: () => goTo('/my-account'),
    },

    {
      key: '/admin',
      label: 'Admin Dashboard Page',
      position: 'topbar',
      isVisible: isAdmin || user?.email === "admin@admin.com",
      onClick: () => goTo('/admin'),
    },

    {
      key: '/support',
      label: 'Support Page',
      position: 'topbar',

      onClick: () => goTo('/support'),
    },

    {
      key: '/pricing',
      label: 'Pricing',

      position: 'topbar',

      onClick: () => goTo('/pricing'),
    },
  ]

  const itemsVisible = items
    .filter(item => item.isVisible !== false)
    .map(item => ({
      key: item.key,
      label: item.label,
      position: item.position,
      onClick: item.onClick,
    }))

  const itemsTopbar = itemsVisible.filter(item => item.position === 'topbar')

  const itemsLeftbar = itemsVisible.filter(item => item.position === 'leftbar')

  const itemsLeftbottom = itemsVisible.filter(
    item => item.position === 'leftbar-bottom',
  )

  const itemsMobile = itemsVisible

  let keySelected = pathname

  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`)
  })

  return (
    <>
      <Topbar keySelected={keySelected} items={itemsTopbar} />

      <Mobilebar keySelected={keySelected} items={itemsMobile} />

      <Flex flex={1} style={{ overflowY: 'hidden' }}>
        <Leftbar
          keySelected={keySelected}
          items={itemsLeftbar}
          itemsBottom={itemsLeftbottom}
        />

        <Flex flex={1} vertical style={{ overflowY: 'hidden' }}>
          {children}
        </Flex>
      </Flex>
    </>
  )
}
