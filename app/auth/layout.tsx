import Image from 'next/image';
import background from '../../public/background.jpg';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className='login-container'>
                <div className='aside'>
                    <h1 className='aside__header'>Bandmate</h1>
                    <div className='image-container'>
                        <Image
                            className='background-image'
                            src={background}
                            alt='login-background'
                            objectFit='cover'
                        ></Image>
                    </div>
                </div>
                <div className='form-container'>{children}</div>
            </div>
        </>
    );
}
