
import React from 'react'
import Link from 'next/link';

const Login = () => {
    return (
        <div>
            <h1>Página de Login</h1>
            <Link href='/'> Go back home
            
             </Link >
            <style jsx>{`
            
            h1{
                color:red;
            }

            `}</style>
        </div>
    )
}

export default Login
