'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  MessageOutlined,
  QuestionCircleOutlined,
  SendOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
const { Title, Paragraph, Text } = Typography
const { Panel } = Collapse
const { TextArea } = Input

export default function SupportPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [chatMessage, setChatMessage] = useState('')
  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; content: string }[]
  >([])
  const [isLoading, setIsLoading] = useState(false)

  const { mutateAsync: createSupportMessage } =
    Api.supportMessage.create.useMutation()

  const { mutateAsync: generateText } = Api.ai.generateText.useMutation()

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
        setIsLoading(true)
        // Add user message to chat
        const userMessage = { sender: 'user' as const, content: chatMessage }
        setMessages(prev => [...prev, userMessage])

        // Save user message to support system
        await createSupportMessage({
          data: {
            name: user?.name || 'Anônimo',
            email: user?.email || 'anonimo@exemplo.com',
            message: chatMessage,
            userId: user?.id,
          },
        })

        // Get AI response
        const { answer } = await generateText({
          prompt: `Please help this customer with their question about Creative Custom: ${chatMessage}`,
        })

        // Add AI response to chat
        const aiMessage = { sender: 'ai' as const, content: answer }
        setMessages(prev => [...prev, aiMessage])

        setChatMessage('')
      } catch (error) {
        enqueueSnackbar(
          'Falha ao enviar mensagem de chat. Por favor, tente novamente.',
          {
            variant: 'error',
          },
        )
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Central de Suporte</Title>
        <Paragraph>
          Bem-vindo à nossa Central de Suporte. Aqui você pode encontrar
          respostas para perguntas frequentes, enviar um formulário de contato
          ou usar nosso chat ao vivo para assistência imediata.
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
                rules={[
                  { required: true, message: 'Por favor, insira seu nome' },
                ]}
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
            <div
              style={{
                height: '400px',
                overflowY: 'auto',
                marginBottom: '20px',
                padding: '20px',
              }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent:
                        message.sender === 'user' ? 'flex-end' : 'flex-start',
                      marginBottom: '10px',
                    }}
                  >
                    <Card
                      style={{
                        maxWidth: '70%',
                        backgroundColor:
                          message.sender === 'user' ? '#e6f7ff' : '#f5f5f5',
                      }}
                    >
                      <Text style={{ color: '#000000' }}>{message.content}</Text>
                    </Card>
                  </div>
                ))}
              </Space>
            </div>
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
                loading={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar'}
              </Button>
            </Input.Group>
          </Col>
        </Row>
      </Space>
    </PageLayout>
  )
}
