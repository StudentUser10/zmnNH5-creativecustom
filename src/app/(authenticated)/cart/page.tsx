'use client'

import { Typography, List, Card, Button, InputNumber, Space, Empty } from 'antd'
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { Prisma } from '@prisma/client'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ShoppingCartPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [cartItems, setCartItems] = useState<
    Prisma.CartItemGetPayload<{ include: { product: true } }>[]
  >([])
  const [totalAmount, setTotalAmount] = useState(0)

  const {
    data: cart,
    isLoading,
    refetch,
  } = Api.cart.findFirst.useQuery({
    where: { userId: user?.id },
    include: { cartItems: { include: { product: true } } },
  })

  const { mutateAsync: updateCartItem } = Api.cartItem.update.useMutation()
  const { mutateAsync: deleteCartItem } = Api.cartItem.delete.useMutation()

  useEffect(() => {
    if (cart?.cartItems) {
      setCartItems(cart.cartItems)
      calculateTotal(cart.cartItems)
    }
  }, [cart])

  const calculateTotal = (
    items: Prisma.CartItemGetPayload<{ include: { product: true } }>[],
  ) => {
    const total = items.reduce((acc, item) => {
      return acc + parseFloat(item.product?.price || '0') * (item.quantity || 0)
    }, 0)
    setTotalAmount(total)
  }

  const handleQuantityChange = async (id: string, quantity: number | null) => {
    if (quantity === null) return
    try {
      await updateCartItem({ where: { id }, data: { quantity } })
      await refetch()
      enqueueSnackbar('Carrinho atualizado com sucesso', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Falha ao atualizar o carrinho', { variant: 'error' })
    }
  }

  const handleRemoveItem = async (id: string) => {
    try {
      await deleteCartItem({ where: { id } })
      await refetch()
      enqueueSnackbar('Item removido do carrinho', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Falha ao remover o item', { variant: 'error' })
    }
  }

  const handleCheckout = () => {
    router.push('/checkout')
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Text>Carregando...</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Carrinho de Compras</Title>
      <Text>Gerencie suas compras antes de finalizar</Text>
      {cartItems.length > 0 ? (
        <>
          <List
            dataSource={cartItems}
            renderItem={item => (
              <List.Item>
                <Card style={{ width: '100%' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Text strong>{item.product?.name}</Text>
                    <Text>Preço: ${item.product?.price}</Text>
                    <Space>
                      <Text>Quantidade:</Text>
                      <InputNumber
                        min={1}
                        value={item.quantity || 0}
                        onChange={value => handleQuantityChange(item.id, value)}
                      />
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remover
                      </Button>
                    </Space>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
          <Card style={{ marginTop: '20px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Total: R${totalAmount.toFixed(2)}</Text>
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                {cartItems.length === 0 ? 'Carrinho Vazio' : 'Finalizar Compra'}
              </Button>
            </Space>
          </Card>
        </>
      ) : (
        <Empty
          description="Seu carrinho está vazio"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </PageLayout>
  )
}
