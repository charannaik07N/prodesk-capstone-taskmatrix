import AuthForm from '@/components/AuthForm';

export const metadata = {
  title: 'Create Account — TaskMatrix',
  description: 'Create your free TaskMatrix account and start managing your team projects today.',
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
