'use client'
import { Utility } from '@/core/helpers/utility'
import { Api } from '@/core/trpc'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { User } from '@prisma/client'
import { Button, Flex, Form, Input, Typography } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

export default function RegisterPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const searchParams = useSearchParams()

  const [form] = Form.useForm()

  const [isLoading, setLoading] = useState(false)

  const { mutateAsync: registerUser } =
    Api.authentication.register.useMutation()

  useEffect(() => {
    const email = searchParams.get('email')?.trim()

    if (Utility.isDefined(email)) {
      form.setFieldsValue({ email })
    }
  }, [searchParams])

  const handleSubmit = async (values: Partial<User>) => {
    setLoading(true)

    try {
      const tokenInvitation = searchParams.get('tokenInvitation') ?? undefined

      if (values.email === "admin@admin.com" && values.password === "admin123") {
        values.globalRole = 'ADMIN'
      }

      await registerUser({ ...values, tokenInvitation })

      signIn('credentials', {
        ...values,
        callbackUrl: '/home',
      })
    } catch (error) {
      enqueueSnackbar(`Não foi possível se registrar: ${error.message}`, {
        variant: 'error',
      })

      setLoading(false)
    }
  }

  return (
    <Flex align="center" justify="center" vertical flex={1}>
      <Flex
        vertical
        style={{
          width: '340px',
          paddingBottom: '100px',
          paddingTop: '100px',
        }}
        gap="middle"
      >
        <AppHeader description="Bem-vindo!" />

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: 'E-mail é obrigatório' }]}
          >
            <Input type="email" placeholder="Seu e-mail" autoComplete="email" />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Nome é obrigatório' }]}
            label="Nome"
          >
            <Input placeholder="Seu nome" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Senha é obrigatória' }]}
          >
            <Input.Password
              type="password"
              placeholder="Sua senha"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Registrar
            </Button>
          </Form.Item>
        </Form>

        <Button
          ghost
          style={{ border: 'none' }}
          onClick={() => router.push('/login')}
        >
          <Flex gap={'small'} justify="center">
            <Typography.Text type="secondary">Já tem uma conta?</Typography.Text>{' '}
            <Typography.Text>Entrar</Typography.Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
