'use client'

import { Typography, Spin, Card, Descriptions, List, Row, Col } from 'antd'
import { CheckCircleOutlined, ShoppingOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function OrderConfirmationPage() {
  const router = useRouter()
  const params = useParams<{ orderId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: order, isLoading } = Api.order.findUnique.useQuery({
    where: { id: params.orderId },
    include: { orderItems: { include: { product: true } } },
  })

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!order) {
    enqueueSnackbar('Pedido não encontrado', { variant: 'error' })
    router.push('/home')
    return null
  }

  return (
    <PageLayout layout="narrow">
      <Card>
        <Title level={2}>
          <CheckCircleOutlined style={{ color: '#52c41a' }} /> Confirmação do Pedido
        </Title>
        <Paragraph>
          Obrigado pela sua compra! Uma confirmação por e-mail foi enviada para
          o seu endereço de e-mail registrado.
        </Paragraph>

        <Descriptions title="Detalhes do Pedido" bordered column={1}>
          <Descriptions.Item label="ID do Pedido">{order.id}</Descriptions.Item>
          <Descriptions.Item label="Data">
            {dayjs(order.dateCreated).locale('pt-br').format('D [de] MMMM [de] YYYY [às] HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{order.status}</Descriptions.Item>
          <Descriptions.Item label="Valor Total">
            R${order.totalAmount}
          </Descriptions.Item>
          <Descriptions.Item label="Endereço de Entrega">
            {order.shippingAddress}
          </Descriptions.Item>
          <Descriptions.Item label="Informações de Pagamento">
            {order.paymentInfo}
          </Descriptions.Item>
        </Descriptions>

        <Title level={4} style={{ marginTop: '24px' }}>
          <ShoppingOutlined /> Itens Pedidos
        </Title>
        <List
          dataSource={order.orderItems}
          renderItem={item => (
            <List.Item>
              <Row style={{ width: '100%' }}>
                <Col span={12}>
                  <Text strong>{item.product?.name}</Text>
                </Col>
                <Col span={4}>
                  <Text>Quantidade: {item.quantity?.toString()}</Text>
                </Col>
                <Col span={4}>
                  <Text>Preço: R${item.price}</Text>
                </Col>
                <Col span={4}>
                  <Text strong>
                    Total: R$
                    {(Number(item.price) * (item.quantity || 0)).toFixed(2)}
                  </Text>
                </Col>
              </Row>
            </List.Item>
          )}
        />

        <Paragraph style={{ marginTop: '24px' }}>
          Se você tiver alguma dúvida sobre seu pedido, por favor visite nossa{' '}
          <a onClick={() => router.push('/support')}>Página de Suporte</a>.
        </Paragraph>
      </Card>
    </PageLayout>
  )
}
