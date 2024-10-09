import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa6";

const Login = () => {
    return (
        <div className="container center h-screen bg-[url('/bg.png')] bg-cover bg-center w-full">
            <div className="bg-white p-8 rounded-md center gap-9">
                <div className="bg-[#1abc9c]">
                    <h2 className="text-white heading-primary p-4 w-full h-full">Welcome to our App</h2>
                </div>
                <div className="center flex-col">
                    <div className="mb-12">
                        <h2 className="heading-primary">Sign In to our App</h2>
                    </div>
                    <form>
                        <div className="relative mb-2">
                            <IoIosMail className="text-[#1abc9c] absolute top-1/2 -translate-y-1/2 text-2xl left-1"/>
                            <input type="email" name="email" id="email" placeholder="Email" className="w-full border-2 border-[#1abc9c] p-2 pl-8 rounded-md"/>
                        </div>
                        <div className="relative mb-2">
                            <FaLock className="text-[#1abc9c] absolute top-1/2 -translate-y-1/2 text-xl left-1.5"/>
                            <input type="password" name="password" id="password" placeholder="Password" className="w-full border-2 border-[#1abc9c] p-2 pl-8 rounded-md"/>
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-[#1abc9c] text-white px-4 py-2 rounded">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;