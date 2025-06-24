import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import axios from 'axios';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
    subdomain: string;
};

export default function Register() {
    const [subdomainStatus, setSubdomainStatus] = useState<{ status: boolean; message: string } | null>(null);

    const checkSubdomain = async (subdomain: string) => {
        if (!subdomain) {
            setSubdomainStatus(null);
            return;
        }
        try {
            const response = await axios.post(route('accounts.subdomain'), { subdomain });
            setSubdomainStatus(response.data);
        } catch (error) {
            setSubdomainStatus({ status: false, message: 'Error checking subdomain.' });
        }
    };

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
        subdomain: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Register" description="Enter your details below to register for the application">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">First Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.firstname}
                            onChange={(e) => setData('firstname', e.target.value)}
                            disabled={processing}
                            placeholder=""
                        />
                        <InputError message={errors.firstname} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">LastName</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.lastname}
                            onChange={(e) => setData('lastname', e.target.value)}
                            disabled={processing}
                            placeholder=""
                        />
                        <InputError message={errors.firstname} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="subdomain">Subdomain</Label>
                        <Input
                            id="subdomain"
                            type="text"
                            value={data.subdomain}
                            onChange={(e) => {
                                setData('subdomain', e.target.value);
                                checkSubdomain(e.target.value);
                            }}
                            onBlur={(e) => checkSubdomain(e.target.value)}
                            disabled={processing}
                            placeholder="Enter subdomain"
                        />
                        {subdomainStatus && (
                            <div className={subdomainStatus.status ? 'text-green-600 text-xs mt-1' : 'text-red-600 text-xs mt-1'}>
                                {subdomainStatus.message}
                            </div>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Register
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Already registered?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
