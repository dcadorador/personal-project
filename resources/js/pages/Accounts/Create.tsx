import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
import {useForm} from '@inertiajs/react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import axios from 'axios';
import { useState } from 'react';



type State = { id: number | string; name: string };

export default function Create({ states = [] }: { states: State[] }) {
    const [subdomainStatus, setSubdomainStatus] = useState<{ status: boolean; message: string } | null>(null);

    const checkSubdomain = async (subdomain: string) => {
        if (!subdomain) {
            setSubdomainStatus(null);
            return;
        }
        try {
            const response = await axios.post(route('accounts.subdomain'), { subdomain });
            setSubdomainStatus(response.data);
        } catch (e) {
            setSubdomainStatus({ status: false, message: 'Error checking subdomain.' });
        }
    };

    const {data, setData, post, processing, errors, reset} = useForm({
        business_name: '',
        company_name: '',
        address: '',
        address1: '',
        subdomain: '',
        mobile: '',
        phone: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });
    return(
        <AuthLayout title="Create a Office Account" description="">
            <Head title="Create an account" />
            <form className="flex flex-col gap-6 w-full">
                <div className="flex flex-row gap-6">
                    <div className="grid gap-2 w-1/2">
                        <Label htmlFor="name">Business Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            value={data.business_name}
                            onChange={(e) => setData('business_name', e.target.value)}
                            disabled={false}
                            placeholder=""
                        />
                    </div>
                    <div className="grid gap-2 w-1/2">
                        <Label htmlFor="name">Company Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            value={data.company_name}
                            onChange={(e) => {
                                const value = e.target.value;
                                setData({
                                    ...data,
                                    company_name: value,
                                    subdomain: value
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]/g, '') // remove special chars and spaces
                                });
                            }}
                            disabled={false}
                            placeholder=""
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-6">
                    <div className="grid gap-2 w-1/2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            disabled={false}
                            placeholder=""
                        />
                    </div>
                    <div className="grid gap-2 w-1/2">
                        <Label htmlFor="address1">Address 2</Label>
                        <Input
                            id="address1"
                            type="text"
                            value={data.address1}
                            onChange={(e) => setData('address1', e.target.value)}
                            disabled={false}
                            placeholder=""
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-6">
                    <div className="grid gap-2 w-1/2">
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
                            disabled={false}
                            placeholder=""
                        />
                        {subdomainStatus && (
                            <div className={subdomainStatus.status ? 'text-green-600 text-xs mt-1' : 'text-red-600 text-xs mt-1'}>
                                {subdomainStatus.message}
                            </div>
                        )}
                    </div>
                    <div className="grid gap-2 w-1/2">
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input
                            id="mobile"
                            type="text"
                            value={data.mobile}
                            onChange={(e) => setData('mobile', e.target.value)}
                            disabled={false}
                            placeholder=""
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-6">
                    <div className="grid gap-2 w-1/2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            disabled={false}
                            placeholder=""
                        />
                    </div>
                    <div className="grid gap-2 w-1/2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            type="text"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            disabled={false}
                            placeholder=""
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-6">
                    <div className="grid gap-2 w-1/2">
                        <Label htmlFor="state">State</Label>
                        <Select
                            value={data.state}
                            onValueChange={(value) => setData('state', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                            <SelectContent>
                                {states && states.map((state) => (
                                    <SelectItem key={state.id} value={state.id.toString()}>
                                        {state.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2 w-1/2">
                        <Label htmlFor="zip">Zip</Label>
                        <Input
                            id="zip"
                            type="text"
                            value={data.zip}
                            onChange={(e) => setData('zip', e.target.value)}
                            disabled={false}
                            placeholder=""
                        />
                    </div>
                </div>
            </form>
        </AuthLayout>
    )
}
