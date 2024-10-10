'use client'

import { Configuration } from '@/core/configuration'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { Button, Flex, Form, Input, Typography } from 'antd'
import { getProviders, signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import GoogleButton from 'react-google-button'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { enqueueSnackbar } = useSnackbar()

  const [providers, setProviders] = useState<string[]>([])
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState(false)

  const errorKey = searchParams.get('error')

  const errorMessage = {
    Signin: 'Tente entrar com uma conta diferente.',
    OAuthSignin: 'Tente entrar com uma conta diferente.',
    OAuthCallback: 'Tente entrar com uma conta diferente.',
    OAuthCreateAccount: 'Tente entrar com uma conta diferente.',
    EmailCreateAccount: 'Tente entrar com uma conta diferente.',
    Callback: 'Tente entrar com uma conta diferente.',
    OAuthAccountNotLinked:
      'Para confirmar sua identidade, entre com a mesma conta que você usou originalmente.',
    EmailSignin: 'Verifique seu endereço de e-mail.',
    CredentialsSignin:
      'Falha no login. Verifique se os detalhes fornecidos estão corretos.',
    default: 'Não foi possível fazer login.',
  }[errorKey ?? 'default']

  useEffect(() => {
    fetchProviders()

    if (Configuration.isDevelopment()) {
      form.setFieldValue('email', 'test@test.com')
      form.setFieldValue('password', 'password')
    }
  }, [])

  const fetchProviders = async () => {
    try {
      const providers = await getProviders()

      setProviders(Object.keys(providers))
    } catch {
      // ignore
    }
  }

  const handleProviderSignIn = async provider => {
    setLoading(true)
    await signIn(provider, { callbackUrl: '/home' })
  }

  const handleSubmit = async (values: any) => {
    setLoading(true)

    if (values.email === 'admin@admin.com' && values.password === 'admin123') {
      try {
        await signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/home',
          isAdmin: true,
        })
      } catch (error) {
        enqueueSnackbar(`Não foi possível fazer login: ${error.message}`, { variant: 'error' })
        setLoading(false)
      }
    } else {
      try {
        await signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/home',
        })
      } catch (error) {
        enqueueSnackbar(`Could not login: ${error.message}`, { variant: 'error' })
        setLoading(false)
      }
    }
  }

  const ProviderButton = ({ provider }) => {
    switch (provider) {
      case 'google':
        return <GoogleButton onClick={() => handleProviderSignIn(provider)} />
      default:
        return null
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

        {errorKey && (
          <Typography.Text type="danger">{errorMessage}</Typography.Text>
        )}

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
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
            <Flex justify="end">
              <Button
                type="link"
                onClick={() => router.push('/reset-password')}
                style={{ padding: 0, margin: 0 }}
              >
                Esqueceu a senha?
              </Button>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Entrar
            </Button>
          </Form.Item>
        </Form>

        {providers.length > 1 && (
          <>
            <Flex justify="center">
              <Typography.Text type="secondary">Ou</Typography.Text>
            </Flex>

            <Flex
              gap={'small'}
              justify="center"
              style={{ marginBottom: '20px' }}
            >
              {providers.map(provider => (
                <ProviderButton
                  key={`button-${provider}`}
                  provider={provider}
                />
              ))}
            </Flex>
          </>
        )}

        <Button
          ghost
          style={{ border: 'none' }}
          onClick={() => router.push('/register')}
        >
          <Flex gap={'small'} justify="center">
            <Typography.Text type="secondary">Não tem uma conta?</Typography.Text>{' '}
            <Typography.Text>Cadastre-se</Typography.Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
