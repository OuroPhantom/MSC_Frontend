import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, isAuthenticated, errors: signInErrors } = useAuth();
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated)
            navigate('/products');
        else
            console.log("No está autenticado");
    }, [isAuthenticated]);

    const onSubmit = handleSubmit((data) => {
        signin(data);
    });

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                {signInErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 my-2 text-white" key={i}>
                        {error}
                    </div>
                ))}

                <form onSubmit={onSubmit}>
                    <h1 className="text-3xl font-bold my-3">Login</h1>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && (
                        <p className="text-red-500">Email es requerido</p>
                    )}

                    <label htmlFor="password">Password</label>
                    <div className="flex justify-end items-center relative">
                        <input
                            type={passwordShown ? "text" : "password"}
                            name="password"
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            placeholder="Password"
                            {...register("password", { required: true, minLength: 6 })}
                        />
                        {passwordShown ? (
                            <IoEyeSharp
                                size={30}
                                className="absolute mr-2 w-10"
                                onClick={togglePasswordVisibility}
                            />
                        ) : (
                            <IoEyeOffSharp
                                size={30}
                                className="absolute mr-2 w-10"
                                onClick={togglePasswordVisibility}
                            />
                        )}
                        {errors.password?.type === "required" && (
                            <p className="text-red-500">Password requerido</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p className="text-red-500">La longitud mínima es de 6 caracteres</p>
                        )}
                    </div>

                    <button className="bg-zinc-700 px-3 py-3 my-3 rounded-md" type="submit">
                        <IoLogIn size={30} />
                    </button>
                </form>

                <div className="flex gap-x-2 justify-between pt-5 mt-5">
                    <p>¿No tienes una cuenta?</p>
                    <Link to="/register" className="text-sky-500 flex items-center">
                        ¡Crea Una! <IoPersonAdd size={30} className="mx-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
