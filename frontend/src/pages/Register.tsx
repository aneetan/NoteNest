import type React from "react";
import { useState, type FormEvent } from "react";
import type { RegisterProps } from "../types/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, type AxiosResponse } from "axios";
import { registerUser } from "../api/user.api";
import { useNavigate } from "react-router";

//error msg
interface ErrorProps {
    fullName ?: string;
    email ?: string;
    password ?: string;
    confirmPassword ?: string;
    checkbox ?: string;
}

const Register:React.FC = () => {
    const [formData, setFormData] = useState<RegisterProps>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        checkbox: false
    })

    const [error, setError] = useState<ErrorProps>({});
    const navigate = useNavigate();

    const mutation = useMutation<AxiosResponse, AxiosError, RegisterProps>({
        mutationFn: registerUser,
        onSuccess: () => navigate("/login"),
        onError: (e) => {
            if(e.response){
                console.log('Error response data:', e.response.status);
                console.log('Error status:', e.response.status);
            }
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setFormData(prev => ({ ...prev, [name]: newValue }));

        setError(prev => ({ ...prev, [name]: "" }));
    }

    const validateForms = () => {
        const newErrors: ErrorProps = {};

        //full name validation
        if(!formData.fullName.trim()) newErrors.fullName = "Full name is required";

        //email validation
        if(!formData.email.trim()) newErrors.email = "Email is required"
        else if(!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Please enter valid email"

        //password validation
        if(!formData.password) newErrors.password  = "Password is required"
        else {
            const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if(!strongPasswordRegex.test(formData.password)) newErrors.password = "Password must be 8+ chars, include uppercase, lowercase, number, and special character";
        }

        //confirm password validation
        if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm your password.";
        else if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match.";

        //checkbox validate
        if(!formData.checkbox) newErrors.checkbox = "Please agree to the terms and privacy policy"

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!validateForms()) return;
        mutation.mutate(formData);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
                            <p className="text-gray-600 mt-2">Please enter your credentials</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="fullname"
                                    type="text"
                                    name="fullName"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                                {error.fullName && (<span className="text-sm text-red-500 mb-2"> {error.fullName} </span>)}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {error.email && (<span className="text-sm text-red-500 mb-2"> {error.email} </span>)}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {error.password && (<span className="text-sm text-red-500 mb-2"> {error.password} </span>)}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Re-enter your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {error.confirmPassword && (<span className="text-sm text-red-500 mb-2"> {error.confirmPassword} </span>)}
                            </div>

                            {/* Checkbox */}
                            <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox"
                                        name="checkbox"
                                        checked={formData.checkbox}
                                        onChange={handleChange}
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="checkbox" className="ml-2 block text-sm text-gray-700">
                                        I agree to the{" "}
                                        <a href="#" className="font-medium text-[var(--primary-color)] hover:text-[var(--primary-color-hover)">
                                            Terms and Conditions
                                        </a> {" "} and  {" "} 
                                        <a href="#" className="font-medium text-[var(--primary-color)] hover:text-[var(--primary-color-hover)">
                                            Privacy Policy
                                        </a>
                                    </label>
                                </div>
                            </div>
                            {error.checkbox && (<span className="text-sm text-red-500 mb-2"> {error.checkbox} </span>)}
                            </div>
                            <button
                                type="submit"
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[var(--primary-color)]
                                  hover:bg-[var(--primary-color-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] transition ${mutation.isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {mutation.isPending ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Registering ...
                                    </>
                                ) : 'Register'}
                            </button>
                        </form>
                    </div>
                    
                    <div className="px-8 py-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{''}
                            <a href="/login" className="font-medium text-[var(--primary-color)] hover:text-[var(--primary-color-hover)">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register