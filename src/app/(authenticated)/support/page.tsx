'use client'

import {
  Typography,
  Form,
  Input,
  Button,
  Collapse,
  Row,
  Col,
  Space,
} from 'antd'
import {
  QuestionCircleOutlined,
  MessageOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Paragraph } = Typography
const { Panel } = Collapse
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function SupportPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [chatMessage, setChatMessage] = useState('')

  const { mutateAsync: createSupportMessage } =
    Api.supportMessage.create.useMutation()

  const faqData = [
    {
      question: 'Como faço para rastrear meu pedido?',
      answer:
        'Você pode rastrear seu pedido fazendo login em sua conta e visitando a seção "Meus Pedidos".',
    },
    {
      question: 'Qual é a política de devolução?',
      answer:
        'Oferecemos uma política de devolução de 30 dias para a maioria dos itens. Por favor, verifique nossa página de Devoluções para mais detalhes.',
    },
    {
      question: 'Como posso alterar meu endereço de entrega?',
      answer:
        'Você pode atualizar seu endereço de entrega nas configurações da sua conta ou durante o processo de checkout.',
    },
  ]

  const handleContactSubmit = async (values: any) => {
    try {
      await createSupportMessage({
        data: {
          name: values.name,
          email: values.email,
          message: values.message,
          userId: user?.id,
        },
      })
      enqueueSnackbar('Sua mensagem foi enviada com sucesso!', {
        variant: 'success',
      })
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Falha ao enviar mensagem. Por favor, tente novamente.', {
        variant: 'error',
      })
    }
  }

  const handleChatSubmit = async () => {
    if (chatMessage.trim()) {
      try {
        await createSupportMessage({
          data: {
            name: user?.name || 'Anônimo',
            email: user?.email || 'anonimo@exemplo.com',
            message: chatMessage,
            userId: user?.id,
          },
        })
        enqueueSnackbar('Mensagem de chat enviada com sucesso!', {
          variant: 'success',
        })
        setChatMessage('')
      } catch (error) {
        enqueueSnackbar('Falha ao enviar mensagem de chat. Por favor, tente novamente.', {
          variant: 'error',
        })
      }
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Central de Suporte</Title>
        <Paragraph>
          Bem-vindo à nossa Central de Suporte. Aqui você pode encontrar respostas para perguntas
          frequentes, enviar um formulário de contato ou usar nosso chat ao vivo para
          assistência imediata.
        </Paragraph>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Title level={3}>
              <QuestionCircleOutlined /> Perguntas Frequentes
            </Title>
            <Collapse>
              {faqData.map((faq, index) => (
                <Panel header={faq.question} key={index}>
                  <p>{faq.answer}</p>
                </Panel>
              ))}
            </Collapse>
          </Col>

          <Col xs={24} md={12}>
            <Title level={3}>Entre em Contato</Title>
            <Form form={form} layout="vertical" onFinish={handleContactSubmit}>
              <Form.Item
                name="name"
                label="Nome"
                rules={[{ required: true, message: 'Por favor, insira seu nome' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Por favor, insira um e-mail válido',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="message"
                label="Mensagem"
                rules={[
                  { required: true, message: 'Por favor, insira sua mensagem' },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Enviar
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

        <Title level={3}>
          <MessageOutlined /> Chat ao Vivo
        </Title>
        <Row>
          <Col xs={24}>
            <Input.Group compact>
              <Input
                style={{ width: 'calc(100% - 100px)' }}
                value={chatMessage}
                onChange={e => setChatMessage(e.target.value)}
                placeholder="Digite sua mensagem aqui..."
              />
              <Button
                type="primary"
                onClick={handleChatSubmit}
                icon={<SendOutlined />}
              >
                Enviar
              </Button>
            </Input.Group>
          </Col>
        </Row>
      </Space>
    </PageLayout>
  )
}
