'use client';
import Image from 'next/image';
import background from '../../public/background.jpg';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../components/common/button/Button';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentPath = usePathname();
    const router = useRouter();

    const handleNavigation = (destination: string) => {
        router.push(destination);
    };

    return (
        <div className='login-container'>
            <div className='aside'>
                <h1 className='aside__header' data-testid='login-header'>
                    Bandmate
                </h1>
                <div className='image-container'>
                    <Image
                        className='background-image'
                        src={background}
                        alt='login-background'
                        priority={true}
                        fill
                        sizes='100vw'
                        placeholder='blur'
                        data-testid='login-image'
                    ></Image>
                </div>
                <div className='aside__switch-container'>
                    {currentPath === '/auth/login' && (
                        <Button
                            buttonType='login'
                            onClick={() => handleNavigation('/auth/signup')}
                            data-testid='switch-to-sign-up-button'
                        >
                            Sign Up
                        </Button>
                    )}
                    {currentPath === '/auth/signup' && (
                        <Button
                            buttonType='login'
                            onClick={() => handleNavigation('/auth/login')}
                            data-testid='switch-to-log-in-button'
                        >
                            Log in
                        </Button>
                    )}
                </div>
            </div>
            <div className='form-container'>{children}</div>
        </div>
    );
}
