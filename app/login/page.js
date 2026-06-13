import AuthForm from '@/components/AuthForm';

export const metadata = {
  title: 'Login — TaskMatrix',
  description: 'Sign in to your TaskMatrix account to manage your projects and tasks.',
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
