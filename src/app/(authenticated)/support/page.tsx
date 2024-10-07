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
      question: 'How do I track my order?',
      answer:
        'You can track your order by logging into your account and visiting the "My Orders" section.',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy for most items. Please check our Returns page for more details.',
    },
    {
      question: 'How can I change my shipping address?',
      answer:
        'You can update your shipping address in your account settings or during the checkout process.',
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
      enqueueSnackbar('Your message has been sent successfully!', {
        variant: 'success',
      })
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to send message. Please try again.', {
        variant: 'error',
      })
    }
  }

  const handleChatSubmit = async () => {
    if (chatMessage.trim()) {
      try {
        await createSupportMessage({
          data: {
            name: user?.name || 'Anonymous',
            email: user?.email || 'anonymous@example.com',
            message: chatMessage,
            userId: user?.id,
          },
        })
        enqueueSnackbar('Chat message sent successfully!', {
          variant: 'success',
        })
        setChatMessage('')
      } catch (error) {
        enqueueSnackbar('Failed to send chat message. Please try again.', {
          variant: 'error',
        })
      }
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Support Center</Title>
        <Paragraph>
          Welcome to our Support Center. Here you can find answers to frequently
          asked questions, submit a contact form, or use our live chat for
          immediate assistance.
        </Paragraph>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Title level={3}>
              <QuestionCircleOutlined /> FAQ
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
            <Title level={3}>Contact Us</Title>
            <Form form={form} layout="vertical" onFinish={handleContactSubmit}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please enter a valid email',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="message"
                label="Message"
                rules={[
                  { required: true, message: 'Please enter your message' },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

        <Title level={3}>
          <MessageOutlined /> Live Chat
        </Title>
        <Row>
          <Col xs={24}>
            <Input.Group compact>
              <Input
                style={{ width: 'calc(100% - 100px)' }}
                value={chatMessage}
                onChange={e => setChatMessage(e.target.value)}
                placeholder="Type your message here..."
              />
              <Button
                type="primary"
                onClick={handleChatSubmit}
                icon={<SendOutlined />}
              >
                Send
              </Button>
            </Input.Group>
          </Col>
        </Row>
      </Space>
    </PageLayout>
  )
}
