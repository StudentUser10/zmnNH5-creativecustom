'use client'

import { Typography, Spin, Card, List, Button, Row, Col, Modal } from 'antd'
import {
  UserOutlined,
  HistoryOutlined,
  ReloadOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useState } from 'react'

export default function MyAccountPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  const { data: orders, isLoading: ordersLoading } =
    Api.order.findMany.useQuery({
      where: { userId: user?.id },
      include: { orderItems: { include: { product: true } } },
    })

  const { mutateAsync: reorder } = Api.cart.create.useMutation()
  const { mutateAsync: deleteAccount } = Api.user.delete.useMutation()

  const handleReorder = async (orderId: string) => {
    try {
      const order = orders?.find(o => o.id === orderId)
      if (order) {
        await reorder({
          data: {
            userId: user?.id,
            cartItems: {
              create: order.orderItems.map(item => ({
                quantity: item.quantity,
                customizationData: item.customizationData,
                productId: item.productId,
              })),
            },
          },
        })
        enqueueSnackbar('Itens adicionados ao carrinho com sucesso', {
          variant: 'success',
        })
        router.push('/cart')
      }
    } catch (error) {
      enqueueSnackbar('Falha ao repetir o pedido', { variant: 'error' })
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount({ where: { id: user?.id } })
      enqueueSnackbar('Conta excluída com sucesso. Redirecionando para a página inicial.', { variant: 'success' })
      router.push('/')
    } catch (error) {
      enqueueSnackbar('Falha ao excluir a conta', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Minha Conta</Title>
      <Text>Gerencie suas informações de conta e visualize seu histórico de pedidos.</Text>

      <Card style={{ marginTop: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Title level={4}>
              <UserOutlined /> Informações da Conta
            </Title>
            {user ? (
              <>
                <Text strong>Nome:</Text> <Text>{user.name}</Text>
                <br />
                <Text strong>E-mail:</Text> <Text>{user.email}</Text>
                <br />
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => setIsDeleteModalVisible(true)}
                  style={{ marginTop: '16px' }}
                >
                  Excluir Conta
                </Button>
              </>
            ) : (
              <Spin />
            )}
          </Col>
          <Col xs={24} sm={12}>
            <Title level={4}>
              <HistoryOutlined /> Histórico de Pedidos
            </Title>
            {ordersLoading ? (
              <Spin />
            ) : (
              <List
                dataSource={orders}
                renderItem={order => (
                  <List.Item
                    actions={[
                      <Button
                        key="reorder"
                        icon={<ReloadOutlined />}
                        onClick={() => handleReorder(order.id)}
                      >
                        Repetir Pedido
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`Pedido #${order.id}`}
                      description={
                        <>
                          <Text>
                            Data:{' '}
                            {dayjs(order.dateCreated).locale('pt-br').format('D [de] MMMM [de] YYYY')}
                          </Text>
                          <br />
                          <Text>Total: R${order.totalAmount}</Text>
                          <br />
                          <Text>Status: {order.status}</Text>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </Col>
        </Row>
      </Card>

      <Modal
        title="Confirmar exclusão de conta"
        visible={isDeleteModalVisible}
        onOk={handleDeleteAccount}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Confirmar"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.</p>
      </Modal>
    </PageLayout>
  )
}
