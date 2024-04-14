'use client';
import Image from 'next/image';
import background from '../../public/background.jpg';
import { usePathname, useRouter } from 'next/navigation';

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
                <h1 className='aside__header'>Bandmate</h1>
                <div className='image-container'>
                    <Image
                        className='background-image'
                        src={background}
                        alt='login-background'
                        priority={true}
                        fill
                        sizes='100vw'
                        placeholder='blur'
                    ></Image>
                </div>
                <div className='aside__switch-container'>
                    {currentPath === '/auth/login' && (
                        <button
                            className='aside__switch-container__button'
                            onClick={() => handleNavigation('/auth/signup')}
                        >
                            Sign Up
                        </button>
                    )}
                    {currentPath === '/auth/signup' && (
                        <button
                            className='aside__switch-container__button'
                            onClick={() => handleNavigation('/auth/login')}
                        >
                            Log in
                        </button>
                    )}
                </div>
            </div>
            <div className='form-container'>{children}</div>
        </div>
    );
}
