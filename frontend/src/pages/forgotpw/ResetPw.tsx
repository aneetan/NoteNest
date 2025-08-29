import type React from "react";
import { useEffect, useState, type FormEvent } from "react";
import type { ResetPassword, ResetPasswordRequest } from "../../types/auth";
import { useLocation, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../api/user.api";
import { showErrorToast, showSuccessToast } from "../../utils/toast.utils";
import type { AxiosError } from "axios";

//error msg
interface ErrorProps {
    newPassword ?: string;
    confirmPassword ?: string;
}

const ResetPw:React.FC = () => {
    const location = useLocation();
    const {token} = location.state || {};
    const [formData, setFormData] = useState<ResetPassword>({
        newPassword: '',
        confirmPassword: ''
    })

    const [error, setError] = useState<ErrorProps>({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
        showErrorToast("Invalid or missing reset token");
        navigate('/forgot-password');
        }
    }, [token, navigate]);

    
    const mutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            navigate('/login');
            showSuccessToast("Password Changed Successfully");
        },
        onError: (err: AxiosError) => {
            if(err.response) {
                console.log(err.response.data);
            }
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setFormData(prev => ({ ...prev, [name]: newValue }));

        setError(prev => ({ ...prev, [name]: "" }));
    }

    const validateForms = () => {
        const newErrors: ErrorProps = {};

        if(!formData.newPassword){
            newErrors.newPassword = "Password is required";
        } else {
            const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if(!strongPasswordRegex.test(formData.newPassword)) newErrors.newPassword = "Password must be 8+ chars, include uppercase, lowercase, number, and special character";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm your password.";
        } else if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!validateForms()) return;
        const submissionData = {
            ...formData,
            token: token
        };
        
        mutation.mutate(submissionData);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800"> Reset Password </h1>
                            <p className="text-gray-600 mt-2">Please enter your new password</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Password */}
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    name="newPassword"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Enter your password"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                                {error.newPassword && (<span className="text-sm text-red-500 mb-2"> {error.newPassword} </span>)}
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
                                        Redirecting .....
                                    </>
                                ) : 'Continue'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPw